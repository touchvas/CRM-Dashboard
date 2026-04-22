console.log("Rules Portal: app.js module loading started... [Build Version: 1.2.4]");

// Destructure Vue globals (loaded via CDN in HTML)
const { createApp, ref, computed, onMounted, reactive } = Vue;

// ─── Wait for DOM before running any jQuery / Vue init ───────────────────────
document.addEventListener("DOMContentLoaded", function () {

    (function ($) {

        'use strict';

        function initMetisMenu() {
            if ($("#side-menu").length > 0) {
                $("#side-menu").metisMenu();
            }
        }

        function initLeftMenuCollapse() {
            $('#sidebar-btn').off('click').on('click', function (event) {
                event.preventDefault();
                if ($(window).width() >= 992) {
                    $('body').toggleClass('sidebar-collapsed');
                    $('body').removeClass('sidebar-enable');
                } else {
                    $('body').toggleClass('sidebar-enable');
                    $('body').removeClass('sidebar-collapsed');
                }
            });

            $('#close-sidebar').off('click').on('click', function () {
                $('body').removeClass('sidebar-enable');
            });

            $(document).off('click', '.sidebar-left').on('click', '.sidebar-left', function (e) {
                if ($(e.target).hasClass('sidebar-left')) {
                    $("body").removeClass("sidebar-enable");
                }
            });

            $('#sidebar-menu a').off('click').on('click', function () {
                if ($(window).width() < 992 && !$(this).hasClass('menu-toggle') && !$(this).hasClass('has-arrow')) {
                    $('body').removeClass('sidebar-enable');
                }
            });
        }

        function initActiveMenu() {
            $("#sidebar-menu a").each(function () {
                var pageUrl = window.location.href.split(/[?#]/)[0];
                const isRoot = pageUrl.endsWith('index.html') || pageUrl.endsWith('/');

                if (this.href == pageUrl) {
                    $(this).addClass("active");
                    $(this).parent().addClass("mm-active");
                    $(this).parents('ul').each(function () {
                        $(this).addClass("mm-show").parent().addClass("mm-active");
                    });
                    $(this).parents('li').addClass("mm-active");
                } else if (isRoot) {
                    if (this.getAttribute('href') === 'index.html') {
                        $(this).addClass("active");
                        $(this).parent().addClass("mm-active");
                    }
                }
            });
        }

        document.addEventListener("scroll", function () {
            windowScroll();
        });

        function windowScroll() {
            var pageTopbar = document.getElementById("page-topbar");
            if (pageTopbar) {
                document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50
                    ? pageTopbar.classList.add("topbar-shadow")
                    : pageTopbar.classList.remove("topbar-shadow");
            }
        }

        function initMenuItem() {
            $(".navbar-nav a").each(function () {
                var pageUrl = window.location.href.split(/[?#]/)[0];
                if (this.href == pageUrl) {
                    $(this).addClass("active");
                    $(this).parent().addClass("active");
                    $(this).parent().parent().addClass("active");
                    $(this).parent().parent().parent().addClass("active");
                    $(this).parent().parent().parent().parent().addClass("active");
                    $(this).parent().parent().parent().parent().parent().addClass("active");
                }
            });
        }

        function initMenuItemScroll() {
            $(document).ready(function () {
                if ($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0) {
                    var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
                    if (activeMenu > 300) {
                        activeMenu = activeMenu - 300;
                        $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
                    }
                }
            });
        }

        function initFullScreen() {
            $('[data-toggle="fullscreen"]').on("click", function (e) {
                e.preventDefault();
                $('body').toggleClass('fullscreen-enable');
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            });
            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            function exitHandler() {
                if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                    $('body').removeClass('fullscreen-enable');
                }
            }
        }

        function initRightSidebar() {
            $('.right-bar-toggle').on('click', function () {
                $('body').toggleClass('right-bar-enabled');
            });

            $(document).on('click', 'body', function (e) {
                if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                    return;
                }
                $('body').removeClass('right-bar-enabled');
            });
        }

        function initDropdownMenu() {
            if (document.getElementById("topnav-menu-content")) {
                var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i].onclick = function (elem) {
                        if (elem.target.getAttribute("href") === "#") {
                            elem.target.parentElement.classList.toggle("active");
                            elem.target.nextElementSibling.classList.toggle("show");
                        }
                    };
                }
                window.addEventListener("resize", updateMenu);
            }
        }

        function updateMenu() {
            var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
            for (var i = 0, len = elements.length; i < len; i++) {
                if (elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
                    elements[i].parentElement.classList.remove("active");
                    elements[i].nextElementSibling.classList.remove("show");
                }
            }
        }

        function initComponents() {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });

            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }

        function initSettings() {
            var bodyElem = document.documentElement;

            if (bodyElem.hasAttribute("data-bs-theme") && bodyElem.getAttribute("data-bs-theme") == "light") {
                sessionStorage.setItem("data-layout-mode", "light");
            } else if (bodyElem.getAttribute("data-bs-theme") == "dark") {
                sessionStorage.setItem("data-layout-mode", "dark");
            }

            if (sessionStorage.getItem("data-layout-mode") == null) {
                bodyElem.setAttribute("data-bs-theme", "light");
            } else if (sessionStorage.getItem("data-layout-mode")) {
                bodyElem.setAttribute("data-bs-theme", sessionStorage.getItem("data-layout-mode"));
            }

            var lightDarkBtn = document.getElementById('light-dark-mode');
            if (lightDarkBtn) {
                lightDarkBtn.addEventListener('click', function () {
                    if (bodyElem.hasAttribute("data-bs-theme") && bodyElem.getAttribute("data-bs-theme") == "dark") {
                        bodyElem.setAttribute('data-bs-theme', 'light');
                        sessionStorage.setItem("data-layout-mode", "light");
                    } else {
                        bodyElem.setAttribute('data-bs-theme', 'dark');
                        sessionStorage.setItem("data-layout-mode", "dark");
                    }
                });
            }

            var layoutDirBtn = document.getElementById('layout-dir-btn');
            if (layoutDirBtn) {
                layoutDirBtn.addEventListener('click', function () {
                    if (bodyElem.hasAttribute("dir") && bodyElem.getAttribute("dir") == "rtl") {
                        bodyElem.setAttribute("dir", "ltr");
                        document.getElementById("bootstrap-style").setAttribute("href", "assets/css/bootstrap.min.css");
                        document.getElementById("app-style").setAttribute("href", "assets/css/app.min.css");
                        this.innerHTML = "RTL";
                    } else {
                        bodyElem.setAttribute("dir", "rtl");
                        document.getElementById("bootstrap-style").setAttribute("href", "assets/css/bootstrap-rtl.min.css");
                        document.getElementById("app-style").setAttribute("href", "assets/css/app-rtl.min.css");
                        this.innerHTML = "LTR";
                    }
                });
            }
        }

        function initPreloader() {
            $(window).on('load', function () {
                $('#status').fadeOut();
                $('#preloader').delay(350).fadeOut('slow');
            });
        }

        function init() {
            initActiveMenu();
            initLeftMenuCollapse();
            initMetisMenu();
            initMenuItem();
            initMenuItemScroll();
            initFullScreen();
            initRightSidebar();
            initDropdownMenu();
            initComponents();
            initPreloader();
            initSettings();
            if (typeof Waves !== 'undefined') Waves.init();
        }

        init();

    })(jQuery);


    // ─── Saved Segments App ───────────────────────────────────────────────────
    const savedSegmentsApp = createApp({
        setup() {
            const segments = ref([]);
            const selectedSegment = ref(null);
            const isLoading = ref(false);
            const filteredContacts = ref([]);
            const isPreviewLoading = ref(false);

            const isCreating = ref(false);
            const filterSchema = ref([]);
            const segmentName = ref('');
            const segmentDescription = ref('');
            const refreshType = ref('REAL_TIME');
            const criteria = ref({
                operator: 'AND',
                rules: [{ field: '', operator: 'eq', value: '' }]
            });

            const showInitialCreateButton = computed(() => segments.value.length === 0 && !isCreating.value && !isLoading.value);
            const previewContacts = computed(() => filteredContacts.value.slice(0, 5));

            const goToDetails = (segment) => {
                const id = segment.id || segment.name;
                window.location.href = `pages-segment-details.html?id=${id}`;
            };

            const loadSchema = async () => {
                try {
                    filterSchema.value = window.getProcessedFilterSchema();
                } catch (e) { console.error("Schema fetch failed", e); }
            };

            const startCreating = async () => {
                isCreating.value = true;
                if (filterSchema.value.length === 0) await loadSchema();
            };

            const loadSavedSegments = async () => {
                isLoading.value = true;
                try {
                    const res = await window.fetchSegmentsDummy();
                    segments.value = res?.data || res || [];
                } catch (error) {
                    console.error("Error loading saved segments:", error);
                    segments.value = JSON.parse(localStorage.getItem('segments') || '[]');
                } finally {
                    isLoading.value = false;
                }
            };

            const addCondition = () => criteria.value.rules.push({ field: '', operator: 'eq', value: '' });
            const removeCondition = (idx) => { if (criteria.value.rules.length > 1) criteria.value.rules.splice(idx, 1); };

            const saveCurrentSegment = async () => {
                if (!segmentName.value) { alert('Name required'); return; }
                try {
                    isLoading.value = true;
                    await window.createSegmentDummy(segmentName.value, segmentDescription.value, refreshType.value, {
                        operator: criteria.value.operator,
                        rules: criteria.value.rules.map(r => ({ field: r.field, operator: r.operator, value: r.value }))
                    });
                    isCreating.value = false;
                    segmentName.value = '';
                    await loadSavedSegments();
                } catch (e) { alert("Save failed"); } finally { isLoading.value = false; }
            };

            onMounted(async () => {
                await loadSavedSegments();
            });

            async function viewSegment(segment) {
                if (isCreating.value) return;
                const isAlreadySelected = selectedSegment.value &&
                    (selectedSegment.value.id === segment.id || selectedSegment.value.name === segment.name);
                if (isAlreadySelected) {
                    selectedSegment.value = null;
                    filteredContacts.value = [];
                } else {
                    selectedSegment.value = segment;
                    filteredContacts.value = [];
                    isPreviewLoading.value = true;
                    try {
                        filteredContacts.value = await window.getPlayersForSegment(segment);
                    } catch (e) {
                        console.error("Preview resolution failed", e);
                    } finally {
                        isPreviewLoading.value = false;
                    }
                }
            }

            const fmtShort = (n) => {
                if (!n) return '0';
                if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
                if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
                return String(n);
            };

            return {
                segments, selectedSegment, isLoading, filteredContacts, isPreviewLoading,
                viewSegment,
                getSegmentSummary: window.getSegmentSummary,
                isCreating, startCreating, showInitialCreateButton,
                segmentName, segmentDescription, refreshType, criteria, filterSchema,
                addCondition, removeCondition, saveCurrentSegment, previewContacts, goToDetails,
                getFieldLabel: window.getFieldLabel,
                getOperatorLabel: window.getOperatorLabel
            };
        }
    });

    if (document.getElementById('savedSegmentsApp')) {
        savedSegmentsApp.mount('#savedSegmentsApp');
        console.log("savedSegmentsApp mounted.");
    }


    // ─── Segment View App ─────────────────────────────────────────────────────
    const segmentViewApp = createApp({
        setup() {
            const segmentData = ref(null);
            const isLoading = ref(true);
            const search = ref('');
            const statusFilter = ref('all');
            const sort = reactive({ key: 'total_deposits', dir: 'desc' });

            // ── Chart field definitions (colours drive both the chart lines and the right-panel dots) ──
            const chartFields = [
                { key: 'deposits', label: 'Deposits', color: '#4e7adf' },
                { key: 'stake', label: 'Stake', color: '#ffd166' },
                { key: 'withdrawals', label: 'Withdrawals', color: '#38c66c' },
                { key: 'bets', label: 'Bet Count', color: '#f76b6b' },
                { key: 'players', label: 'Active Players', color: '#a78bfa' },
            ];
            const activeFields = ref(['deposits', 'stake', 'withdrawals', 'bets', 'players']);

            // Chart instance refs — kept so we can destroy before re-render
            let chartInstance = null;
            let salesChartInstance = null;
            let cashFlowChartInstance = null;
            let statusChartInstance = null;
            let casinoChartInstance = null;

            const urlParams = new URLSearchParams(window.location.search);
            const segmentId = urlParams.get('id');

            // ── Shared formatter ─────────────────────────────────────────────
            const fmtShort = (n) => {
                if (!n && n !== 0) return '0';
                if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
                if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
                return String(n);
            };

            // ── Computed ─────────────────────────────────────────────────────
            const filteredPlayers = computed(() => {
                if (!segmentData.value?.players) return [];
                return segmentData.value.players
                    .filter(p => {
                        const matchStatus = statusFilter.value === 'all' || p.status === statusFilter.value;
                        const q = search.value.toLowerCase();
                        const matchSearch = p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
                        return matchStatus && matchSearch;
                    })
                    .sort((a, b) => {
                        const [va, vb] = [a[sort.key], b[sort.key]];
                        const dir = sort.dir === 'asc' ? 1 : -1;
                        return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
                    });
            });

            const growthRate = computed(() => {
                const trend = segmentData.value?.monthly_trend;
                if (!trend || trend.length < 2) return 0;
                const last = trend[trend.length - 1].deposits;
                const prev = trend[trend.length - 2].deposits;
                if (!prev) return 0;
                return (((last - prev) / prev) * 100).toFixed(1);
            });

            const projectedValue = computed(() => {
                if (!segmentData.value?.total_players) return 0;
                const avg = segmentData.value.total_deposits / segmentData.value.total_players / 6;
                return Math.round(avg * 12 * segmentData.value.total_players);
            });

            const nggr = computed(() => {
                if (!segmentData.value) return 0;
                return segmentData.value.total_bets - segmentData.value.total_withdrawals;
            });

            // ── 1. Performance Trends — Area chart ───────────────────────────
            const initChart = () => {
                const el = document.querySelector('#segmentTrendChart');
                if (!el || !segmentData.value) return;

                const trend = segmentData.value.monthly_trend || [];
                const categories = trend.map(d => d.month);

                const buildSeries = () =>
                    chartFields // Ensure only active fields are included in the series
                        .filter(f => activeFields.value.includes(f.key))
                        .map(f => ({
                            name: f.label,
                            data: trend.map(d => d[f.key] ?? 0),
                            yaxisIndex: (f.key === 'bets' || f.key === 'players') ? 1 : 0, // Assign to appropriate Y-axis
                        }));

                const activeColors = () =>
                    chartFields.filter(f => activeFields.value.includes(f.key)).map(f => f.color);

                const options = {
                    series: buildSeries(),
                    chart: {
                        height: 260,
                        type: 'area',
                        toolbar: { show: false },
                        animations: { enabled: true, speed: 400 },
                        fontFamily: 'Inter, sans-serif',
                        foreColor: '#475569',
                    },
                    colors: activeColors(),
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 3 },
                    markers: {
                        strokeWidth: 2,
                        hover: { size: 6 }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] },
                    },
                    xaxis: {
                        categories,
                        axisTicks: { show: false },
                        labels: { style: { fontSize: '13px', fontWeight: 500, colors: '#6b7280' } },
                    },
                    yaxis: [
                        {
                            title: { text: 'Value (KES)', style: { fontSize: '12px', color: '#475569', fontWeight: 600 } },
                            labels: { formatter: v => fmtShort(v), style: { fontSize: '12px', colors: '#475569' } },
                        },
                        {
                            opposite: true,
                            labels: {
                                formatter: v => `${fmtShort(v)}`, // For Count series
                                style: { fontSize: '12px', colors: '#475569' }
                            },
                        },
                    ],
                    grid: { borderColor: '#e5e7eb', strokeDashArray: 3, padding: { left: 10, right: 10 } },
                    legend: { show: false }, // legend lives in right panel
                    tooltip: {
                        theme: 'dark',
                        style: { fontSize: '13px' },
                        y: [
                            { formatter: v => `KES ${fmtShort(v)}` }, // For Value (KES) series
                            { formatter: v => `${fmtShort(v)}` },     // For Count series
                        ],
                    },
                    responsive: [
                        { breakpoint: 1024, options: { chart: { height: 350 } } },
                        { breakpoint: 768, options: { chart: { height: 300 } } },
                    ],
                };

                if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
                chartInstance = new ApexCharts(el, options);
                chartInstance.render();
            };

            // Reactively update series when fields are toggled
            Vue.watch(activeFields, () => {
                if (!chartInstance || !segmentData.value) return;
                const newSeries = chartFields
                    .filter(f => activeFields.value.includes(f.key))
                    .map(f => ({
                        name: f.label,
                        data: segmentData.value.monthly_trend.map(d => d[f.key] ?? 0),
                        yaxisIndex: (f.key === 'bets' || f.key === 'players') ? 1 : 0,
                    }));
                chartInstance.updateSeries(newSeries, true);
            }, { deep: true });

            // ── 2. Sales Analytics — Donut: Sportsbook vs Casino ─────────────
            const initSalesAnalyticsChart = () => {
                const el = document.querySelector('#salesAnalyticsChart');
                if (!el || !segmentData.value) return;

                const sportsbookTotal = segmentData.value.monthly_trend
                    .reduce((acc, d) => acc + Math.round((d.bets ?? 0) * 1.5), 0);
                const casinoTotal = segmentData.value.monthly_trend
                    .reduce((acc, d) => acc + Math.round((d.bets ?? 0) * 0.8), 0);
                const grandTotal = sportsbookTotal + casinoTotal;

                const options = {
                    series: [sportsbookTotal, casinoTotal],
                    labels: ['Sportsbook', 'Casino'],
                    chart: {
                        height: 240,
                        type: 'donut',
                        fontFamily: 'Inter, sans-serif',
                        foreColor: '#475569',
                    },
                    colors: ['#4e7adf', '#38c66c', '#ffd166'],
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '68%',
                                labels: {
                                    show: true,
                                    name: { show: true, fontSize: '13px', fontWeight: 600, color: '#64748b', offsetY: -6 },
                                    value: {
                                        show: true, fontSize: '18px', fontWeight: 700, color: '#0f172a', offsetY: 4,
                                        formatter: v => `KES ${fmtShort(parseInt(v || 0))}`
                                    },
                                    total: {
                                        show: true, label: 'Total Revenue', fontSize: '11px', color: '#9ca3af',
                                        formatter: () => `KES ${fmtShort(grandTotal)}`
                                    },
                                },
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: (val) => `${Number(val).toFixed(1)}%`,
                        style: { fontSize: '12px', fontWeight: 700, colors: ['#fff'] },
                        dropShadow: { enabled: true, blur: 3, opacity: 0.4 },
                    },
                    legend: {
                        position: 'bottom',
                        fontWeight: 600,
                        fontSize: '13px',
                        offsetY: 4,
                        itemMargin: { horizontal: 8, vertical: 4 },
                        formatter: (val, opts) => {
                            const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0;
                            const p = Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1);
                            return `${val} • ${p}%`; // short: name + percentage only
                        },
                    },
                    tooltip: {
                        theme: 'dark',
                        style: { fontSize: '13px' },
                        y: { formatter: v => `KES ${fmtShort(v)}` },
                    },
                    states: { hover: { filter: { type: 'darken', value: 0.12 } } },
                };
                if (salesChartInstance) { salesChartInstance.destroy(); salesChartInstance = null; }
                salesChartInstance = new ApexCharts(el, options);
                salesChartInstance.render();
            };

            // ── 3. Monthly Cash Flow — Grouped Bar: Deposits vs Withdrawals ──
            const initMonthlyCashFlowChart = () => {
                const el = document.querySelector('#monthlyCashFlowChart');
                if (!el || !segmentData.value) return;

                const trend = segmentData.value.monthly_trend || [];
                const categories = trend.map(d => d.month);
                const deposits = trend.map(d => d.deposits ?? 0);
                const withdrawals = trend.map(d => -(Math.abs(d.withdrawals ?? 0))); // both positive

                const options = {
                    series: [
                        { name: 'Deposits', data: deposits },
                        { name: 'Withdrawals', data: withdrawals },
                    ],
                    chart: {
                        height: 230,
                        type: 'bar',
                        toolbar: { show: false },
                        fontFamily: 'Inter, sans-serif',
                        foreColor: '#475569',
                        animations: { enabled: true, speed: 500, easing: 'easeinout' },
                    },
                    colors: ['#10b981', '#f43f5e'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'light',
                            type: 'vertical',
                            shadeIntensity: 0.25,
                            gradientToColors: ['#059669', '#e11d48'],
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 0.85,
                            stops: [0, 100],
                        },
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '58%',
                            borderRadius: 4,
                            borderRadiusApplication: 'end',
                            dataLabels: { position: 'top' },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: v => v > 0 ? fmtShort(Math.abs(v)) : '',
                        offsetY: -22,
                        style: { fontSize: '10px', fontWeight: 700, colors: ['#374151'] },
                        background: { enabled: false },
                    },
                    xaxis: {
                        categories,
                        axisBorder: { show: true, color: '#94a3b8', height: 2 },
                        axisTicks: { show: true, color: '#cbd5e1', height: 4 },
                        labels: { style: { fontSize: '11px', fontWeight: 600, colors: '#64748b' } },
                        crosshairs: {
                            show: true,
                            fill: { type: 'solid', color: '#f1f5f9' },
                            opacity: 0.5,
                        },
                    },
                    yaxis: {
                        title: { text: 'KES', style: { fontSize: '11px', color: '#94a3b8', fontWeight: 600 } },
                        labels: { formatter: v => fmtShort(Math.abs(v)), style: { fontSize: '11px', colors: '#94a3b8' } },
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        fontSize: '12px',
                        fontWeight: 600,
                        markers: { radius: 3, width: 10, height: 10 },
                        itemMargin: { horizontal: 8 },
                    },
                    grid: {
                        borderColor: '#cacfd3ff',
                        strokeDashArray: 4,
                        yaxis: { lines: { show: true } },
                        xaxis: { lines: { show: false } },
                        padding: { top: 4, right: 8, bottom: 0, left: 8 },
                    },
                    tooltip: {
                        theme: 'dark',
                        shared: true,
                        intersect: false,
                        style: { fontSize: '12px' },
                        y: { formatter: v => `KES ${fmtShort(Math.abs(v))}` },
                    },
                    states: {
                        hover: { filter: { type: 'lighten', value: 0.08 } },
                        active: { filter: { type: 'darken', value: 0.1 } },
                    },
                    responsive: [
                        { breakpoint: 768, options: { chart: { height: 240 }, dataLabels: { enabled: false } } },
                    ],
                };

                if (cashFlowChartInstance) { cashFlowChartInstance.destroy(); cashFlowChartInstance = null; }
                cashFlowChartInstance = new ApexCharts(el, options);
                cashFlowChartInstance.render();
            };

            // ── 4. Player Status — Half Donut: Active vs Dormant ─────────────
            const initStatusChart = () => {
                const el = document.querySelector('#playerStatusChart');
                if (!el || !segmentData.value) return;

                const active = segmentData.value.active_players || 0;
                const dormant = segmentData.value.dormant_players || 0;
                const total = active + dormant;

                const options = {
                    series: [active, dormant],
                    labels: ['Active', 'Dormant'],
                    chart: {
                        height: 230,
                        type: 'donut',
                        fontFamily: 'Inter, sans-serif',
                        foreColor: '#475569',
                    },
                    colors: ['#10b981', '#fbbf24'],
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 90,
                            offsetY: 10,
                            donut: {
                                size: '75%',
                                labels: {
                                    show: true,
                                    name: { show: true, fontSize: '13px', fontWeight: 600, color: '#475569', offsetY: -10 },
                                    value: {
                                        show: true, fontSize: '22px', fontWeight: 700, color: '#0f172a', offsetY: 4,
                                        formatter: v => `${v || 0}`
                                    },
                                    total: {
                                        show: true, label: 'Total Players', fontSize: '12px', color: '#9ca3af',
                                        formatter: () => `${total}`
                                    },
                                },
                            },
                        }
                    },
                    // Pull the chart up so the flat bottom doesn't waste space
                    grid: { padding: { bottom: -110 } },
                    dataLabels: {
                        enabled: true,
                        formatter: (val) => `${Number(val).toFixed(0)}%`,
                        style: { fontSize: '12px', fontWeight: 700, colors: ['#fff'] },
                        dropShadow: { enabled: true, blur: 3, opacity: 0.4 },
                    },
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 500,
                        formatter: (val, opts) => {
                            const s = opts.w.globals.series[opts.seriesIndex] || 0;
                            const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0;
                            const p = Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1);
                            return `${val}: ${s} (${p}%)`;
                        },
                    },
                    tooltip: {
                        theme: 'dark',
                        style: { fontSize: '13px' },
                        y: { formatter: v => `${v} Players` },
                    },
                    states: { hover: { filter: { type: 'darken', value: 0.12 } } },
                    responsive: [
                        { breakpoint: 768, options: { chart: { height: 280 } } },
                    ],
                };

                if (statusChartInstance) { statusChartInstance.destroy(); statusChartInstance = null; }
                statusChartInstance = new ApexCharts(el, options);
                statusChartInstance.render();
            };

            // ── 5. Casino Games — Full Donut: Bets by game ───────────────────
            const initCasinoGamesChart = () => {
                const el = document.querySelector('#casinoGamesChart');
                if (!el || !segmentData.value) return;

                const stats = segmentData.value.casino_stats || [];
                if (!stats.length) return;

                const total = stats.reduce((a, s) => a + (s.bets || 0), 0);

                const options = {
                    series: stats.map(s => s.bets),
                    labels: stats.map(s => s.game),
                    chart: {
                        height: 250,
                        type: 'donut',
                        fontFamily: 'Inter, sans-serif',
                        foreColor: '#475569',
                    },
                    colors: ['#4e7adf', '#38c66c', '#fbbf24', '#ef4444', '#a78bfa', '#fb923c'],
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '65%',
                                labels: {
                                    show: true,
                                    name: { show: true, fontSize: '13px', fontWeight: 600, color: '#475569', offsetY: -6 },
                                    value: {
                                        show: true, fontSize: '18px', fontWeight: 700, color: '#0f172a', offsetY: 4,
                                        formatter: v => `KES ${fmtShort(parseInt(v || 0))}`
                                    },
                                    total: {
                                        show: true, label: 'Total Casino', fontSize: '11px', color: '#9ca3af',
                                        formatter: () => `KES ${fmtShort(total)}`
                                    },
                                },
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: (val) => `${Number(val).toFixed(1)}%`,
                        style: { fontSize: '11px', fontWeight: 700, colors: ['#fff'] },
                        dropShadow: { enabled: true, blur: 3, opacity: 0.4 },
                    },
                    legend: {
                        position: 'right',
                        fontSize: '12px',
                        fontWeight: 500,
                        formatter: (val, opts) => {
                            const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0;
                            const p = Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1);
                            return `${val}: ${p}%`;
                        },
                        itemMargin: { vertical: 4 },
                    },
                    tooltip: {
                        theme: 'dark',
                        style: { fontSize: '13px' },
                        y: { formatter: v => `KES ${fmtShort(v)}` },
                    },
                    responsive: [
                        {
                            breakpoint: 1024,
                            options: { chart: { height: 280 }, legend: { position: 'bottom' } },
                        },
                        {
                            breakpoint: 768,
                            options: { chart: { height: 260 }, legend: { position: 'bottom' } },
                        },
                    ],
                };

                if (casinoChartInstance) { casinoChartInstance.destroy(); casinoChartInstance = null; }
                casinoChartInstance = new ApexCharts(el, options);
                casinoChartInstance.render();
            };

            onMounted(async () => {
                if (segmentId) {
                    let found = (window.segments || []).find(s => s.id === segmentId || s.name === segmentId);

                    if (!found) {
                        const local = JSON.parse(localStorage.getItem('dummy_segments') || '[]');
                        found = local.find(s => s.id === segmentId || s.name === segmentId);
                    }

                    if (found) {
                        const players = await window.getPlayersForSegment(found);
                        found.players = players;

                        // ── Fallback: build monthly_trend for custom/dynamic segments ──
                        if (!found.monthly_trend || found.monthly_trend.length === 0) {
                            const totalDep = players.reduce((a, b) => a + (b.total_deposits || b.lifetime_deposits || 0), 0);
                            const totalBet = players.reduce((a, b) => a + (b.total_bets || b.lifetime_bets || 0), 0);
                            const totalWith = players.reduce((a, b) => a + (b.total_withdrawals || b.lifetime_withdrawals || 0), 0);

                            found.total_deposits = totalDep;
                            found.total_bets = totalBet;
                            found.total_withdrawals = totalWith;
                            found.total_players = players.length;
                            found.active_players = players.filter(p => p.status === 'active').length;
                            found.dormant_players = players.filter(p => p.status === 'dormant').length;

                            const months = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'];
                            found.monthly_trend = months.map((m, i) => ({
                                month: m,
                                deposits: Math.round(totalDep * (0.10 + i * 0.02)),
                                stake: Math.round(totalBet * (0.10 + i * 0.02)),
                                bets: Math.round(players.length * (3 + i)),
                                withdrawals: Math.round(totalWith * (0.10 + i * 0.015)),
                                players: Math.round(found.active_players * (0.80 + i * 0.04)),
                            }));
                        }

                        // ── Fallback: build casino_stats if missing ──
                        if (!found.casino_stats || found.casino_stats.length === 0) {
                            const tb = found.total_bets || 1000;
                            found.casino_stats = [
                                { game: 'Aviator', bets: Math.round(tb * 0.40) },
                                { game: 'Sweet Bonanza', bets: Math.round(tb * 0.30) },
                                { game: 'Crazy Time', bets: Math.round(tb * 0.20) },
                                { game: 'Others', bets: Math.round(tb * 0.10) },
                            ];
                        }

                        segmentData.value = found;

                        // Debugging: Log the state before chart initialization
                        console.log("Segment Data loaded:", segmentData.value);
                        console.log("Chart elements check:", {
                            segmentTrendChart: document.querySelector('#segmentTrendChart'),
                            salesAnalyticsChart: document.querySelector('#salesAnalyticsChart'),
                            monthlyCashFlowChart: document.querySelector('#monthlyCashFlowChart'),
                            playerStatusChart: document.querySelector('#playerStatusChart'),
                            casinoGamesChart: document.querySelector('#casinoGamesChart'),
                        });
                        // Stagger inits so DOM is fully painted before ApexCharts measures containers
                        setTimeout(() => {
                            initChart();
                            initSalesAnalyticsChart();
                            initMonthlyCashFlowChart();
                            initStatusChart();
                            initCasinoGamesChart();
                        }, 120);
                    }
                }
                isLoading.value = false;
            }); // end onMounted

            return {
                segmentData, isLoading,
                search, statusFilter, sort, filteredPlayers,
                fmtShort,
                activeFields, chartFields,
                growthRate, projectedValue, nggr,
                handleSort: (key) => {
                    if (sort.key === key) sort.dir = sort.dir === 'desc' ? 'asc' : 'desc';
                    else { sort.key = key; sort.dir = 'desc'; }
                },
            };
        }
    });

    if (document.getElementById('segmentViewApp')) {
        segmentViewApp.mount('#segmentViewApp');
        console.log("segmentViewApp mounted.");
    }


    // ─── Dashboard Analytics App ──────────────────────────────────────────────
    if (document.getElementById('dashboardApp')) {
        const dashboardApp = createApp({
            setup() {
                const stats = ref({ totalBets: 0, totalStake: 0, totalPayout: 0, activeBettors: 0 });

                const formatAmount = (num) => {
                    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
                    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
                    return num.toLocaleString();
                };

                const fetchDashboardData = async () => {
                    const today = new Date().toISOString().split('T')[0];
                    const timeRange = { from: today, to: today, granularity: "day" };
                    try {
                        const [bets, stake, payout, players] = await Promise.all([
                            executeAnalyticsQuery({ measure: "count", measure_field: "bet_id", time_range: timeRange }),
                            executeAnalyticsQuery({ measure: "sum", measure_field: "amount", filters: [{ field: "type", operator: "equals", value: "bet" }], time_range: timeRange }),
                            executeAnalyticsQuery({ measure: "sum", measure_field: "amount", filters: [{ field: "type", operator: "equals", value: "payout" }], time_range: timeRange }),
                            executeAnalyticsQuery({ measure: "count_distinct", measure_field: "customer_id", time_range: timeRange })
                        ]);
                        stats.value = { totalBets: bets.value || 0, totalStake: stake.value || 0, totalPayout: payout.value || 0, activeBettors: players.value || 0 };
                    } catch (error) {
                        console.error("Failed to fetch dashboard analytics:", error);
                    }
                };

                onMounted(fetchDashboardData);
                return { stats, formatAmount };
            }
        });
        dashboardApp.mount('#dashboardApp');
        console.log("dashboardApp mounted.");
    }


    // ─── Login App ────────────────────────────────────────────────────────────
    if (document.getElementById('loginApp')) {
        const loginApp = createApp({
            setup() {
                const username = ref('');
                const password = ref('');
                const alert_message = ref('');
                const alert_error = ref(false);
                const alert_success = ref(false);
                const baseUrl = 'https://identity.gamesapi.dev';

                const showNotification = (message, type = 'error') => {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, timerProgressBar: true, icon: type, title: message });
                    }
                    alert_message.value = message;
                    if (type === 'error') alert_error.value = true; else alert_success.value = true;
                    setTimeout(() => { alert_error.value = false; alert_success.value = false; }, 4000);
                };

                async function curl(url, data) {
                    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }, body: JSON.stringify(data) });
                    console.log("HTTP status:", response.status, response.statusText);
                    const rawText = await response.text();
                    if (!rawText || rawText.trim() === '') return { status: response.status, message: `Empty response (HTTP ${response.status})` };
                    try { return JSON.parse(rawText); } catch (e) { return { status: response.status, message: `Non-JSON response: ${rawText.substring(0, 120)}` }; }
                }

                const login = async () => {
                    alert_error.value = false; alert_success.value = false;
                    if (!username.value || !password.value) { showNotification('Phone Number and Password are required'); return; }
                    const payload = { email: "string", msisdn: Number(String(username.value || '').replace(/\D/g, '')), password: password.value, username: "string" };
                    try {
                        const res = await curl(`${baseUrl}/user/login?lang=en`, payload);
                        if (res && (parseInt(res.status) === 1 || parseInt(res.status) === 202)) {
                            sessionStorage.setItem('api_key', res.auth || '');
                            sessionStorage.setItem('isLoggedIn', 'true');
                            window.location.href = 'index.html';
                        } else {
                            showNotification((res && res.message) ? res.message : 'Login failed: Invalid credentials');
                        }
                    } catch (e) { showNotification('Connection error to identity service'); }
                };

                return { username, password, alert_message, alert_error, alert_success, login };
            }
        });
        loginApp.mount('#loginApp');
        console.log("loginApp mounted successfully.");
    }


    // ─── Register App ─────────────────────────────────────────────────────────
    if (document.getElementById('registerApp')) {
        const registerApp = createApp({
            setup() {
                const isLoading = ref(false);
                const form = reactive({ username: '', password: '' });
                const baseUrl = 'https://identity.gamesapi.dev';

                const showNotification = (message, type = 'error') => {
                    if (typeof Swal !== 'undefined') Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, timerProgressBar: true, icon: type, title: message });
                };

                const register = async () => {
                    isLoading.value = true;
                    const payload = { address: "string", browser: navigator.userAgent, btag: "string", channel: "web", channel_id: 0, click_id: "string", code: "string", country_code: "KE", date_of_birth: "1990-01-01", device_id: 0, device_info: "web-browser", email: "string", engine: "string", fbclid: "string", first_name: "string", gclid: "string", id_number: "string", ip_address: "127.0.0.1", lang: "en", last_name: "string", msisdn: Number(String(form.username).replace(/\D/g, '')), nationality: "Kenyan", password: form.password, referrer: document.referrer || "direct", username: form.username, utm_campaign: "string", utm_content: "string", utm_medium: "string", utm_source: "string", utm_term: "string", version_info: "1.0.0" };
                    try {
                        const response = await fetch(`${baseUrl}/signup?lang=en`, { method: 'POST', headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const res = await response.json();
                        if (response.ok && (parseInt(res.status) === 1 || parseInt(res.status) === 201)) {
                            showNotification('Account created successfully! Redirecting to login...', 'success');
                            setTimeout(() => { window.location.href = 'auth-login.html'; }, 2500);
                        } else { showNotification(res.message || 'Registration failed. Please check your details.'); }
                    } catch (error) { showNotification('Connection error to identity service'); }
                    finally { isLoading.value = false; }
                };

                return { form, isLoading, register };
            }
        });
        registerApp.mount('#registerApp');
        console.log("registerApp mounted successfully.");
    }


    // ─── Recover Password App ─────────────────────────────────────────────────
    if (document.getElementById('recoverPwApp')) {
        const recoverPwApp = createApp({
            setup() {
                const isLoading = ref(false);
                const phoneNumber = ref(''); const otp = ref(''); const newPassword = ref(''); const confirmNewPassword = ref('');
                const step = ref(1);
                const baseUrl = 'https://identity.gamesapi.dev';

                const showNotification = (message, type = 'error') => {
                    if (typeof Swal !== 'undefined') Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, timerProgressBar: true, icon: type, title: message });
                };

                const handleRecover = async () => {
                    if (!phoneNumber.value) { showNotification('Please enter your phone number'); return; }
                    isLoading.value = true;
                    try {
                        const payload = { country_code: "KE", email: "string", msisdn: Number(String(phoneNumber.value).replace(/\D/g, '')), username: "string" };
                        const response = await fetch(`${baseUrl}/password/forgot?lang=en`, { method: 'PATCH', headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const res = await response.json();
                        if (response.ok) { showNotification('Recovery OTP sent to your email!', 'success'); step.value = 2; }
                        else { showNotification(res.message || 'Recovery failed. Please try again.'); }
                    } catch (error) { showNotification('Connection error to identity service'); }
                    finally { isLoading.value = false; }
                };

                const handleResetPassword = async () => {
                    if (!otp.value || !newPassword.value || !confirmNewPassword.value) { showNotification('All fields are required.'); return; }
                    if (newPassword.value !== confirmNewPassword.value) { showNotification('Passwords do not match.'); return; }
                    if (newPassword.value.length < 6) { showNotification('Password must be at least 6 characters.'); return; }
                    isLoading.value = true;
                    try {
                        const payload = { code: Number(otp.value), country_code: "KE", email: "string", msisdn: Number(String(phoneNumber.value).replace(/\D/g, '')), password: newPassword.value, username: "string" };
                        const response = await fetch(`${baseUrl}/password/reset?lang=en`, { method: 'PATCH', headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const res = await response.json();
                        if (response.ok) { showNotification('Password reset successfully! Redirecting...', 'success'); setTimeout(() => { window.location.href = 'auth-login.html'; }, 3000); }
                        else { showNotification(res.message || 'Password reset failed. Check your OTP and try again.'); }
                    } catch (error) { showNotification('Connection error to identity service'); }
                    finally { isLoading.value = false; }
                };

                return { phoneNumber, otp, newPassword, confirmNewPassword, isLoading, step, handleRecover, handleResetPassword };
            }
        });
        recoverPwApp.mount('#recoverPwApp');
        console.log("recoverPwApp mounted successfully.");
    }


    // ─── Global Logout ────────────────────────────────────────────────────────
    window.logout = function () {
        sessionStorage.removeItem('api_key');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'auth-login.html';
    };

}); // end DOMContentLoaded