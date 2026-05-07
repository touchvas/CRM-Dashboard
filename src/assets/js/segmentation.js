/**
 * segmentation.js
 * Centralized Segmentation Logic & Vue Apps
 */

/* ═══════════════════════════════════════════════════════════════
   1.  API SERVICE & UTILS
   ═══════════════════════════════════════════════════════════════ */

const SEGMENTATION_BASE_URL = 'https://crm.gamesapi.dev/v1';
const getApiKey = () => sessionStorage.getItem('api_key') || '';

const apiRequest = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': getApiKey(),
            'Authorization': `Bearer ${getApiKey()}`
        }
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    if (response.status === 401) {
        console.warn('[API] Unauthorized (401) at ' + url + '. Redirecting to login.');
        sessionStorage.removeItem('api_key');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'auth-login.html';
        return;
    }
    if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`API ${response.status}: ${errText}`);
    }
    if (response.status === 204) return null;
    return response.json();
};

/**
 * Walks the Vue criteria tree and produces the flat rules[] + groups[]
 * arrays the API expects.
 */
function flattenCriteria(node, rules = [], groups = []) {
    const rawNode = node.value || node;
    for (const item of rawNode.rules || []) {
        if (item._type === 'group') {
            groups.push(item.operator || 'AND');
            flattenCriteria(item, rules, groups);
        } else {
            if (!item.field || !item.operator) continue;
            rules.push({
                field: item.field,
                operator: item.operator,
                value: String(item.value ?? ''),
                sub_query: null
            });
        }
    }
    return { rules, groups };
}
window.flattenCriteria = flattenCriteria;

/* ── Exposed API helpers ─────────────────────────────────────── */
window.fetchSegments = (page = 1, limit = 20) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments?page=${page}&limit=${limit}`);

window.fetchRules = (page = 1, limit = 20, active = true) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/rules?page=${page}&limit=${limit}&active=${active}`);

window.publishRule = (data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments`, 'POST', data);

window.fetchSegmentById = (id) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`);

