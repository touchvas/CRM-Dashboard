(function () {
    const { createApp, ref, reactive, computed, onMounted, watch, nextTick } = Vue;

    const initSegmentBuilder = () => {
        const el = document.getElementById('segmentBuilderApp');
        if (!el) return;

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

                const fieldCategories = window.QBFieldCategories || [
                    {
                        label: 'Player', fields: [
                            { field: 'country', label: 'Country', type: 'string', values: ['Kenya', 'Uganda', 'Tanzania', 'Nigeria'] },
                            { field: 'status', label: 'Status', type: 'string', values: ['active', 'dormant', 'suspended', 'blocked'] },
                            { field: 'registered_at', label: 'Registration Date', type: 'date' },
                            { field: 'last_active', label: 'Last Active Date', type: 'date' }
                        ]
                    },
                    {
                        label: 'Financial', fields: [
                            { field: 'lifetime_deposits', label: 'Total Deposits (KES)', type: 'number' },
                            { field: 'lifetime_withdrawals', label: 'Total Withdrawals (KES)', type: 'number' },
                            { field: 'deposit_count', label: 'Number of Deposits', type: 'number' },
                            { field: 'avg_deposit', label: 'Avg Deposit Size', type: 'number' },
                            { field: 'withdrawal_ratio', label: 'Withdrawal/Deposit Ratio %', type: 'number' }
                        ]
                    }
                ];

                const fieldMap = computed(() => {
                    const m = {};
                    fieldCategories.forEach(cat => cat.fields.forEach(f => { m[f.field] = f; }));
                    return m;
                });

                const getFieldConfig = (field) => fieldMap.value[field];
                const getOperators = (field) => {
                    const cfg = getFieldConfig(field);
                    if (!cfg) return [];
                    if (cfg.type === 'string' || cfg.values) {
                        return [{ value: 'eq', label: 'equals' }, { value: 'ne', label: 'not equals' }];
                    }
                    return [
                        { value: 'eq', label: 'equals' },
                        { value: 'ne', label: 'not equals' },
                        { value: 'gt', label: 'greater than' },
                        { value: 'gte', label: 'greater or equal' },
                        { value: 'lt', label: 'less than' },
                        { value: 'lte', label: 'less or equal' },
                    ];
                };

                const runPreview = async () => {
                    if (!window.filterPlayersByCriteria) return;
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

                        if (window.showToast) window.showToast('Success', 'Segment saved!', 'success');
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
                            const res = await window.fetchSegmentById(editId);
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
                    setOperator: (val) => { criteria.operator = val; }
                };
            }
        }).mount('#segmentBuilderApp');
    };

    document.addEventListener('DOMContentLoaded', initSegmentBuilder);
})();
