(function () {
    const { createApp, ref, computed, onMounted } = Vue;

    const initSavedSegments = () => {
        const el = document.getElementById('savedSegmentsApp');
        if (!el || el.__vue_app__) return; // Prevent double mounting

        createApp({
            setup() {
                const segments = ref([]);
                const isLoading = ref(true);
                const error = ref(null);

                const fetchSegments = async () => {
                    isLoading.value = true;
                    error.value = null;
                    console.log("[SavedSegments] Starting data fetch...");
                    try {
                        // 1. Fetch Dummy Data
                        const dummyRes = await (window.fetchSegmentsDummy ? window.fetchSegmentsDummy().catch(e => { console.error("Dummy fetch error", e); return []; }) : Promise.resolve([]));
                        
                        // 2. Fetch API Data
                        let apiRes = [];
                        if (window.fetchSegments) {
                            try {
                                const apiData = await window.fetchSegments(1, 100);
                                apiRes = apiData?.results || apiData?.data || (Array.isArray(apiData) ? apiData : []);
                            } catch (apiErr) {
                                console.error("[SavedSegments] API fetch error:", apiErr);
                            }
                        }

                        // 3. Combine and Map
                        const combined = [...(Array.isArray(apiRes) ? apiRes : []), ...(Array.isArray(dummyRes) ? dummyRes : [])];
                        console.log(`[SavedSegments] Found ${combined.length} segments to process.`);

                        const colors = ['#4e7adf', '#38c66c', '#ffd166', '#f43f5e', '#a78bfa', '#fb923c'];
                        
                        const mapped = await Promise.all(combined.map(async (s, i) => {
                            let players = [];
                            if (window.getPlayersForSegment) {
                                try {
                                    players = await window.getPlayersForSegment(s) || [];
                                } catch (pErr) { console.warn(`Player fetch failed for segment ${s.id}`); }
                            }
                            return {
                                ...s,
                                id: s.id || s._id || ('api_' + i),
                                name: s.name || 'Unnamed Segment',
                                color: s.color || colors[i % colors.length],
                                is_favorite: s.is_favorite || false,
                                total_players: s.total_players || players.length,
                                total_deposits: s.total_deposits || (Array.isArray(players) ? players.reduce((sum, p) => sum + (p.lifetime_deposits || 0), 0) : 0),
                                total_bets: s.total_bets || (Array.isArray(players) ? players.reduce((sum, p) => sum + (p.lifetime_bets || 0), 0) : 0),
                                total_withdrawals: s.total_withdrawals || (Array.isArray(players) ? players.reduce((sum, p) => sum + (p.lifetime_withdrawals || 0), 0) : 0)
                            };
                        }));

                        console.log("[SavedSegments] Successfully mapped data:", mapped);
                        segments.value = mapped;
                    } catch (e) {
                        error.value = "Failed to load segments.";
                        console.error("[SavedSegments] Critical fetch error:", e);
                    } finally {
                        isLoading.value = false;
                    }
                };

                const favoriteSegments = computed(() => segments.value.filter(s => s.is_favorite));

                onMounted(() => {
                    // Slight delay to ensure all global helper scripts (like segdummy.js) are fully parsed
                    setTimeout(fetchSegments, 50);
                });

                return {
                    segments, isLoading, error, favoriteSegments,
                    fmtShort: window.fmtShort || ((n) => n?.toLocaleString()),
                    goToDetails: (seg) => {
                        window.location.href = `pages-segment-details.html?id=${encodeURIComponent(seg.id)}`;
                    },
                    editSegment: (seg) => {
                        window.location.href = `pages-segmentation.html?edit=${encodeURIComponent(seg.id)}`;
                    },
                    toggleFavorite: async (seg) => {
                        if (window.toggleSegmentFavoriteDummy) {
                            await window.toggleSegmentFavoriteDummy(seg.id);
                            // Optimistic UI update or re-fetch
                            seg.is_favorite = !seg.is_favorite;
                        }
                    },
                    deleteSegment: async (seg) => {
                        if (window.deleteSegment) {
                            try {
                                await window.deleteSegment(seg.id);
                                segments.value = segments.value.filter(s => s.id !== seg.id);
                                if (window.showToast) window.showToast('Success', 'Segment deleted', 'success');
                            } catch (e) {
                                if (window.showToast) window.showToast('Error', 'Delete failed', 'error');
                            }
                        }
                    }
                };
            }
        }).mount('#savedSegmentsApp');
    };

    document.addEventListener('DOMContentLoaded', initSavedSegments);
})();
