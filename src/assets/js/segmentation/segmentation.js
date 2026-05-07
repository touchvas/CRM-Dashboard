
/**
 * segmentation.js
 * Centralized Segmentation Logic & Vue Apps
 */

/* ═══════════════════════════════════════════════════════════════
   1.  API SERVICE & UTILS
   ═══════════════════════════════════════════════════════════════ */

const SEGMENTATION_BASE_URL = 'https://crm.gamesapi.dev/v1';
const CRM_API_BASE = 'https://crm.gamesapi.dev/v1';
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
 *
 * FIX: Removed node.value unwrap — criteria is reactive(), not ref().
 * Previously `node.value` was undefined, causing silent failures.
 */
function flattenCriteria(node, rules = [], groups = []) {
    // FIX: criteria is reactive (no .value). Support both just in case.
    const rawNode = (node && node.value !== undefined) ? node.value : node;
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

window.updateSegment = (id, data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`, 'PUT', data);

window.deleteSegment = (id) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`, 'DELETE');

// Notification Templates API helpers
window.createNotificationTemplate = (data) =>
    apiRequest(`${CRM_API_BASE}/notifications/templates`, 'POST', data);

window.updateNotificationTemplate = (data) => // ID is in the body as per curl example
    apiRequest(`${CRM_API_BASE}/notifications/templates`, 'PUT', data);

window.deleteNotificationTemplate = (id) =>
    apiRequest(`${CRM_API_BASE}/notifications/templates/${id}`, 'DELETE');

window.fetchNotificationTemplates = async (page = 1, limit = 20) => {
    console.log(`[API] Fetching notification templates: page=${page}, limit=${limit}`);
    try {
        return await apiRequest(`${CRM_API_BASE}/notifications/templates?page=${page}&per_page=${limit}`);
    } catch (err) {
        console.warn("[API] Failed to fetch notification templates, falling back to dummy.", err);
        if (window.fetchNotificationTemplatesDummy) {
            return await window.fetchNotificationTemplatesDummy();
        }
        throw err;
    }
};

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
const initSegmentBuilder = () => {
    const el = document.getElementById('segmentBuilderApp');
    if (!el) return;

    console.log("[SegmentBuilder] Target element found. Initializing Vue app...");
    try {
        const app = createApp({
            setup() {
                console.log("[SegmentBuilder] setup() started.");
                const segmentName = ref('New Segment');
                const segmentDescription = ref('Enter segment description...');
                const refreshType = ref('REAL_TIME');

                const isEditMode = ref(false);
                let _uid = Date.now() + Math.floor(Math.random() * 1000);
                const uid = () => {
                    const id = `r${++_uid}`;
                    return id;
                };
                const makeRule = () => ({ _id: uid(), _type: 'rule', field: '', operator: '', value: '' });
                const makeGroup = () => ({ _id: uid(), _type: 'group', operator: 'AND', rules: [makeRule()] });

                const criteria = reactive({ operator: 'AND', rules: [makeRule()] });

                const addRule = (list) => {
                    console.log("[SegmentBuilder] Adding rule to list:", list);
                    if (Array.isArray(list)) list.push(makeRule());
                };
                const addGroup = (list) => {
                    console.log("[SegmentBuilder] Adding group to list:", list);
                    if (Array.isArray(list)) list.push(makeGroup());
                };
                const removeItem = (list, i) => {
                    console.log("[SegmentBuilder] Removing item at index:", i);
                    if (list.length > 1) list.splice(i, 1);
                };

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
                    },
                    {
                        label: 'Casino Behaviour', fields: [
                            { field: 'casino_rounds', label: 'Total Rounds Played', type: 'number' },
                            { field: 'casino_stake', label: 'Total Casino Stake', type: 'number' },
                            { field: 'casino_ggr', label: 'Casino GGR', type: 'number' },
                            { field: 'casino_avg_rtp_pct', label: 'Avg RTP %', type: 'number' },
                            { field: 'casino_jackpot_wins', label: 'Jackpot Wins Count', type: 'number' }
                        ]
                    },
                    {
                        label: 'Sportsbook Behaviour', fields: [
                            { field: 'sb_bets', label: 'Total Sports Bets', type: 'number' },
                            { field: 'sb_stake', label: 'Total Sports Stake', type: 'number' },
                            { field: 'sb_ggr', label: 'Sports GGR', type: 'number' },
                            { field: 'sb_avg_odds', label: 'Avg Odds', type: 'number' }
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

                // FIX: criteria is reactive() not ref() — removed criteria.value
                // Previously: criteria.value.operator = val (TypeError: cannot set on undefined)
                const setOperator = (val) => { criteria.operator = val; };

                const matchCount = ref('—');
                const runPreview = async () => {
                    if (!window.filterPlayersByCriteria) return;
                    const cleanCriteria = JSON.parse(JSON.stringify(criteria));
                    const res = await window.filterPlayersByCriteria(cleanCriteria);
                    matchCount.value = (res.data || []).length;
                };

                // FIX: watch criteria directly (reactive, not ref — no .value needed)
                watch(criteria, runPreview, { deep: true });

                const saving = ref(false);
                const saveCurrentSegment = async () => {
                    if (!segmentName.value.trim()) { alert('Please enter a segment name.'); return; }
                    const { rules, groups } = flattenCriteria(criteria);
                    if (rules.length === 0) { alert('Please add at least one complete rule.'); return; }

                    const params = new URLSearchParams(window.location.search);
                    const editId = params.get('edit');

                    const payload = {
                        name: segmentName.value.trim(),
                        description: segmentDescription.value.trim(),
                        refresh_type: refreshType.value,
                        criteria: { operator: criteria.operator, groups, rules }
                    };

                    saving.value = true;
                    try {
                        if (editId) {
                            await window.updateSegment(editId, payload);
                        } else {
                            await window.publishRule(payload);
                        }
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

                onMounted(async () => {
                    const params = new URLSearchParams(window.location.search);
                    const editId = params.get('edit');
                    console.log("[SegmentBuilder] setup() mounted. Edit ID:", editId);
                    
                    if (editId) {
                        try {
                            const res = await window.fetchSegmentById(editId);
                            const data = res.data || res;
                            isEditMode.value = true;
                            segmentName.value = data.name || '';
                            segmentDescription.value = data.description || '';
                            refreshType.value = data.refresh_type || 'REAL_TIME';
                            if (data.criteria) {
                                Object.assign(criteria, data.criteria);
                            }
                        } catch (err) {
                            console.error("[SegmentBuilder] Error loading segment for edit:", err);
                        }
                    }
                    runPreview();
                });

                return {
                    segmentName, segmentDescription, refreshType,
                    isEditMode,
                    criteria, addRule, addGroup, removeItem, setOperator,
                    fieldCategories, getFieldConfig, getOperators,
                    matchCount, runPreview, saving, saveCurrentSegment
                };
            }
        });
        app.mount('#segmentBuilderApp');
        console.log("[SegmentBuilder] Vue app mounted successfully.");
    } catch (err) {
        console.error("[SegmentBuilder] Critical initialization error:", err);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSegmentBuilder);
} else {
    initSegmentBuilder();
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
            
            const editSegment = (seg) => {
                window.location.href = `pages-segmentation.html?edit=${encodeURIComponent(seg.id || seg._id)}`;
            };

            const deleteSegment = async (seg) => {
                const id = seg.id || seg._id;
                if (!id) return;
                
                if (!confirm(`Are you sure you want to delete segment "${seg.name}"?`)) return;

                try {
                    await window.deleteSegment(id);
                    if (window.showToast) window.showToast('Success', 'Segment deleted', 'success');
                    await fetchSegments();
                } catch (err) {
                    console.error("[SavedSegments] Delete error:", err);
                    if (window.showToast) window.showToast('Error', 'Failed to delete segment', 'error');
                    else alert(`Failed to delete segment: ${err.message}`);
                }
            };

            onMounted(fetchSegments);

            return { 
                segments, 
                favoriteSegments, 
                isLoading, 
                toggleFavorite, 
                goToDetails, 
                editSegment, 
                deleteSegment, 
                fmtShort 
            };
        }
    }).mount('#savedSegmentsApp');
}

// ─── 2.3 Segment View App (#segmentViewApp) ─────────────────────────
if (document.getElementById('segmentViewApp')) {
    createApp({
        setup() {
            const segmentData = ref({ name: 'Loading Segment...', description: 'Fetching integrated analytics...', players: [] });
            const isLoading = ref(true);
            const search = ref('');
            const statusFilter = ref('all');
            const sort = reactive({ key: 'lifetime_deposits', dir: 'desc' });

            const growthRate = ref(window.visualDummyData?.kpis?.growthRate || 14.2);
            const projectedValue = ref(window.visualDummyData?.kpis?.projectedValue || 12500000);
            const nggr = ref(window.visualDummyData?.kpis?.nggr || 1840000);

            const activeFields = ref(['deposits', 'casino_bets', 'sports_bets']);
            const chartFields = ref(window.visualDummyData?.field_configs || [
                { key: 'deposits', label: 'Deposits', color: '#38c66c' },
                { key: 'casino_bets', label: 'Casino Bets', color: '#5b73e8' },
                { key: 'sports_bets', label: 'Sports Bets', color: '#f1b44c' },
                { key: 'withdrawals', label: 'Withdrawals', color: '#f46a6a' },
                { key: 'ggr', label: 'GGR', color: '#4e7adf' }
            ]);

            const trendData = ref(null);
            const statsData = ref(null);
            const casinoComparison = ref([]);
            const topGames = ref([]);
            const topTournaments = ref([]);

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

                let categories = visual.months;
                let metricsData = visual.metrics;

                if (trendData.value && trendData.value.length > 0) {
                    categories = trendData.value.map(d => d.period);
                    metricsData = {
                        deposits: trendData.value.map(d => d.total_deposit || 0),
                        withdrawals: trendData.value.map(d => d.total_withdrawal || 0),
                        active_users: trendData.value.map(d => d.period_active_players || 0),
                        casino_bets: trendData.value.map(d => d.total_casino_stakes || 0),
                        sports_bets: trendData.value.map(d => d.total_sportsbook_stakes || 0),
                        ggr: trendData.value.map(d => d.total_ggr || 0),
                        net_revenue: trendData.value.map(d => d.total_ngr || 0),
                        dormant_users: trendData.value.map(d => d.churned_count || 0), // Mapped from your JSON
                        blocked_users: trendData.value.map(d => d.blocked_users || 0),
                        new_players: trendData.value.map(d => d.active_last_24h || 0), // Mapped from your JSON
                        bonus_bets: trendData.value.map(d => d.bonus_bets || 0),
                        jackpot_bets: trendData.value.map(d => d.jackpot_bets || 0)
                    };
                }

                const renderChart = (id, options) => {
                    const el = document.querySelector(id);
                    if (el) {
                        el.innerHTML = '';
                        if (!options.chart) options.chart = {};
                        options.chart.fontFamily = "'Inter', sans-serif";
                        new ApexCharts(el, options).render();
                    }
                };

                const trendSeries = activeFields.value.map(key => ({
                    name: chartFields.value.find(f => f.key === key)?.label || key,
                    data: metricsData[key] || []
                }));

                renderChart("#segmentTrendChart", {
                    series: trendSeries,
                    chart: { type: 'line', height: 320, toolbar: { show: false }, zoom: { enabled: false } },
                    colors: activeFields.value.map(key => chartFields.value.find(f => f.key === key)?.color),
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 3 },
                    xaxis: { categories: categories },
                    yaxis: { labels: { formatter: v => fmtShort(v) } },
                    grid: { borderColor: '#f1f1f1', strokeDashArray: 3 },
                    legend: { show: true, position: 'top', horizontalAlign: 'right' }
                });
                
                const cashflowData = trendData.value && trendData.value.length > 0 ? trendData.value.slice(-6) : [];
                renderChart("#monthlyCashFlowChart", {
                    series: [
                        { name: 'Deposits', data: (cashflowData.length > 0 ? cashflowData.map(d => d.total_deposit || 0) : (metricsData.deposits || []).slice(-6)) },
                        { name: 'Withdrawals', data: (cashflowData.length > 0 ? cashflowData.map(d => -(d.total_withdrawal || 0)) : (metricsData.withdrawals || []).slice(-6).map(v => -v)) }
                    ],
                    chart: { type: 'bar', height: 250, stacked: false, toolbar: { show: false } },
                    plotOptions: { bar: { columnWidth: '60%', borderRadius: 0 } },
                    colors: ['#34c38f', '#f46a6a'],
                    legend: { show: true, position: 'top', horizontalAlign: 'center', fontSize: '11px' },
                    dataLabels: { enabled: false },
                    xaxis: { categories: categories.slice(-6), labels: { style: { fontSize: '10px' } } },
                    yaxis: { labels: { formatter: v => fmtShort(Math.abs(v)), style: { fontSize: '10px' } } },
                    grid: { strokeDashArray: 3 }
                });

                let sportsStake = 65, casinoStake = 35;
                const stats = statsData.value || (trendData.value && trendData.value.length > 0 ? trendData.value[trendData.value.length - 1] : null);
                if (stats) {
                    const total = (stats.total_sportsbook_stakes || 0) + (stats.total_casino_stakes || 0);
                    if (total > 0) {
                        sportsStake = (stats.total_sportsbook_stakes / total) * 100;
                        casinoStake = (stats.total_casino_stakes / total) * 100;
                    }
                }
                renderChart("#salesAnalyticsChart", {
                    series: [sportsStake, casinoStake],
                    chart: { type: 'donut', height: 350 },
                    labels: ['Sportsbook', 'Casino'],
                    colors: ['#5b73e8', '#34c38f'],
                    legend: { show: true, position: 'right', verticalAlign: 'middle', fontSize: '12px' },
                    plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Total Volume' } } } } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(1) + "%" }
                });

                renderChart("#playerStatusChart", {
                    series: visual.engagement.series,
                    chart: { type: 'donut', height: 350 },
                    labels: visual.engagement.labels,
                    colors: visual.engagement.colors,
                    legend: { show: true, position: 'right', verticalAlign: 'middle', fontSize: '12px' },
                    plotOptions: { pie: { startAngle: -90, endAngle: 90, offsetY: 40, donut: { size: '75%', labels: { show: true, total: { show: true, label: 'Active' } } } } },
                    grid: { padding: { bottom: -80, right: 10 } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(1) + "%" }
                });

                const donutOptions = (labels, colors, height = 350) => ({
                    chart: { type: 'donut', height: height },
                    labels: labels,
                    colors: colors,
                    legend: { show: true, position: 'right', fontSize: '12px' },
                    plotOptions: { pie: { donut: { size: '70%' } } },
                    dataLabels: { enabled: true, formatter: (val) => val.toFixed(0) + "%" }
                });

                let providerSeries = visual.casino_providers.series;
                let providerLabels = visual.casino_providers.labels;
                let gameSeries = visual.casino_games.series;
                let gameLabels = visual.casino_games.labels;

                if (casinoComparison.value && casinoComparison.value.length > 0) {
                    const data = casinoComparison.value[0]?.data || [];
                    const providers = {};
                    data.forEach(d => {
                        providers[d.provider_name] = (providers[d.provider_name] || 0) + (d.total_stake || 0);
                    });
                    const sortedProviders = Object.entries(providers).sort((a, b) => b[1] - a[1]).slice(0, 5);
                    providerLabels = sortedProviders.map(p => p[0]);
                    providerSeries = sortedProviders.map(p => p[1]);
                    const sortedGames = [...data].sort((a, b) => b.total_stake - a.total_stake).slice(0, 5);
                    gameLabels = sortedGames.map(g => g.game_name);
                    gameSeries = sortedGames.map(g => g.total_stake);
                }

                renderChart("#casinoGamesChart", {
                    ...donutOptions(gameLabels, visual.casino_games.colors),
                    series: gameSeries
                });

                renderChart("#casinoBetsChart", {
                    ...donutOptions(providerLabels, visual.casino_providers.colors),
                    series: providerSeries
                });

                renderChart("#deviceBreakdownChart", {
                    series: visual.device_breakdown.series,
                    chart: { type: 'radialBar', height: 250 },
                    plotOptions: {
                        radialBar: {
                            dataLabels: {
                                name: { fontSize: '22px' },
                                value: { fontSize: '16px' },
                                total: { show: true, label: 'Mobile', formatter: () => '72%' }
                            }
                        }
                    },
                    labels: visual.device_breakdown.labels,
                    colors: visual.device_breakdown.colors,
                });

                renderChart("#regionalDistributionChart", {
                    series: [{ data: visual.regional_distribution.series }],
                    chart: { type: 'bar', height: 250, toolbar: { show: false } },
                    plotOptions: { bar: { horizontal: true, columnWidth: '55%', borderRadius: 4 } },
                    dataLabels: { enabled: false },
                    colors: ['#5b73e8'],
                    xaxis: { categories: visual.regional_distribution.labels },
                });

                renderChart("#growthTrendChart", {
                    series: [{ name: 'New Players', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
                    chart: { type: 'area', height: 250, toolbar: { show: false }, zoom: { enabled: false } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 2 },
                    colors: ['#34c38f'],
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
                    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
                    yaxis: { labels: { show: false } },
                    grid: { borderColor: '#f1f1f1', strokeDashArray: 3 },
                });
            };

            // Expose marketing actions to window so they can be initialized from any page if needed
            window.initMarketingActions = () => {
                console.log("[Marketing] Initializing Marketing Actions (SMS/Gifts listeners)");
                
                // Clear existing listeners to avoid duplicates
                $('#smsTemplateSelect, #createTemplateBtn, #updateTemplateBtn, #deleteTemplateBtn, #smsMessage, .sms-variable-btn, input[name="giftType"], #awardGiftBtn, #cashType, #cashAmount, #bonusType').off();

                $('#smsMessage').on('input', function () {
                    const len = $(this).val().length;
                    $('#charCount').text(len);
                    $('#msgCount').text(Math.ceil(len / 160));
                });

                $('#smsTemplateSelect').on('change', function () {
                    const selected = $(this).find('option:selected');
                    const templateId = selected.data('id');
                    const isCustom = !templateId;

                    if (!isCustom) {
                        $('#smsTemplateName').val(selected.text());
                        $('#createTemplateBtn').hide();
                        $('#updateTemplateBtn, #deleteTemplateBtn').show();
                        // Populate message and update counts
                        $('#smsMessage').val(selected.val()).trigger('input');
                    } else {
                        $('#smsTemplateName').val('');
                        $('#smsMessage').val('').trigger('input');
                        $('#createTemplateBtn').show();
                        $('#updateTemplateBtn, #deleteTemplateBtn').hide();
                    }
                });

                $('#createTemplateBtn').on('click', async function () {
                    const name = $('#smsTemplateName').val().trim();
                    if (!name) {
                        showToast('Warning', 'Please enter a name for the new template', 'warning');
                        return;
                    }
                    const content = $('#smsMessage').val().trim();
                    if (!content) { showToast('Error', 'Message content cannot be empty', 'error'); return; }

                    const payload = {
                        name: name.trim(),
                        description: `Template: ${name.trim()}`,
                        content: [{ channel: 'sms', title: name.trim(), content: content, image: "" }],
                        default_retry_config: {}
                    };

                    try {
                        await window.createNotificationTemplate(payload);
                        showToast('Success', 'Template created successfully', 'success');
                        if (window.openSmsModal) await window.openSmsModal();
                    } catch (err) {
                        showToast('Error', 'Failed to create template: ' + err.message, 'error');
                    }
                });

                $('#updateTemplateBtn').on('click', async function () {
                    const selected = $('#smsTemplateSelect option:selected');
                    const templateId = selected.data('id');
                    const name = $('#smsTemplateName').val().trim();
                    const content = $('#smsMessage').val().trim();

                    if (!templateId) return;
                    if (!name || !content) { showToast('Error', 'Name and message content are required', 'error'); return; }

                    const payload = {
                        id: String(templateId),
                        name: name,
                        description: `Template: ${name}`,
                        content: [{ channel: 'sms', title: name, content: content, image: "" }],
                        default_retry_config: {}
                    };

                    try {
                        await window.updateNotificationTemplate(payload);
                        showToast('Success', 'Template updated successfully', 'success');
                        if (window.openSmsModal) await window.openSmsModal();
                    } catch (err) {
                        showToast('Error', 'Failed to update template: ' + err.message, 'error');
                    }
                });

                $('#deleteTemplateBtn').on('click', async function () {
                    const templateId = $('#smsTemplateSelect option:selected').data('id');
                    if (!templateId) return;
                    if (!confirm("Are you sure you want to delete this template?")) return;

                    try {
                        await window.deleteNotificationTemplate(templateId);
                        showToast('Success', 'Template deleted successfully', 'success');
                        if (window.openSmsModal) await window.openSmsModal();
                    } catch (err) {
                        showToast('Error', 'Failed to delete template: ' + err.message, 'error');
                    }
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
                        const seg = window.__segmentData__;
                        showToast('Success', `SMS sent to ${seg?.total_players || seg?.players?.length || 0} players in "${seg?.name || 'Current Segment'}"`, 'success');
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
                    const seg = window.__segmentData__;
                    const segName = seg?.name || 'Current Segment';
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
                        const seg = window.__segmentData__;
                        showToast('Success', `Gifts awarded to ${seg?.total_players || seg?.players?.length || 0} players in "${seg?.name || 'Current Segment'}"`, 'success');
                    }, 1500);
                });
            };

            watch(activeFields, () => {
                nextTick(() => { initCharts(); });
            }, { deep: true });

            onMounted(async () => {
                const params = new URLSearchParams(window.location.search);
                const id = params.get('id');
                console.log(`[SegmentView] Initializing for ID: ${id}`);

                if (!id) {
                    console.error("[SegmentView] No ID found in URL.");
                    isLoading.value = false;
                    return;
                }

                try {
                    let data = null;
                    data = await window.fetchSegmentDetailsDummy(id).catch(() => null);
                    if (data) console.log("[SegmentView] Loaded from dummy data.");

                    if (!data) {
                        try {
                            if (window.fetchSegmentById) {
                                console.log("[SegmentView] Fetching from API...");
                                const apiRes = await window.fetchSegmentById(id);
                                data = apiRes?.data || apiRes;
                            } else {
                                console.warn("[SegmentView] fetchSegmentById not found in global scope.");
                            }
                        } catch (apiErr) {
                            console.warn("[SegmentView] API segment not found, trying list fallback...", apiErr);
                            const allSegs = await window.fetchSegments(1, 100).catch(() => null);
                            const list = allSegs?.results || allSegs?.data || (Array.isArray(allSegs) ? allSegs : []);
                            data = list.find(s => String(s.id) === String(id));
                        }
                    }

                    if (data) {
                        console.log("[SegmentView] Segment details loaded:", data.name);
                        data = JSON.parse(JSON.stringify(data));

                        try {
                            const CRM_BASE = CRM_API_BASE;
                            const today = new Date();
                            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                            const formatDate = (d) => d.toISOString().split('T')[0];
                            const start = formatDate(lastWeek), end = formatDate(today);

                            const endpoints = [
                                { key: 'trend', url: `${CRM_BASE}/segments/${id}/trend?start_date=${start}&end_date=${end}` },
                                { key: 'stats', url: `${CRM_BASE}/segments/${id}/stats` },
                                { key: 'comparison', url: `${CRM_BASE}/segments/${id}/casino/comparison?start_date=${start}&end_date=${end}` },
                                { key: 'topGames', url: `${CRM_BASE}/segments/${id}/casino/top-games` },
                                { key: 'topTournaments', url: `${CRM_BASE}/segments/${id}/sports/top-tournaments` }
                            ];

                            console.log("[SegmentView] Fetching unified analytics...");
                            await Promise.all(endpoints.map(async (ep) => {
                                try {
                                    const json = await apiRequest(ep.url);
                                    if (json) {
                                        const result = json.data || json.results || json;
                                        if (ep.key === 'trend') trendData.value = result;
                                        if (ep.key === 'stats') statsData.value = result;
                                        if (ep.key === 'comparison') casinoComparison.value = result;
                                        if (ep.key === 'topGames') topGames.value = result;
                                        if (ep.key === 'topTournaments') topTournaments.value = result;
                                    }
                                } catch (err) { console.warn(`[SegmentView] API ${ep.key} failed:`, err); }
                            }));
                        } catch (e) {
                            console.warn("[SegmentView] Unified Analytics fetch failed.", e);
                        }

                        if (statsData.value) {
                            console.log("[SegmentView] Enriched with stats data.");
                            data.total_players = statsData.value.total_players;
                            data.active_players = statsData.value.active_last_24h;
                            data.total_deposits = statsData.value.total_deposit;
                            data.total_bets = (statsData.value.total_casino_stakes || 0) + (statsData.value.total_sportsbook_stakes || 0);
                        }

                        if (!trendData.value && !data.monthly_trend) {
                            console.log("[SegmentView] Generating synthetic trends.");
                            data.monthly_trend = window.segmentationDummyBackup.generateSyntheticTrends(data);
                        }

                        if (window.getPlayersForSegment) {
                            try {
                                const membersUrl = `${SEGMENTATION_BASE_URL}/segments/${id}/members?page=1&per_page=100`;
                                const resData = await apiRequest(membersUrl);
                                data.players = resData?.data || resData?.results || resData;
                                console.log(`[SegmentView] Loaded ${data.players?.length || 0} real members via apiRequest.`);
                            } catch (e) { console.warn("[SegmentView] API members fetch failed, falling back to dummy.", e); }
                            if (!data.players) {
                                data.players = await window.getPlayersForSegment(data);
                                console.log(`[SegmentView] Loaded ${data.players?.length || 0} players from dummy.`);
                            }
                        }

                        segmentData.value = data;
                        window.__segmentData__ = data; // For global access (e.g. gifts modal)

                        nextTick(() => {
                            setTimeout(initCharts, 150);
                            if (window.initMarketingActions) window.initMarketingActions();
                        });
                    }
                } catch (e) {
                    console.error("[SegmentView] Critical error during mount:", e);
                } finally {
                    isLoading.value = false;
                }
            });

            return {
                segmentData, isLoading, search, statusFilter, sort, filteredPlayers, showPlayers, fmtShort, activeFields, chartFields, growthRate, projectedValue, nggr, trendData, statsData,
                topCasinoGames: computed(() => topGames.value.length > 0 ? topGames.value : (window.visualDummyData?.top_games || [])),
                topTournaments: computed(() => topTournaments.value.length > 0 ? topTournaments.value : (window.visualDummyData?.top_tournaments || [])),
                handleSort: (k) => { if (sort.key === k) sort.dir = sort.dir === 'desc' ? 'asc' : 'desc'; else { sort.key = k; sort.dir = 'desc'; } },
                formatNumber: (n) => (n || 0).toLocaleString(),
                totalDeposits: computed(() => segmentData.value?.total_deposits || 0),
                totalBets: computed(() => segmentData.value?.total_bets || 0),
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
                getOperatorLabel: window.getOperatorLabel, 
                editSegment: () => {
                    const id = segmentData.value?.id;
                    if (id) window.location.href = `pages-segmentation.html?edit=${encodeURIComponent(id)}`;
                },
                deleteSegment: async () => {
                    const id = segmentData.value?.id;
                    if (!id) return;
                    if (!confirm(`Permanently delete "${segmentData.value.name}"?`)) return;
                    
                    try {
                        await window.deleteSegment(id);
                        if (window.showToast) window.showToast('Success', 'Segment deleted', 'success');
                        window.location.href = 'pages-saved-segments.html';
                    } catch (err) {
                        console.error("[SegmentView] Delete error:", err);
                        if (window.showToast) window.showToast('Error', 'Delete failed', 'error');
                        else alert("Delete failed: " + err.message);
                    }
                }
            };
        }
    }).mount('#segmentViewApp');
}

// Global initialization for pages that might not have the full Vue app but have the modals
document.addEventListener('DOMContentLoaded', () => {
    // If we are NOT on a page with segmentViewApp, we still might want to init marketing actions
    // but only if the modals are present in the DOM.
    if (!document.getElementById('segmentViewApp') && document.getElementById('sendSmsModal')) {
        console.log("[Marketing] Global trigger for Marketing Actions");
        if (window.initMarketingActions) window.initMarketingActions();
    }
});
