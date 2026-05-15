(function () {
    const { createApp, ref, computed, onMounted } = Vue;

    const initSavedSegments = () => {
        const el = document.getElementById('savedSegmentsApp');
        if (!el) return;

        createApp({
            setup() {
                const segments = ref([]);
                const isLoading = ref(true);

                const fetchSegments = async () => {
                    isLoading.value = true;
                    try {
                        let data = null;
                        if (window.fetchSegmentsDummy) {
                            data = await window.fetchSegmentsDummy();
                        } else if (window.fetchSegments) {
                            const res = await window.fetchSegments(1, 100);
                            data = res?.results || res?.data || res;
                        }
                        segments.value = data || [];
                    } catch (e) {
                        console.error("[SavedSegments] Fetch error:", e);
                    } finally {
                        isLoading.value = false;
                    }
                };

                const favoriteSegments = computed(() => 
                    segments.value.filter(s => s.is_favorite)
                );

                onMounted(fetchSegments);

                return {
                    segments,
                    isLoading,
                    favoriteSegments,
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
