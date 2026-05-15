(function () {
    const { createApp, ref, reactive, computed, onMounted, watch, nextTick } = Vue;

    const initSegmentBuilder = () => {
        const el = document.getElementById('segmentBuilderApp');
        if (!el) return;

        createApp({
            setup() {
                const segmentName = ref('New Segment');
                const segmentDescription = ref('');
                const refreshType = ref('REAL_TIME');
                const isEditMode = ref(false);
                const isLoading = ref(false);

                let _uid = Date.now();
                const uid = () => `r${++_uid}`;
                const makeRule = () => ({ _id: uid(), _type: 'rule', field: '', operator: '', value: '' });
                const makeGroup = () => ({ _id: uid(), _type: 'group', operator: 'AND', rules: [makeRule()] });

                const criteria = reactive({ operator: 'AND', rules: [makeRule()] });

                // UI Methods
                const addRule = (list) => list.push(makeRule());
                const addGroup = (list) => list.push(makeGroup());
                const removeItem = (list, i) => { if (list.length > 1) list.splice(i, 1); };

                const fieldCategories = window.QBFieldCategories || [];

                const getOperators = (fieldKey) => {
                    if (window.getOperatorsForField) return window.getOperatorsForField(fieldKey);
                    return [];
                };

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
                            rules,
                            groups
                        };

                        let res;
                        if (isEditMode.value) {
                            const id = new URLSearchParams(window.location.search).get('edit');
                            res = await window.updateSegment(id, payload);
                        } else {
                            res = await window.publishRule(payload);
                        }

                        if (window.showToast) window.showToast('Success', 'Segment saved successfully', 'success');
                        window.location.href = 'pages-saved-segments.html';
                    } catch (e) {
                        console.error("[SegmentBuilder] Save error:", e);
                        if (window.showToast) window.showToast('Error', 'Failed to save segment', 'error');
                    } finally {
                        isLoading.value = false;
                    }
                };

                onMounted(async () => {
                    const params = new URLSearchParams(window.location.search);
                    const editId = params.get('edit');
                    if (editId) {
                        isEditMode.value = true;
                        // Fetch and populate (logic normally in segmentation.js)
                    }
                });

                return {
                    segmentName, segmentDescription, refreshType, criteria, isEditMode, isLoading,
                    fieldCategories, addRule, addGroup, removeItem, getOperators, saveSegment
                };
            }
        }).mount('#segmentBuilderApp');
    };

    document.addEventListener('DOMContentLoaded', initSegmentBuilder);
})();
