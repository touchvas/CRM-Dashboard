// ─── Wait for DOM before running any jQuery / Vue init ───────────────────────
document.addEventListener("DOMContentLoaded", function () {

    // Guard against multiple initializations if app.js is loaded twice
    if (window.__CLIVAX_APP_INITIALIZED__) {
        console.warn("app.js already initialized. Skipping second load.");
        return;
    }
    window.__CLIVAX_APP_INITIALIZED__ = true;

    console.log("Rules Portal: app.js module loading started... [Build Version: 1.2.4]");

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

const segmentViewContainer = document.getElementById('segmentViewApp');
if (segmentViewContainer && typeof Vue !== 'undefined') {
    const segmentViewApp = Vue.createApp({
        setup() {
            const segmentData = Vue.ref(null);
            const isLoading = Vue.ref(true);
            const search = Vue.ref('');
            const statusFilter = Vue.ref('all');
            const sort = Vue.reactive({ key: 'total_deposits', dir: 'desc' });
            const showPlayers = Vue.ref(false);

            // Computed KPIs derived from monthly_trend
            const growthRate = Vue.computed(() => {
                const trend = segmentData.value?.monthly_trend;
                if (!trend || trend.length < 2) return 0;
                const first = trend[0].deposits || 1;
                const last  = trend[trend.length - 1].deposits || 0;
                return Math.round(((last - first) / first) * 100);
            });

            const projectedValue = Vue.computed(() => {
                const trend = segmentData.value?.monthly_trend;
                if (!trend || trend.length === 0) return 0;
                const last = trend[trend.length - 1];
                return Math.round((last.deposits || 0) * 1.15);
            });

            const nggr = Vue.computed(() => {
                const d = segmentData.value;
                if (!d) return 0;
                return Math.round((d.total_deposits || 0) - (d.total_withdrawals || 0));
            });

            const filteredPlayers = Vue.computed(() => {
                let players = segmentData.value?.players || [];
                if (search.value) {
                    const q = search.value.toLowerCase();
                    players = players.filter(p =>
                        (p.name || '').toLowerCase().includes(q) ||
                        (p.email || '').toLowerCase().includes(q)
                    );
                }
                if (statusFilter.value !== 'all') {
                    players = players.filter(p => p.status === statusFilter.value);
                }
                return [...players].sort((a, b) => {
                    const va = a[sort.key] ?? 0;
                    const vb = b[sort.key] ?? 0;
                    return sort.dir === 'desc' ? vb - va : va - vb;
                });
            });

            const chartFields = [
                { key: 'deposits',        label: 'Deposits',        color: '#4e7adf' },
                { key: 'stake',           label: 'Stake',           color: '#ffd166' },
                { key: 'withdrawals',     label: 'Withdrawals',     color: '#38c66c' },
                { key: 'active_players',  label: 'Active Players',  color: '#a78bfa' },
                { key: 'dormant_players', label: 'Dormant Players', color: '#fb923c' },
                { key: 'new_players',     label: 'New Players',     color: '#10b981' },
                { key: 'deposit_count',   label: 'Deposit Count',   color: '#06b6d4' },
                { key: 'failed_deposits', label: 'Failed Deposits', color: '#ef4444' },
                { key: 'sb_bets',         label: 'Sports Bets',     color: '#8b5cf6' },
                { key: 'casino_rounds',   label: 'Casino Rounds',   color: '#f43f5e' },
                { key: 'sb_stake',        label: 'Sports Stake',    color: '#0ea5e9' },
                { key: 'casino_stake',    label: 'Casino Stake',    color: '#d946ef' },
                { key: 'total_ggr',       label: 'Total GGR',       color: '#22c55e' },
            ];
            const activeFields = Vue.ref(['deposits', 'stake', 'withdrawals']);

            // Use global fmtShort if available
            const fmtShort = window.fmtShort || ((n) => n.toLocaleString());

            let chartInstance = null; let salesChartInstance = null; let cashFlowChartInstance = null;
            let statusChartInstance = null; let casinoChartInstance = null; let casinoBetsChartInstance = null;

            const initChart = () => {
                const el = document.querySelector('#segmentTrendChart');
                if (!el || !segmentData.value) return;
                const categories = segmentData.value.monthly_trend.map(d => d.month);
                const buildSeries = () => chartFields.filter(f => activeFields.value.includes(f.key)).map(f => ({ name: f.label, data: segmentData.value.monthly_trend.map(d => d[f.key] ?? 0) }));
                const activeColors = () => chartFields.filter(f => activeFields.value.includes(f.key)).map(f => f.color);
                const options = {
                    series: buildSeries(), chart: { height: 300, type: 'area', toolbar: { show: false }, animations: { enabled: true, speed: 400 }, fontFamily: 'Inter, sans-serif', foreColor: '#475569' },
                    colors: activeColors(), dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 3 }, markers: { strokeWidth: 2, hover: { size: 6 } },
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] } },
                    xaxis: { categories, axisTicks: { show: false }, labels: { style: { fontSize: '13px', fontWeight: 500, colors: '#6b7280' } }, lines: { show: true, borderColor: '#e5e7eb', strokeDashArray: 3 } },
                    yaxis: { labels: { formatter: v => fmtShort(v), style: { fontSize: '12px', colors: '#475569' } } },
                    grid: { borderColor: '#e5e7eb', strokeDashArray: 3, padding: { left: 10, right: 10 } }, legend: { show: false },
                    tooltip: { theme: 'dark', style: { fontSize: '13px' }, y: { formatter: v => fmtShort(v) } }
                };
                if (chartInstance) chartInstance.destroy();
                chartInstance = new ApexCharts(el, options); chartInstance.render();
            };

            Vue.watch(activeFields, () => {
                if (!chartInstance || !segmentData.value) return;
                const newSeries = chartFields.filter(f => activeFields.value.includes(f.key)).map(f => ({ name: f.label, data: segmentData.value.monthly_trend.map(d => d[f.key] ?? 0) }));
                const newColors = chartFields.filter(f => activeFields.value.includes(f.key)).map(f => f.color);
                chartInstance.updateOptions({ colors: newColors }, false, false); chartInstance.updateSeries(newSeries, true);
            }, { deep: true });

            const initSalesAnalyticsChart = () => {
                const el = document.querySelector('#salesAnalyticsChart'); if (!el || !segmentData.value) return;
                const trend = segmentData.value.monthly_trend || [];
                const sbFinal = trend.reduce((acc, d) => acc + (d.sb_stake || d.stake || 0), 0);
                const casFinal = trend.reduce((acc, d) => acc + (d.casino_stake || 0), 0);
                const grandTotal = sbFinal + casFinal;
                const options = {
                    series: [sbFinal, casFinal], labels: ['Sportsbook', 'Casino'],
                    chart: { height: 300, type: 'donut', fontFamily: 'Inter, sans-serif', foreColor: '#475569' }, grid: { padding: { bottom: 40 } }, colors: ['#4e7adf', '#38c66c'],
                    plotOptions: { pie: { donut: { size: '72%', labels: { show: true, name: { show: true, fontSize: '13px', fontWeight: 600, color: '#64748b', offsetY: -6 }, value: { show: true, fontSize: '18px', fontWeight: 700, color: '#0f172a', offsetY: 4, formatter: v => `KES ${fmtShort(parseInt(v || 0))}` }, total: { show: true, label: 'Total Stake', fontSize: '11px', color: '#9ca3af', formatter: () => `KES ${fmtShort(grandTotal)}` } } } } },
                    dataLabels: { enabled: true, formatter: val => `${Number(val).toFixed(1)}%`, style: { fontSize: '12px', fontWeight: 700, colors: ['#fff'] } },
                    legend: { position: 'bottom', fontWeight: 600, fontSize: '13px', offsetY: 0, formatter: (val, opts) => { const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0; return `${val} • ${Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1)}%`; } },
                    tooltip: { theme: 'dark', style: { fontSize: '13px' }, y: { formatter: v => `KES ${fmtShort(v)}` } }
                };
                if (salesChartInstance) salesChartInstance.destroy();
                salesChartInstance = new ApexCharts(el, options); salesChartInstance.render();
            };

            const initMonthlyCashFlowChart = () => {
                const el = document.querySelector('#monthlyCashFlowChart'); if (!el || !segmentData.value) return;
                const trend = segmentData.value.monthly_trend || [];
                const categories = trend.map(d => d.month); const deposits = trend.map(d => d.deposits ?? 0); const withdrawals = trend.map(d => -(Math.abs(d.withdrawals ?? 0)));
                const options = {
                    series: [{ name: 'Deposits', data: deposits }, { name: 'Withdrawals', data: withdrawals }],
                    chart: { height: 230, type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', foreColor: '#475569' },
                    colors: ['#10b981', '#f43f5e'], plotOptions: { bar: { columnWidth: '58%', borderRadius: 4, borderRadiusApplication: 'end' } },
                    dataLabels: { enabled: false }, xaxis: { categories, labels: { style: { fontSize: '11px', fontWeight: 600, colors: '#64748b' } } },
                    yaxis: { labels: { formatter: v => fmtShort(Math.abs(v)), style: { fontSize: '11px', colors: '#94a3b8' } } },
                    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontWeight: 600 }, grid: { borderColor: '#e5e7eb', strokeDashArray: 4 },
                    tooltip: { theme: 'dark', shared: true, intersect: false, y: { formatter: v => `KES ${fmtShort(Math.abs(v))}` } }
                };
                if (cashFlowChartInstance) cashFlowChartInstance.destroy();
                cashFlowChartInstance = new ApexCharts(el, options); cashFlowChartInstance.render();
            };

            const initStatusChart = () => {
                const el = document.querySelector('#playerStatusChart'); if (!el || !segmentData.value) return;
                const active = segmentData.value.active_players || 0; const dormant = segmentData.value.dormant_players || 0; const total = active + dormant;
                const options = {
                    series: [active, dormant], labels: ['Active', 'Dormant'],
                    chart: { height: 230, type: 'donut', fontFamily: 'Inter, sans-serif', foreColor: '#475569' }, colors: ['#10b981', '#fbbf24'],
                    plotOptions: { pie: { startAngle: -90, endAngle: 90, offsetY: 10, donut: { size: '75%', labels: { show: true, name: { show: true, fontSize: '13px', fontWeight: 600, color: '#475569', offsetY: -10 }, value: { show: true, fontSize: '22px', fontWeight: 700, color: '#0f172a', offsetY: 4, formatter: v => `${v || 0}` }, total: { show: true, label: 'Total Players', fontSize: '12px', color: '#9ca3af', formatter: () => `${total}` } } } } },
                    grid: { padding: { bottom: -110 } }, dataLabels: { enabled: true, formatter: val => `${Number(val).toFixed(0)}%`, style: { fontSize: '12px', fontWeight: 700, colors: ['#fff'] } },
                    legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '13px', fontWeight: 500, formatter: (val, opts) => { const s = opts.w.globals.series[opts.seriesIndex] || 0; const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0; return `${val}: ${s} (${Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1)}%)`; } },
                    tooltip: { theme: 'dark', y: { formatter: v => `${v} Players` } }
                };
                if (statusChartInstance) statusChartInstance.destroy();
                statusChartInstance = new ApexCharts(el, options); statusChartInstance.render();
            };

            const initCasinoGamesChart = () => {
                const el = document.querySelector('#casinoGamesChart'); if (!el || !segmentData.value) return;
                const stats = segmentData.value.casino_stats || []; if (!stats.length) return;
                const total = stats.reduce((a, s) => a + (s.bets || 0), 0);
                const options = {
                    series: stats.map(s => s.bets), labels: stats.map(s => s.game),
                    chart: { height: 250, type: 'donut', fontFamily: 'Inter, sans-serif', foreColor: '#475569' }, colors: ['#4e7adf', '#38c66c', '#fbbf24', '#ef4444', '#a78bfa', '#fb923c'],
                    plotOptions: { pie: { donut: { size: '65%', labels: { show: true, name: { show: true, fontSize: '13px', fontWeight: 600, color: '#475569', offsetY: -6 }, value: { show: true, fontSize: '18px', fontWeight: 700, color: '#0f172a', offsetY: 4, formatter: v => `KES ${fmtShort(parseInt(v || 0))}` }, total: { show: true, label: 'Total Casino', fontSize: '11px', color: '#9ca3af', formatter: () => `KES ${fmtShort(total)}` } } } } },
                    dataLabels: { enabled: true, formatter: val => `${Number(val).toFixed(1)}%`, style: { fontSize: '11px', fontWeight: 700, colors: ['#fff'] } },
                    legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '12px', fontWeight: 500, formatter: (val, opts) => { const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0; return `${val}: ${Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1)}%`; } },
                    tooltip: { theme: 'dark', y: { formatter: v => `KES ${fmtShort(v)}` } }
                };
                if (casinoChartInstance) casinoChartInstance.destroy();
                casinoChartInstance = new ApexCharts(el, options); casinoChartInstance.render();
            };

            const initCasinoBetsChart = () => {
                const el = document.querySelector('#casinoBetsChart'); if (!el || !segmentData.value) return;
                const stats = segmentData.value.casino_stats1 || segmentData.value.casino_stats || []; if (!stats.length) return;
                const options = {
                    series: stats.map(s => s.bets || s.total_rounds || 0), labels: stats.map(s => s.game),
                    chart: { height: 250, type: 'donut', fontFamily: 'Inter, sans-serif', foreColor: '#475569' }, colors: ['#4e7adf', '#38c66c', '#fbbf24', '#ef4444', '#a78bfa', '#fb923c'],
                    plotOptions: { pie: { donut: { size: '65%', labels: { show: true, name: { show: true, fontSize: '13px', fontWeight: 600, color: '#475569', offsetY: -6 }, value: { show: true, fontSize: '18px', fontWeight: 700, color: '#0f172a', offsetY: 4, formatter: v => fmtShort(parseInt(v || 0)) }, total: { show: true, label: 'Total Bets', fontSize: '11px', color: '#9ca3af', formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0) } } } } },
                    dataLabels: { enabled: false }, legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '12px', fontWeight: 500, formatter: (val, opts) => { const pRaw = opts.w.globals.seriesPercent[opts.seriesIndex] || 0; return `${val}: ${Number(Array.isArray(pRaw) ? pRaw[0] : pRaw).toFixed(1)}%`; } },
                    tooltip: { theme: 'dark', y: { formatter: v => `${v} Bets` } }
                };
                if (casinoBetsChartInstance) casinoBetsChartInstance.destroy();
                casinoBetsChartInstance = new ApexCharts(el, options); casinoBetsChartInstance.render();
            };

            Vue.onMounted(async () => {
                const params = new URLSearchParams(window.location.search);
                const segmentId = params.get('id');
                if (segmentId) {
                    let found = (window.segments || []).find(s => s.id === segmentId || s.name === segmentId);
                    if (!found) {
                        const local = JSON.parse(localStorage.getItem('dummy_segments') || '[]');
                        found = local.find(s => s.id === segmentId || s.name === segmentId);
                    }
                    if (found) {
                        if (typeof window.getPlayersForSegment === 'function') found.players = await window.getPlayersForSegment(found);
                        else found.players = (window.players || []).filter(p => p.segment_id === found.id);
                        if (!found.monthly_trend || found.monthly_trend.length === 0) {
                            const p = found.players || []; const td = p.reduce((a, b) => a + (b.lifetime_deposits || 0), 0); const tb = p.reduce((a, b) => a + (b.lifetime_bets || 0), 0);
                            const tw = p.reduce((a, b) => a + (b.lifetime_withdrawals || 0), 0);
                            found.total_deposits = found.total_deposits || td; found.total_bets = found.total_bets || tb; found.total_withdrawals = found.total_withdrawals || tw;
                            found.active_players = found.active_players || p.filter(x => x.status === 'active').length;
                            found.monthly_trend = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'].map((m, i) => ({ month: m, deposits: Math.round(td * (0.10 + i * 0.02)), stake: Math.round(tb * (0.10 + i * 0.02)), withdrawals: Math.round(tw * (0.10 + i * 0.015)), players: Math.round(found.active_players * (0.80 + i * 0.04)) }));
                        }
                        segmentData.value = found; window.__segmentData__ = found;

                        // Use nextTick to ensure Vue has rendered the v-if block before attaching charts
                        Vue.nextTick(() => {
                            setTimeout(() => {
                                initChart();
                                initSalesAnalyticsChart();
                                initMonthlyCashFlowChart();
                                initStatusChart();
                                initCasinoGamesChart();
                                initCasinoBetsChart();
                            }, 150);
                        });
                    }
                }
                isLoading.value = false;
            });

            return {
                segmentData, isLoading, search, statusFilter, sort, filteredPlayers, showPlayers, fmtShort, activeFields, chartFields, growthRate, projectedValue, nggr,
                topCasinoGames: Vue.computed(() => segmentData.value ? (window.casinoByGame || []).slice(0, 10) : []),
                topTournaments: Vue.computed(() => segmentData.value ? (window.sportsbookByTournament || []).slice(0, 10) : []),
                handleSort: (k) => { if (sort.key === k) sort.dir = sort.dir === 'desc' ? 'asc' : 'desc'; else { sort.key = k; sort.dir = 'desc'; } },
                formatNumber: (n) => (n || 0).toLocaleString(),
                totalDeposits: Vue.computed(() => filteredPlayers.value.reduce((s, p) => s + (p.lifetime_deposits || 0), 0)),
                totalBets: Vue.computed(() => filteredPlayers.value.reduce((s, p) => s + (p.lifetime_bets || 0), 0)),
                activePlayers: Vue.computed(() => filteredPlayers.value.filter(p => p.status === 'active').length),
                downloadCSV: () => {
                    const h = ['Player Name', 'Email', 'Country', 'Status', 'Lifetime Deposits', 'Lifetime Bets'];
                    const d = filteredPlayers.value.map(p => [p.name, p.email, p.country, p.status, p.lifetime_deposits, p.lifetime_bets]);
                    const csv = [h, ...d].map(r => r.join(',')).join('\n');
                    const b = new Blob([csv], { type: 'text/csv' }); const l = document.createElement('a'); l.href = URL.createObjectURL(b); l.download = 'players.csv'; l.click();
                },
                getFieldLabel: window.getFieldLabel, getOperatorLabel: window.getOperatorLabel, deleteSegment: () => Swal.fire('Warning', 'Restricted in dummy mode', 'warning')
            };
        }
    }).mount('#segmentViewApp');
    console.log("segmentViewApp mounted.");
    }

    // ─── Dashboard Analytics App ──────────────────────────────────────────────
    if (document.getElementById('dashboardApp')) {
        const dashboardApp = Vue.createApp({
            setup() {
                const stats = Vue.ref({ totalBets: 0, totalStake: 0, totalPayout: 0, activeBettors: 0 });

                const formatAmount = (num) => {
                    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
                    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
                    return num.toLocaleString();
                };

                const fetchDashboardData = async () => {
                    const today = new Date().toISOString().split('T')[0];
                    const timeRange = { from: today, to: today, granularity: "day" };
                    try {
                    // executeAnalyticsQuery stubbed to prevent crash
                    const query = window.executeAnalyticsQuery || (() => Promise.resolve({value: 0}));
                    const [bets, stake, payout, players] = await Promise.all([
                        query({ measure: "count", measure_field: "bet_id", time_range: timeRange }),
                        query({ measure: "sum", measure_field: "amount", filters: [{ field: "type", operator: "equals", value: "bet" }], time_range: timeRange }),
                        query({ measure: "sum", measure_field: "amount", filters: [{ field: "type", operator: "equals", value: "payout" }], time_range: timeRange }),
                        query({ measure: "count_distinct", measure_field: "customer_id", time_range: timeRange })
                    ]);
                    stats.value = { totalBets: bets.value || 0, totalStake: stake.value || 0, totalPayout: payout.value || 0, activeBettors: players.value || 0 };
                    } catch (error) {
                        console.error("Failed to fetch dashboard analytics:", error);
                    }
                };

                Vue.onMounted(fetchDashboardData);
                return { stats, formatAmount };
            }
        });
        dashboardApp.mount('#dashboardApp');
        console.log("dashboardApp mounted successfully.");
    }

    // ─── Password Recovery App ───────────────────────────────────────────────
    if (document.getElementById('recoverPwApp')) {
        const recoverPwApp = Vue.createApp({
            setup() {
                const phoneNumber = Vue.ref('');
                const otp = Vue.ref('');
                const newPassword = Vue.ref('');
                const confirmNewPassword = Vue.ref('');
                const isLoading = Vue.ref(false);
                const step = Vue.ref(1);
                const baseUrl = 'https://identity.gamesapi.dev/v1'; // Assuming base URL

                const showNotification = (msg, type = 'danger') => {
                    if (window.showToast) window.showToast(type === 'success' ? 'Success' : 'Error', msg, type);
                    else alert(msg);
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
                    } catch (error) { console.error(error); showNotification('Connection error to identity service'); }
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
                    } catch (error) { console.error(error); showNotification('Connection error to identity service'); }
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

    // ─────────────────────────────────────────────────────────────────────────
    // Send Mass SMS Modal - Initialization & Event Handlers
    // ─────────────────────────────────────────────────────────────────────────
    (function initSmsModal() {
        const smsTemplates = {
            1: {
                title: "Welcome Bonus SMS",
                message: "Hello {CUSTOMER_NAME}, Welcome! You've received {CURRENCY}{AMOUNT} bonus. Start trading now! Valid till {DATE}.",
                description: "Perfect for welcoming new users with introductory bonus or credit"
            },
            2: {
                title: "Promotion SMS",
                message: "Hi {CUSTOMER_NAME}, Special offer for you! Trade now and get {CURRENCY}{AMOUNT} cashback. Limited time only - expires {DATE}.",
                description: "Great for promotional campaigns and cashback offers"
            }
        };

        // SMS Message Character Counter
        $('#smsMessage').on('input', function () {
            const charCount = $(this).val().length;
            const msgCount = Math.ceil(charCount / 160) || 0;
            $('#charCount').text(charCount);
            $('#msgCount').text(msgCount);
            updateSmsPreview();
        });

        // SMS Template Selection
        $('input[name="smsTemplate"]').on('change', function () {
            const templateValue = $(this).val();
            const templateInfo = $('#smsTemplateInfo');

            if (templateValue === 'custom') {
                templateInfo.slideUp(200);
                $('#smsMessage').focus();
            } else {
                const template = smsTemplates[templateValue];
                if (template) {
                    $('#smsTemplateDescription').html(
                        `<strong>${template.title}</strong><br/>${template.description}`
                    );
                    $('#smsMessage').val(template.message).trigger('input');
                    templateInfo.slideDown(200);
                }
            }
        });

        // Variable Insertion for SMS
        $(document).on('click', '.sms-variable-btn', function () {
            const variable = $(this).data('variable');
            const textarea = $('#smsMessage');
            const currentPos = textarea[0].selectionStart;
            const text = textarea.val();
            const newText = text.slice(0, currentPos) + variable + text.slice(currentPos);
            textarea.val(newText).trigger('input');
            textarea.focus();
        });

        // SMS Preview Update
        function updateSmsPreview() {
            const message = $('#smsMessage').val() || 'Your message will appear here...';
            if (message.trim()) {
                $('#smsPreview').html(message.replace(/\n/g, '<br/>'));
            } else {
                $('#smsPreview').html('<em class="text-secondary">Your message will appear here...</em>');
            }
        }
    $('#sendSmsBtn').on('click', function () {
    const message     = $('#smsMessage').val().trim();
    const recipientEl = document.getElementById('smsRecipients');
    const segName     = recipientEl?.dataset?.segmentName || recipientEl?.value || '';
    const playerCount = parseInt(recipientEl?.dataset?.playerCount || 0);

    if (!message) {
        showToast('Error', 'Please enter a message', 'error');
        return;
    }

    const btn = $(this);
    const originalText = btn.html();
    btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');

    setTimeout(() => {
        btn.prop('disabled', false).html(originalText);
        $('#sendSmsModal').modal('hide');
        $('#smsMessage').val('').trigger('input');
        $('input[name="smsTemplate"]').prop('checked', false);
        showToast('Success', `SMS sent to ${playerCount} players in "${segName}"`, 'success');
    }, 2000);
});

        // Reset modal when closed
        $('#sendSmsModal').on('hidden.bs.modal', function () {
            $('#smsMessage').val('').trigger('input');
            $('input[name="smsTemplate"]').prop('checked', false);
            $('#smsTemplateInfo').slideUp(200);
            $('#smsRecipients').val('');
        });
    })();

    // ─────────────────────────────────────────────────────────────────────────
    // Award Gifts Modal - Initialization & Event Handlers
    // ─────────────────────────────────────────────────────────────────────────
     // ─────────────────────────────────────────────────────────────────────────
    // Award Gifts Modal - Initialization & Event Handlers
    // ─────────────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────
    // Award Gifts Modal - Initialization & Event Handlers
    // ─────────────────────────────────────────────────────────────────────────
    (function initGiftsModal() {
        const bonusOptions = {
            'trade-credit': { label: 'Trade Credit', description: 'Instant trading credit' },
            'cashback-10': { label: '10% Cashback', description: 'Back 10% on trades' },
            'cashback-15': { label: '15% Cashback', description: 'Back 15% on trades' },
            'premium-features': { label: 'Premium Features (7 days)', description: 'Access all premium features' },
            'vip-status': { label: 'VIP Status (30 days)', description: 'VIP member privileges' },
            'fee-waiver': { label: 'Transaction Fee Waiver (5 transactions)', description: 'Free 5 transactions' },
            'double-points': { label: 'Double Points (30 days)', description: 'Earn double reward points' }
        };

        $('input[name="giftType"]').on('change', function () {
            const giftType = $(this).val();
            if (giftType === 'cash') {
                $('#cashPanel').slideDown(200);
                $('#bonusPanel').slideUp(200);
            } else {
                $('#cashPanel').slideUp(200);
                $('#bonusPanel').slideDown(200);
            }
            updateGiftSummary();
        });

        $('#cashType').on('change', function () { updateGiftSummary(); });
        $('#cashAmount').on('input', function () { updateGiftSummary(); });
        $('#bonusType').on('change', function () { updateGiftSummary(); });
        $('#giftRecipients').on('change', function () { updateGiftSummary(); });

        function updateGiftSummary() {
            const giftType = $('input[name="giftType"]:checked').val();
            let summaryType = 'Not selected';
            let summaryDetails = '-';
            const giftEl = document.getElementById('giftRecipients');
            const summaryRecipients = giftEl?.dataset?.segmentName
                ? `${giftEl.dataset.segmentName} (${giftEl.dataset.playerCount || 0} players)`
                : (giftEl?.value || 'Not selected');

            if (giftType === 'cash') {
                const cashType = $('#cashType').val();
                const amount = $('#cashAmount').val() || '0.00';
                summaryType = 'Cash';
                summaryDetails = `${cashType ? cashType.replace('-', ' ') : 'No type selected'} - $${parseFloat(amount).toFixed(2)}`;
            } else if (giftType === 'bonus') {
                const bonusType = $('#bonusType').val();
                const bonusLabel = bonusType ? bonusOptions[bonusType]?.label || 'Unknown bonus' : 'No bonus selected';
                summaryType = 'Bonus';
                summaryDetails = bonusLabel;
            }

            $('#summaryType').text(summaryType);
            $('#summaryDetails').text(summaryDetails);
            $('#summaryRecipients').text(summaryRecipients);
        }

        $('#awardGiftBtn').on('click', function () {
            const giftType    = $('input[name="giftType"]:checked').val();
            const recipientEl = document.getElementById('giftRecipients');
            const segName     = recipientEl?.dataset?.segmentName || recipientEl?.value || '';
            const playerCount = parseInt(recipientEl?.dataset?.playerCount || 0);

            if (!segName) {
                showToast('Error', 'No segment recipients found', 'error');
                return;
            }

            if (giftType === 'cash') {
                const cashType = $('#cashType').val();
                const amount   = parseFloat($('#cashAmount').val());
                if (!cashType) {
                    showToast('Error', 'Please select cash type (Withdrawable or Non-Withdrawable)', 'error');
                    return;
                }
                if (isNaN(amount) || amount <= 0) {
                    showToast('Error', 'Please enter a valid amount', 'error');
                    return;
                }
            } else if (giftType === 'bonus') {
                const bonusType = $('#bonusType').val();
                if (!bonusType) {
                    showToast('Error', 'Please select a bonus', 'error');
                    return;
                }
            }

            const btn = $(this);
            const originalText = btn.html();
            btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Processing...');

            setTimeout(() => {
                btn.prop('disabled', false).html(originalText);
                $('#awardGiftsModal').modal('hide');
                $('#cashType').val('');
                $('#cashAmount').val('');
                $('#cashDescription').val('');
                $('#bonusType').val('');
                $('#bonusDescription').val('');
                $('input[name="giftType"][value="cash"]').prop('checked', true).trigger('change');
                showToast('Success', `Gift awarded to ${playerCount} players in "${segName}"`, 'success');
            }, 2000);
        });

        $('#awardGiftsModal').on('hidden.bs.modal', function () {
            $('#cashType').val('');
            $('#cashAmount').val('');
            $('#cashDescription').val('');
            $('#bonusType').val('');
            $('#bonusDescription').val('');
            $('#giftRecipients').val('');
            $('input[name="giftType"][value="cash"]').prop('checked', true);
            $('#cashPanel').show();
            $('#bonusPanel').hide();
            updateGiftSummary();
        });
    })();
       
    // ─────────────────────────────────────────────────────────────────────────
    // Toast Notification Helper
    // ─────────────────────────────────────────────────────────────────────────
    window.showToast = function (title, message, type = 'info') {
        const toast = $('#actionToast');
        let headerClass = 'text-info';
        let icon = 'ri-information-line';

        if (type === 'success') {
            headerClass = 'text-success';
            icon = 'ri-checkbox-circle-line';
        } else if (type === 'error') {
            headerClass = 'text-danger';
            icon = 'ri-error-warning-line';
        } else if (type === 'warning') {
            headerClass = 'text-warning';
            icon = 'ri-alert-line';
        }

        toast.find('.toast-header').html(
            `<i class="${icon} me-2 ${headerClass}"></i><strong class="me-auto">${title}</strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`
        );
        toast.find('.toast-body').text(message);

        const bsToast = new bootstrap.Toast(toast[0]);
        bsToast.show();
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Expose Modal Functions Globally
    // ─────────────────────────────────────────────────────────────────────────
   window.openSmsModal = function () {
    const seg   = window.__segmentData__;
    const name  = seg?.name  || 'Current Segment';
    const count = seg?.total_players || seg?.players?.length || 0;

    const el = document.getElementById('smsRecipients');
    if (el) {
        el.value = name;
        el.dataset.segmentName  = name;
        el.dataset.playerCount  = count;
    }
    const badge = document.getElementById('smsRecipientCount');
    if (badge) badge.textContent = `${count} players`;

    new bootstrap.Modal(document.getElementById('sendSmsModal')).show();
};

window.openGiftsModal = function () {
    const seg   = window.__segmentData__;
    const name  = seg?.name  || 'Current Segment';
    const count = seg?.total_players || seg?.players?.length || 0;

    const el = document.getElementById('giftRecipients');
    if (el) {
        el.value = name;
        el.dataset.segmentName  = name;
        el.dataset.playerCount  = count;
    }
    const badge = document.getElementById('giftRecipientCount');
    if (badge) badge.textContent = `${count} players`;

    // Pre-fill summary recipients line
    const summaryEl = document.getElementById('summaryRecipients');
    if (summaryEl) summaryEl.textContent = `${name} (${count} players)`;

    new bootstrap.Modal(document.getElementById('awardGiftsModal')).show();
};

}); // end DOMContentLoaded