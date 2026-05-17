(function () {
    const { createApp, ref, reactive, computed, onMounted, watch, nextTick } = Vue;

    const initSegmentBuilder = () => {
        const el = document.getElementById('segmentBuilderApp');
        if (!el || el.__vue_app__) return; // Stop double-mounting crash

        createApp({
            setup() {
                const segmentName = ref('New Segment');
                const segmentDescription = ref('Enter segment description...');
                const refreshType = ref('REAL_TIME');
                const isEditMode = ref(false);
                const isLoading = ref(false);
                const matchCount = ref('—');

                let _uid = Date.now() + Math.floor(Math.random() * 1000);
                const uid = () => `r${++_uid}`;
                const makeRule = () => ({ _id: uid(), _type: 'rule', field: '', operator: '', value: '' });
                const makeGroup = () => ({ _id: uid(), _type: 'group', operator: 'AND', rules: [makeRule()] });

                const criteria = reactive({ operator: 'AND', rules: [makeRule()] });

                // UI Methods
                const addRule = (list) => list.push(makeRule());
                const addGroup = (list) => list.push(makeGroup());
                const removeItem = (list, i) => { if (list.length > 1) list.splice(i, 1); };

                // Force use of global categories from segdummy.js
                const fieldCategories = computed(() => window.QBFieldCategories || []);

                const fieldMap = computed(() => {
                    const m = {};
                    if (Array.isArray(fieldCategories.value)) {
                        fieldCategories.value.forEach(cat => {
                            if (cat.fields && Array.isArray(cat.fields)) {
                                cat.fields.forEach(f => { m[f.field] = f; });
                            }
                        });
                    }
                    return m;
                });

                const getOperators = (field) => {
                    // Handle both field key strings and field objects
                    const key = field && typeof field === 'object' ? field.field : field;
                    if (!key) return [];
                    if (typeof window.getOperatorsForField === 'function') {
                        return window.getOperatorsForField(key);
                    }
                    return [];
                };

                const runPreview = async () => {
                    if (!window.filterPlayersByCriteria) return;
                    // Only run preview if there's at least one complete rule
                    if (!criteria.rules.some(r => r.field && r.operator)) {
                        matchCount.value = '—';
                        return;
                    }
                    try {
                        const cleanCriteria = JSON.parse(JSON.stringify(criteria));
                        const res = await window.filterPlayersByCriteria(cleanCriteria);
                        matchCount.value = (res.data || []).length;
                    } catch (e) { console.warn("Preview failed", e); }
                };

                watch(criteria, runPreview, { deep: true });

                const saveSegment = async () => {
                    if (!segmentName.value.trim()) {
                        if (window.showToast) window.showToast('Warning', 'Please enter a segment name', 'warning');
                        return;
                    }
                    isLoading.value = true;
                    try {
                        const { rules, groups } = window.flattenCriteria ? window.flattenCriteria(criteria) : { rules: [], groups: [] };
                        const payload = {
                            name: segmentName.value,
                            description: segmentDescription.value,
                            refresh_type: refreshType.value,
                            criteria: JSON.parse(JSON.stringify(criteria)), // Keep tree for dummy logic
                            rules,
                            groups
                        };

                        let res;
                        try {
                            if (isEditMode.value) {
                                const id = new URLSearchParams(window.location.search).get('edit');
                                res = await (window.updateSegment ? window.updateSegment(id, payload) : window.updateSegmentDummy(id, payload));
                            } else {
                                res = await (window.publishRule ? window.publishRule(payload) : window.createSegmentDummy(payload));
                            }
                        } catch (apiErr) {
                            console.warn("[SegmentBuilder] API failed, falling back to dummy storage:", apiErr);
                            const id = new URLSearchParams(window.location.search).get('edit');
                            res = await (isEditMode.value ? window.updateSegmentDummy(id, payload) : window.createSegmentDummy(payload));
                        }

                        if (!res || (res.status === 0 && !res.data)) {
                             throw new Error(res?.error || "Unknown save error");
                        }

                        console.log("[SegmentBuilder] Save successful:", res);
                        if (window.showToast) window.showToast('Success', 'Segment saved locally!', 'success');
                        window.location.href = 'pages-saved-segments.html';
                    } catch (e) {
                        console.error("[SegmentBuilder] Save error:", e);
                        if (window.showToast) window.showToast('Error', 'Failed to save: ' + e.message, 'error');
                    } finally {
                        isLoading.value = false;
                    }
                };

                onMounted(async () => {
                    const params = new URLSearchParams(window.location.search);
                    const editId = params.get('edit');
                    if (editId) {
                        isEditMode.value = true;
                        try {
                            let res;
                            try {
                                res = await (window.fetchSegmentById ? window.fetchSegmentById(editId) : window.fetchSegmentDetailsDummy(editId));
                            } catch (e) {
                                res = await window.fetchSegmentDetailsDummy(editId);
                            }
                            const data = res.data || res;
                            segmentName.value = data.name || '';
                            segmentDescription.value = data.description || '';
                            refreshType.value = data.refresh_type || 'REAL_TIME';
                            if (data.criteria) Object.assign(criteria, data.criteria);
                        } catch (err) { console.error("Error loading for edit:", err); }
                    }
                    runPreview();
                });

                return {
                    segmentName, segmentDescription, refreshType, criteria, isEditMode, isLoading, matchCount,
                    fieldCategories, addRule, addGroup, removeItem, getOperators, saveSegment,
                    setOperator: (val) => { criteria.operator = val; },
                    getFieldConfig: (field) => window.getFieldConfig ? window.getFieldConfig(field) : null
                };
            }
        }).mount('#segmentBuilderApp');
    };

    document.addEventListener('DOMContentLoaded', initSegmentBuilder);
})();
