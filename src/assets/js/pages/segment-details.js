/**
 * segment-details.js
 * Logic for the Segment Details page (pages-segment-details.html)
 * Decoupled from segmentation.js to follow modular architecture.
 */

(function () {
    const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

    const initSegmentDetails = () => {
        const el = document.getElementById('segmentViewApp');
        if (!el) return;

        createApp({
            setup() {
                const segmentData = ref(null);
                const isLoading = ref(true);
                const search = ref('');
                const statusFilter = ref('all');
                const sort = { key: 'name', dir: 'asc' };
                const showPlayers = ref(false);

                // For chart toggles
                const activeFields = ref(['total_stake', 'total_ggr', 'active_players']);
                const chartFields = [
                    { key: 'total_stake', label: 'Stakes' },
                    { key: 'total_ggr', label: 'GGR' },
                    { key: 'active_players', label: 'Active Players' },
                    { key: 'total_deposits', label: 'Deposits' }
                ];

                const trendData = ref(null);
                const statsData = ref(null);
                const topGames = ref([]);
                const topTournaments = ref([]);

                // Computed metrics
                const growthRate = computed(() => statsData.value?.growth_rate || '12.5');
                const projectedValue = computed(() => statsData.value?.projected_value || 450000);
                const nggr = computed(() => statsData.value?.nggr || 125000);

                const filteredPlayers = computed(() => {
                    if (!segmentData.value?.players) return [];
                    let list = [...segmentData.value.players];

                    if (search.value) {
                        const q = search.value.toLowerCase();
                        list = list.filter(p =>
                            p.name.toLowerCase().includes(q) ||
                            p.email.toLowerCase().includes(q)
                        );
                    }

                    if (statusFilter.value !== 'all') {
                        list = list.filter(p => p.status === statusFilter.value);
                    }

                    return list;
                });

                const initCharts = () => {
                    if (!segmentData.value) return;

                    // Main Trend Chart
                    const trendOptions = {
                        series: activeFields.value.map(field => ({
                            name: chartFields.find(f => f.key === field)?.label || field,
                            data: (trendData.value || segmentData.value.monthly_trend || []).map(d => d[field] || 0)
                        })),
                        chart: { height: 500, type: 'area', toolbar: { show: false }, zoom: { enabled: false }, animations: { enabled: true, easing: 'easeinout', speed: 800 } },
                        colors: ['#5b73e8', '#34c38f', '#f1b44c', '#f46a6a'],
                        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
                        dataLabels: { enabled: false },
                        stroke: { curve: 'smooth', width: 3 },
                        xaxis: { categories: (trendData.value || segmentData.value.monthly_trend || []).map(d => d.date || d.month), axisBorder: { show: false }, axisTicks: { show: false } },
                        yaxis: { labels: { formatter: (v) => window.fmtShort(v) } },
                        grid: { borderColor: '#f1f1f1', strokeDashArray: 3 },
                        legend: { position: 'top', horizontalAlign: 'right' }
                    };

                    const trendChartEl = document.querySelector("#segmentTrendChart");
                    if (trendChartEl) {
                        trendChartEl.innerHTML = '';
                        new ApexCharts(trendChartEl, trendOptions).render();
                    }

                    // Product Performance (Donut)
                    const productOptions = {
                        series: [65, 35],
                        chart: { type: 'donut', height: 280 },
                        labels: ['Casino', 'Sportsbook'],
                        colors: ['#5b73e8', '#34c38f'],
                        legend: { position: 'bottom' },
                        plotOptions: { pie: { donut: { size: '75%' } } }
                    };
                    const productChartEl = document.querySelector("#salesAnalyticsChart");
                    if (productChartEl) {
                        productChartEl.innerHTML = '';
                        new ApexCharts(productChartEl, productOptions).render();
                    }

                    // Player Activity (Bar)
                    const activityOptions = {
                        series: [{ name: 'High', data: [44, 55, 41, 67, 22, 43] }, { name: 'Medium', data: [13, 23, 20, 8, 13, 27] }, { name: 'Low', data: [11, 17, 15, 15, 21, 14] }],
                        chart: { type: 'bar', height: 280, stacked: true, toolbar: { show: false } },
                        colors: ['#5b73e8', '#34c38f', '#f1b44c'],
                        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
                        legend: { position: 'bottom' }
                    };
                    const activityChartEl = document.querySelector("#playerActivityStacked");
                    if (activityChartEl) {
                        activityChartEl.innerHTML = '';
                        new ApexCharts(activityChartEl, activityOptions).render();
                    }

                    // Cashflow (Line)
                    const cashOptions = {
                        series: [{ name: 'Inflow', data: [31, 40, 28, 51, 42, 109, 100] }, { name: 'Outflow', data: [11, 32, 45, 32, 34, 52, 41] }],
                        chart: { height: 280, type: 'line', toolbar: { show: false } },
                        colors: ['#34c38f', '#f46a6a'],
                        stroke: { width: [3, 3], curve: 'smooth' },
                        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }
                    };
                    const cashChartEl = document.querySelector("#monthlyCashFlowChart");
                    if (cashChartEl) {
                        cashChartEl.innerHTML = '';
                        new ApexCharts(cashChartEl, cashOptions).render();
                    }
                };

                watch(activeFields, () => {
                    nextTick(() => { initCharts(); });
                }, { deep: true });

                onMounted(async () => {
                    const params = new URLSearchParams(window.location.search);
                    const id = params.get('id');
                    if (!id) {
                        isLoading.value = false;
                        return;
                    }

                    try {
                        let data = null;
                        // Try dummy first
                        if (window.fetchSegmentDetailsDummy) {
                            data = await window.fetchSegmentDetailsDummy(id).catch(() => null);
                        }

                        // Try API fallback
                        if (!data && window.fetchSegmentById) {
                            const apiRes = await window.fetchSegmentById(id).catch(() => null);
                            data = apiRes?.data || apiRes;
                        }

                        if (data) {
                            // Deep copy to break reactivity if needed
                            data = JSON.parse(JSON.stringify(data));

                            // Try to enrich with real analytics if available
                            try {
                                const start = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
                                const end = new Date().toISOString().split('T')[0];
                                
                                const endpoints = [
                                    { key: 'trend', url: `https://crm.gamesapi.dev/v1/segments/${id}/trend?start_date=${start}&end_date=${end}` },
                                    { key: 'stats', url: `https://crm.gamesapi.dev/v1/segments/${id}/stats` },
                                    { key: 'topGames', url: `https://crm.gamesapi.dev/v1/segments/${id}/casino/top-games` },
                                    { key: 'topTournaments', url: `https://crm.gamesapi.dev/v1/segments/${id}/sports/top-tournaments` }
                                ];

                                await Promise.all(endpoints.map(async (ep) => {
                                    try {
                                        const res = await window.apiRequest(ep.url);
                                        const result = res?.data || res?.results || (Array.isArray(res) ? res : []);
                                        if (ep.key === 'trend') trendData.value = result;
                                        if (ep.key === 'stats') statsData.value = result;
                                        if (ep.key === 'topGames') topGames.value = result;
                                        if (ep.key === 'topTournaments') topTournaments.value = result;
                                    } catch (err) { console.warn(`[SegmentDetails] Failed to fetch ${ep.key}`); }
                                }));
                            } catch (e) { console.warn("[SegmentDetails] Analytics fetch skipped"); }

                            // Synthetic trends if still empty
                            if (!trendData.value && !data.monthly_trend && window.segmentationDummyBackup?.generateSyntheticTrends) {
                                data.monthly_trend = window.segmentationDummyBackup.generateSyntheticTrends(data);
                            }

                            // Members
                            if (!data.players && window.getPlayersForSegment) {
                                data.players = await window.getPlayersForSegment(data);
                            }

                            segmentData.value = data;
                            window.__segmentData__ = data; // For global modals

                            nextTick(() => {
                                setTimeout(initCharts, 200);
                            });
                        }
                    } catch (e) {
                        console.error("[SegmentDetails] Mount error:", e);
                    } finally {
                        isLoading.value = false;
                    }
                });

                return {
                    segmentData, isLoading, search, statusFilter, filteredPlayers, activeFields, chartFields,
                    growthRate, projectedValue, nggr, trendData,
                    topCasinoGames: computed(() => (topGames.value && topGames.value.length > 0) ? topGames.value : (window.visualDummyData?.top_games || [])),
                    topTournaments: computed(() => (topTournaments.value && topTournaments.value.length > 0) ? topTournaments.value : (window.visualDummyData?.top_tournaments || [])),
                    fmtShort: window.fmtShort || ((n) => n?.toLocaleString()),
                    editSegment: () => {
                        const id = segmentData.value?.id;
                        if (id) window.location.href = `pages-segmentation.html?edit=${encodeURIComponent(id)}`;
                    },
                    goToPlayers: () => {
                        const id = segmentData.value?.id;
                        if (id) window.location.href = `pages-segment-view.html?id=${encodeURIComponent(id)}`;
                    },
                    deleteSegment: async () => {
                        const id = segmentData.value?.id;
                        if (!id) return;
                        if (window.deleteSegment) {
                            try {
                                await window.deleteSegment(id);
                                if (window.showToast) window.showToast('Success', 'Segment deleted', 'success');
                                window.location.href = 'pages-saved-segments.html';
                            } catch (err) {
                                if (window.showToast) window.showToast('Error', 'Delete failed', 'error');
                            }
                        }
                    }
                };
            }
        }).mount('#segmentViewApp');
    };

    document.addEventListener('DOMContentLoaded', initSegmentDetails);
})();