window.executeAnalyticsQuery = (data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/analytics/query`, 'POST', data);

/* ── Shared Formatting Helpers ────────────────────────────────── */
const fmtShort = (n) => {
    if (!n && n !== 0) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
};
window.fmtShort = fmtShort;

/* ═══════════════════════════════════════════════════════════════
   2.  VUE APPS
   ═══════════════════════════════════════════════════════════════ */
const { createApp, reactive, ref, computed, onMounted, watch, nextTick } = Vue;

// ─── 2.1 Segment Builder App (#segmentBuilderApp) ───────────────────
if (document.getElementById('segmentBuilderApp')) {
    createApp({
        setup() {
            const segmentName = ref('');
            const segmentDescription = ref('');
            const refreshType = ref('REAL_TIME');

            let _uid = Date.now(); // Use Date.now() for more unique IDs
            const uid = () => `r${++_uid}`;
            const makeRule = () => ({ _id: uid(), _type: 'rule', field: '', operator: '', value: '' });
            const makeGroup = () => ({ _id: uid(), _type: 'group', operator: 'AND', rules: [makeRule()] });

            const criteria = reactive({ operator: 'AND', rules: [makeRule()] });

            const addRule = (list) => list.push(makeRule());
            const addGroup = (list) => list.push(makeGroup());
            const removeItem = (list, i) => { if (list.length > 1) list.splice(i, 1); };

            const fieldCategories = [
                {
                    label: 'Player', fields: [
                        {
                            field: 'country', label: 'country', type: 'string',
                            values: ['KE', 'UG', 'TZ', 'NG', 'ZA', 'GH', 'ET', 'RW']
                        }

                    ]
                },
                {
                    label: 'Deposits', fields: [
                        { field: 'deposit_total', label: 'deposit_total', type: 'number' },
                        { field: 'deposit_count', label: 'deposit_count', type: 'number' },
                        { field: 'deposit_max', label: 'deposit_max', type: 'number' },
                        { field: 'deposit_min', label: 'deposit_min', type: 'number' },
                    ]
                },
                {
                    label: 'Withdrawals', fields: [
                        { field: 'withdraw_total', label: 'withdraw_total', type: 'number' },
                        { field: 'withdraw_count', label: 'withdraw_count', type: 'number' },
                        { field: 'withdraw_max', label: 'withdraw_max', type: 'number' },
                    ]
                },
                {
                    label: 'Bets', fields: [
                        { field: 'bet_total', label: 'bet_total', type: 'number' },
                        { field: 'bet_count', label: 'bet_count', type: 'number' },
                        { field: 'bet_max', label: 'bet_max', type: 'number' },
                        { field: 'bet_min', label: 'bet_min', type: 'number' },
                    ]
                },
                {
                    label: 'Casino Bets', fields: [
                        { field: 'casino_bet_total', label: 'casino_bet_total', type: 'number' },
                        { field: 'casino_bet_count', label: 'casino_bet_count', type: 'number' },
                        { field: 'casino_bet_max', label: 'casino_bet_max', type: 'number' },
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
                    { value: 'eq', label: ' equals' },
                    { value: 'ne', label: 'not equals' },
                    { value: 'gt', label: 'greater than' },
                    { value: 'gte', label: 'greater or equal' },
                    { value: 'lt', label: 'less than' },
                    { value: 'lte', label: ' less or equal' },
                ];
            };

            const matchCount = ref('—');
            const runPreview = async () => {
                if (!window.filterPlayersByCriteria) return;
                const cleanCriteria = JSON.parse(JSON.stringify(criteria));
                const res = await window.filterPlayersByCriteria(cleanCriteria);
                matchCount.value = (res.data || []).length;
            };

            watch(criteria, runPreview, { deep: true });

            const saving = ref(false);
            const saveCurrentSegment = async () => {
                if (!segmentName.value.trim()) { alert('Please enter a segment name.'); return; }
                const { rules, groups } = flattenCriteria(criteria);
                if (rules.length === 0) { alert('Please add at least one complete rule.'); return; }

                const payload = {
                    name: segmentName.value.trim(),
                    description: segmentDescription.value.trim(),
                    refresh_type: refreshType.value,
                    criteria: { operator: criteria.operator, groups, rules }
                };

                saving.value = true;
                try {
                    await window.publishRule(payload);
                    if (window.showToast) window.showToast('Success', 'Segment saved!', 'success');
                    else alert('Segment saved!');
                    window.location.href = 'pages-saved-segments.html';
                } catch (err) {
                    console.error('Save error:', err);
                    alert(`Failed to save segment: ${err.message}`);
                } finally {
                    saving.value = false;
                }
            };

            onMounted(runPreview);

            return {
                segmentName, segmentDescription, refreshType,
                criteria, addRule, addGroup, removeItem,
                fieldCategories, getFieldConfig, getOperators,
                matchCount, runPreview, saving, saveCurrentSegment
            };
        }
    }).mount('#segmentBuilderApp');
}

// ─── 2.2 Saved Segments List App (#savedSegmentsApp) ───────────────
if (document.getElementById('savedSegmentsApp')) {
    createApp({
        setup() {
            const segments = ref([]);
            const isLoading = ref(true);

            const fetchSegments = async () => {
                isLoading.value = true;
                try {
                    const dummyRes = await window.fetchSegmentsDummy().catch(() => []);
                    let apiRes = [];
                    try {
                        if (window.fetchSegments) {
                            const apiData = await window.fetchSegments(1, 100);
                            apiRes = apiData?.results || apiData?.data || (Array.isArray(apiData) ? apiData : []);
                        }
                    } catch (apiErr) { console.error("[fetchSegments] API fetch error:", apiErr); }

                    const combined = [...apiRes, ...dummyRes];
                    const colors = ['#4e7adf', '#38c66c', '#ffd166', '#f43f5e', '#a78bfa', '#fb923c'];
                    const mapped = await Promise.all(combined.map(async (s, i) => {
                        let players = [];
                        if (window.getPlayersForSegment) {
                            players = await window.getPlayersForSegment(s);
                        }
                        return {
                            ...s,
                            id: s.id || s._id || ('api_' + i),
                            name: s.name || 'Unnamed Segment',
                            color: s.color || colors[i % colors.length],
                            is_favorite: s.is_favorite || false,
                            total_players: s.total_players || players.length,
                            total_deposits: s.total_deposits || players.reduce((sum, p) => sum + (p.lifetime_deposits || 0), 0),
                            total_bets: s.total_bets || players.reduce((sum, p) => sum + (p.lifetime_bets || 0), 0),
                            total_withdrawals: s.total_withdrawals || players.reduce((sum, p) => sum + (p.lifetime_withdrawals || 0), 0)
                        };
                    }));
                    segments.value = mapped;
                } catch (e) { console.error("[fetchSegments] Critical error:", e); } finally { isLoading.value = false; }
            };

            const favoriteSegments = computed(() => segments.value.filter(s => s.is_favorite));
            const toggleFavorite = async (seg) => {
                if (window.toggleSegmentFavoriteDummy) {
                    await window.toggleSegmentFavoriteDummy(seg.id);
                    await fetchSegments();
                }
            };
            const goToDetails = (seg) => { window.location.href = `pages-segment-details.html?id=${encodeURIComponent(seg.id)}`; };

            onMounted(fetchSegments);

            return { segments, favoriteSegments, isLoading, toggleFavorite, goToDetails, fmtShort };
        }
    }).mount('#savedSegmentsApp');
}

// ─── 2.3 Segment View App (#segmentViewApp) ─────────────────────────
if (document.getElementById('segmentViewApp')) {
    createApp({
        setup() {
            const segmentData = ref(null);
            const isLoading = ref(true);
            const search = ref('');
            const statusFilter = ref('all');
            const sort = reactive({ key: 'lifetime_deposits', dir: 'desc' });

            const growthRate = ref(window.visualDummyData?.kpis?.growthRate || 14.2);
            const projectedValue = ref(window.visualDummyData?.kpis?.projectedValue || 12500000);
            const nggr = ref(window.visualDummyData?.kpis?.nggr || 1840000);

            const activeFields = ref(['deposits', 'casino_bets', 'sports_bets']); // Default checked fields
            const chartFields = ref(window.visualDummyData?.field_configs || []);

            const filteredPlayers = computed(() => {
                if (!segmentData.value) return [];
                let p = segmentData.value.players || [];
                if (search.value) {
                    const s = search.value.toLowerCase();
                    p = p.filter(x => x.name.toLowerCase().includes(s) || x.email.toLowerCase().includes(s));
                }
                if (statusFilter.value !== 'all') p = p.filter(x => x.status === statusFilter.value);
                return p.sort((a, b) => {
                    const vA = a[sort.key], vB = b[sort.key];
                    return sort.dir === 'desc' ? vB - vA : vA - vB;
                });
            });

            const showPlayers = ref(false);

            const initCharts = () => {
                const visual = window.visualDummyData;
                if (!visual) return;

                const months = visual.months;
                const renderChart = (id, options) => {
                    const el = document.querySelector(id);
                    if (el) {
                        el.innerHTML = ''; // Clear previous
                        // Enforce professional font globally in charts
                        if (!options.chart) options.chart = {};
                        options.chart.fontFamily = "'Inter', sans-serif";
                        new ApexCharts(el, options).render();
                    }
                };

                // 1. PERFORMANCE TRENDS (Multi-line)
                const trendSeries = activeFields.value.map(key => ({
                    name: chartFields.value.find(f => f.key === key)?.label || key,
                    data: visual.metrics[key] || []
                }));

                renderChart("#segmentTrendChart", {
                    series: trendSeries,
                    chart: { type: 'line', height: 320, toolbar: { show: false }, zoom: { enabled: false } },
                    colors: activeFields.value.map(key => chartFields.value.find(f => f.key === key)?.color),
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 3 },
                    xaxis: { categories: months },
                    yaxis: { labels: { formatter: v => fmtShort(v) } },
                    grid: { borderColor: '#f1f1f1', strokeDashArray: 3 },
                    legend: { show: true, position: 'top', horizontalAlign: 'right' }
                });

                // 2. CASHFLOW (Up/Down)
                renderChart("#monthlyCashFlowChart", {
                    series: [
                        { name: 'Deposits', data: visual.cashflow.deposits },
                        { name: 'Withdrawals', data: visual.cashflow.withdrawals }
                    ],
                    chart: { type: 'bar', height: 540, stacked: false, toolbar: { show: false } },
                    plotOptions: { bar: { columnWidth: '60%', borderRadius: 0 } },
                    colors: ['#34c38f', '#f46a6a'],
                    legend: {
                        show: true,
                        position: 'top',
                        horizontalAlign: 'center',
                        fontSize: '13px',
                        itemMargin: { vertical: 5, horizontal: 20 },
                        markers: { width: 12, height: 12, radius: 12 }
                    },
                    dataLabels: { enabled: false },
                    xaxis: { categories: months, labels: { rotate: -90, rotateAlways: true, style: { fontSize: '11px' } } },
                    yaxis: { labels: { formatter: v => fmtShort(Math.abs(v)) } },
                    grid: { strokeDashArray: 3, padding: { bottom: 100 } }
                });

                // 3. BETS DISTRIBUTION (Was Sales Analytics)
                renderChart("#salesAnalyticsChart", {
                    series: [65, 35], // Sports vs Casino
                    chart: { type: 'donut', height: 343 },
                    labels: ['Sportsbook Bets', 'Casino Bets'],
                    colors: ['#5b73e8', '#34c38f'],
                    legend: { show: true, position: 'right', verticalAlign: 'middle', fontSize: '12px' },
                    plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Total Bets' } } } } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(1) + "%" }
                });

                // 4. ENGAGEMENT STATUS (Half-Donut)
                renderChart("#playerStatusChart", {
                    series: visual.engagement.series,
                    chart: { type: 'donut', height: 350 },
                    labels: visual.engagement.labels,
                    colors: visual.engagement.colors,
                    legend: {
                        show: true,
                        position: 'right',
                        verticalAlign: 'middle',
                        fontSize: '12px'
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 90,
                            offsetY: 40,
                            donut: { size: '75%', labels: { show: true, total: { show: true, label: 'Active', formatter: () => '65%' } } }
                        }
                    },
                    grid: { padding: { bottom: -80, right: 10 } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(1) + "%" }
                });

                const donutOptions = (labels, colors) => ({
                    chart: { type: 'donut', height: 320 },
                    labels: labels,
                    colors: colors,
                    legend: { show: true, position: 'right', fontSize: '12px' },
                    plotOptions: { pie: { donut: { size: '70%' } } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(0) + "%" }
                });

                renderChart("#casinoGamesChart", {
                    ...donutOptions(visual.casino_games.labels, visual.casino_games.colors),
                    series: visual.casino_games.series
                });

                renderChart("#casinoBetsChart", {
                    ...donutOptions(visual.casino_providers.labels, visual.casino_providers.colors),
                    series: visual.casino_providers.series
                });
            };

            const initMarketingActions = () => {
                $('#smsMessage').on('input', function () {
                    const len = $(this).val().length;
                    $('#charCount').text(len);
                    $('#msgCount').text(Math.ceil(len / 160));
                });

                $(document).on('click', '.sms-variable-btn', function () {
                    const variable = $(this).data('variable');
                    const textarea = $('#smsMessage');
                    const pos = textarea[0].selectionStart;
                    const text = textarea.val();
                    textarea.val(text.slice(0, pos) + variable + text.slice(pos)).trigger('input').focus();
                });

                $('#sendSmsBtn').on('click', function () {
                    const msg = $('#smsMessage').val().trim();
                    if (!msg) { showToast('Error', 'Please enter a message', 'error'); return; }

                    const btn = $(this);
                    const oldText = btn.html();
                    btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');

                    setTimeout(() => {
                        btn.prop('disabled', false).html(oldText);
                        $('#sendSmsModal').modal('hide');
                        $('#smsMessage').val('').trigger('input');
                        showToast('Success', `SMS sent to ${segmentData.value?.total_players || 0} players in "${segmentData.value?.name}"`, 'success');
                    }, 1500);
                });

                $('input[name="giftType"]').on('change', function () {
                    const type = $(this).val();
                    $('#cashPanel').toggle(type === 'cash');
                    $('#bonusPanel').toggle(type === 'bonus');
                    updateGiftSummary();
                });

                const updateGiftSummary = () => {
                    const type = $('input[name="giftType"]:checked').val();
                    const segName = segmentData.value?.name || 'Current Segment';
                    $('#summaryType').text(type === 'cash' ? 'Cash' : 'Bonus');

                    if (type === 'cash') {
                        const amt = $('#cashAmount').val() || '0.00';
                        const cType = $('#cashType').val() || 'Not selected';
                        $('#summaryDetails').text(`${cType} - KES ${amt}`);
                    } else {
                        const bType = $('#bonusType option:selected').text();
                        $('#summaryDetails').text(bType === 'Choose a bonus...' ? 'Not selected' : bType);
                    }
                };

                $('#cashType, #cashAmount, #bonusType').on('change input', updateGiftSummary);

                $('#awardGiftBtn').on('click', function () {
                    const btn = $(this);
                    const oldText = btn.html();
                    btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Awarding...');

                    setTimeout(() => {
                        btn.prop('disabled', false).html(oldText);
                        $('#awardGiftsModal').modal('hide');
                        showToast('Success', `Gifts awarded to ${segmentData.value?.total_players || 0} players in "${segmentData.value?.name}"`, 'success');
                    }, 1500);
                });
            };

            watch(activeFields, () => {
                nextTick(() => {
                    initCharts();
                });
            }, { deep: true });

            onMounted(async () => {
                const params = new URLSearchParams(window.location.search);
                const id = params.get('id');
                if (id) {
                    let data = await window.fetchSegmentDetailsDummy(id);
                    if (!data) {
                        try {
                            if (window.fetchSegmentById) {
                                const apiRes = await window.fetchSegmentById(id);
                                data = apiRes?.data || apiRes;
                            }
                        } catch (apiErr) {
                            console.warn("[SegmentView] API segment not found, trying list fallback...", apiErr);
                            const allSegs = await window.fetchSegments(1, 100).catch(() => null);
                            const list = allSegs?.results || allSegs?.data || (Array.isArray(allSegs) ? allSegs : []);
                            const found = list.find(s => String(s.id) === String(id));
                            if (found) data = JSON.parse(JSON.stringify(found));
                        }
                    }

                    if (data) {
                        // Ensure it's a clean copy
                        data = JSON.parse(JSON.stringify(data));

                        // Generate synthetic trends if missing
                        if (!data.monthly_trend) {
                            const months = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'];
                            data.monthly_trend = months.map((m, i) => {
                                const factor = 0.8 + (i * 0.1);
                                return {
                                    month: m,
                                    players: Math.round((data.total_players || 10) * factor),
                                    active_players: Math.round((data.total_players || 10) * factor * 0.8),
                                    deposits: Math.round(((data.total_deposits || 50000) / 6) * factor),
                                    stake: Math.round(((data.total_bets || 80000) / 6) * factor),
                                    withdrawals: Math.round(((data.total_withdrawals || 20000) / 6) * factor)
                                };
                            });
                        }

                        // Fetch players for the segment (handles both hardcoded and dynamic criteria)
                        if (window.getPlayersForSegment) {
                            // Try real members API first
                            const isDummy = String(id).startsWith('seg') || String(id).startsWith('api_');
                            if (!isDummy) {
                                try {
                                    const resData = await apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}/members?page=1&per_page=100`);
                                    if (resData) {
                                        data.players = resData.data || resData.results || resData;
                                        console.log(`[SegmentView] Loaded ${data.players?.length || 0} real members from API.`);
                                    }
                                } catch (e) { console.warn("[SegmentView] Real members API failed, falling back to dummy.", e); }
                            }

                            if (!data.players) {
                                data.players = await window.getPlayersForSegment(data);
                                console.log(`[SegmentView] Loaded ${data.players?.length || 0} players for segment (Dummy/Local): ${data.name}`);
                            }

                            // Real counts for the Player strip
                            if (!data.total_players) data.total_players = data.players.length;
                            data.active_players = data.players.filter(p => p.status === 'active').length;
                        }

                        segmentData.value = data;
                        nextTick(() => {
                            setTimeout(initCharts, 150);
                            initMarketingActions();
                        });
                    }
                }
                isLoading.value = false;
            });

            return {
                segmentData, isLoading, search, statusFilter, sort, filteredPlayers, showPlayers, fmtShort, activeFields, chartFields, growthRate, projectedValue, nggr,
                topCasinoGames: computed(() => window.visualDummyData?.top_games || []),
                topTournaments: computed(() => window.visualDummyData?.top_tournaments || []),
                handleSort: (k) => { if (sort.key === k) sort.dir = sort.dir === 'desc' ? 'asc' : 'desc'; else { sort.key = k; sort.dir = 'desc'; } },
                formatNumber: (n) => (n || 0).toLocaleString(),
                totalDeposits: computed(() => segmentData.value?.total_deposits || 4200000), // Hardcoded nice number
                totalBets: computed(() => segmentData.value?.total_bets || 8500000),     // Hardcoded nice number
                activePlayers: computed(() => segmentData.value?.active_players || 0),
                downloadCSV: () => {
                    const h = ['Player Name', 'Email', 'Country', 'Status', 'Lifetime Deposits', 'Lifetime Bets'];
                    const d = filteredPlayers.value.map(p => [p.name, p.email, p.country, p.status, p.lifetime_deposits, p.lifetime_bets]);
                    const csv = [h, ...d].map(r => r.join(',')).join('\n');
                    const b = new Blob([csv], { type: 'text/csv' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = 'players.csv'; l.click();
                },
                goToPlayers: () => {
                    const params = new URLSearchParams(window.location.search);
                    const id = params.get('id');
                    if (id) window.location.href = `pages-segment-view.html?id=${encodeURIComponent(id)}`;
                },
                editSegment: () => {
                    const id = segmentData.value?.id;
                    if (id) window.location.href = `pages-segmentation.html?edit=${encodeURIComponent(id)}`;
                },
                getFieldLabel: window.getFieldLabel, 
                getOperatorLabel: window.getOperatorLabel, 
                deleteSegment: async () => {
                    const id = segmentData.value?.id;
                    if (!id) return;
                    
                    const isDummy = String(id).startsWith('seg') || String(id).startsWith('api_');
                    if (isDummy) {
                        if (window.showToast) window.showToast('Warning', 'Restricted in dummy mode', 'warning');
                        else alert('Restricted in dummy mode');
                        return;
                    }

                    if (!confirm(`Permanently delete segment "${segmentData.value.name}"?`)) return;
                    
                    try {
                        await window.deleteSegment(id);
                        if (window.showToast) window.showToast('Success', 'Segment deleted', 'success');
                        window.location.href = 'pages-saved-segments.html';
                    } catch (err) {
                        console.error("[SegmentView] Delete error:", err);
                        if (window.showToast) window.showToast('Error', 'Delete failed', 'error');
                    }
                }
            };
        }
    }).mount('#segmentViewApp');
}
