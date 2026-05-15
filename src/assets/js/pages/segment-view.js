(function () {
    const { createApp, ref, computed, onMounted } = Vue;

    const initSegmentView = () => {
        const el = document.getElementById('segmentViewApp');
        if (!el) return;
        if (document.getElementById('segmentTrendChart')) return; // Details page has this ID too

        createApp({
            setup() {
                const segmentData = ref(null);
                const isLoading = ref(true);
                const search = ref('');
                const statusFilter = ref('all');
                const sort = { key: 'name', dir: 'asc' };

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

                onMounted(async () => {
                    const params = new URLSearchParams(window.location.search);
                    const id = params.get('id');
                    if (!id) {
                        isLoading.value = false;
                        return;
                    }

                    try {
                        let data = await window.fetchSegmentDetailsDummy?.(id);
                        if (data) {
                            if (!data.players && window.getPlayersForSegment) {
                                data.players = await window.getPlayersForSegment(data);
                            }
                            segmentData.value = data;
                        }
                    } catch (e) {
                        console.error("[SegmentView] Load error:", e);
                    } finally {
                        isLoading.value = false;
                    }
                });

                return {
                    segmentData, isLoading, search, statusFilter, filteredPlayers,
                    formatNumber: (n) => (n || 0).toLocaleString(),
                    totalDeposits: computed(() => segmentData.value?.total_deposits || 0),
                    totalBets: computed(() => segmentData.value?.total_bets || 0),
                    activePlayers: computed(() => segmentData.value?.active_players || 0),
                    downloadCSV: () => {
                        const h = ['Name', 'Email', 'Country', 'Status', 'Deposits', 'Bets'];
                        const d = filteredPlayers.value.map(p => [p.name, p.email, p.country, p.status, p.lifetime_deposits, p.lifetime_bets]);
                        const csv = [h, ...d].map(r => r.join(',')).join('\n');
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `segment_${segmentData.value?.id || 'players'}.csv`;
                        link.click();
                    },
                    handleSort: (key) => {
                        // Sort logic
                    }
                };
            }
        }).mount('#segmentViewApp');
    };

    document.addEventListener('DOMContentLoaded', initSegmentView);
})();
