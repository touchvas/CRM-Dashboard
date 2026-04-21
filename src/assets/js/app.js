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

            // Close sidebar on mobile when a navigation link is clicked
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
                    $(this).parents('ul').each(function() {
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


    // ─── Segment / Create App ─────────────────────────────────────────────────
    const app = createApp({
        setup() {
            const rule = ref({
                field: '',
                operator: '',
                value: ''
            });

            const criteria = ref({
                operator: 'AND',
                conditions: [
                    { metric: '', operator: 'eq', value: '' }
                ]
            });

            const segmentName = ref('');
            const segmentDescription = ref('');
            const refreshType = ref('REAL_TIME');
            const allContacts = ref([]);
            const segments = ref([]);
            const filterSchema = ref([]);
            const isCreating = ref(false);

            const startCreating = () => {
                isCreating.value = true;
                if (filterSchema.value.length === 0) loadSchema();
            };

            const loadSchema = async () => {
                try {
                    console.log("Segmentation: Fetching schema...");
                    const response = await window.fetchAnalyticsSchema();
                    const fields = [];
                    const formatLabel = (str) => str.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();

                    // Handle standard JSON response if available
                    if (response?.dimensions || response?.metrics) {
                        (response.dimensions || []).forEach(d => {
                            fields.push({ field: d, label: formatLabel(d), type: 'string', operators: ['eq', 'ne', 'contains'] });
                        });
                        (response.metrics || []).forEach(m => {
                            fields.push({ field: m, label: formatLabel(m), type: 'number', operators: ['eq', 'gt', 'gte', 'lt', 'lte'] });
                        });
                    } 
                    else {
                        // Fallback: Parse the legacy string format "{[dims] [metrics] [times]}"
                        const rawData = typeof response?.data === 'string' ? response.data : JSON.stringify(response);
                        const matches = Array.from(rawData.matchAll(/\[(.*?)\]/g));

                        if (matches.length >= 1) {
                            // Group 1: Dimensions
                            matches[0][1].split(' ').filter(s => s).forEach(d => {
                                fields.push({ field: d, label: formatLabel(d), type: 'string', operators: ['eq', 'ne', 'contains'] });
                            });
                        }
                        if (matches.length >= 2) {
                            // Group 2: Metrics
                            matches[1][1].split(' ').filter(s => s).forEach(m => {
                                fields.push({ field: m, label: formatLabel(m), type: 'number', operators: ['eq', 'gt', 'gte', 'lt', 'lte'] });
                            });
                        }
                        if (matches.length >= 3) {
                            // Group 3: Timestamps
                            matches[2][1].split(' ').filter(s => s).forEach(t => {
                                fields.push({ field: t, label: formatLabel(t), type: 'date', operators: ['before', 'after'] });
                            });
                        }
                    }

                    filterSchema.value = fields;
                    console.log("Segmentation: Schema processed successfully.");
                } catch (error) {
                    console.error("Segmentation: Error parsing schema:", error);
                }
            };

            const loadSegments = async () => {
                try {
                    const res = await window.fetchSegments();
                    segments.value = res?.data || res || [];
                } catch (error) {
                    console.error("Failed to load segments:", error);
                    segments.value = JSON.parse(localStorage.getItem('segments') || '[]');
                }
            };

            onMounted(() => {
                loadSchema();
                loadSegments();
            });

             const isPreviewing = ref(false);
            const filteredContacts = ref([]);

            const runPreview = async () => {
                if (criteria.value.conditions.length === 0 || !criteria.value.conditions[0].metric) return;

                isPreviewing.value = true;
                try {
                    const queryData = {
                        measure: "count",
                        measure_field: "profileId",
                        filters: criteria.value.conditions.map(c => ({
                            field: c.metric,
                            operator: c.operator,
                            value: c.value
                        })),
                        operator: criteria.value.operator
                    };

                    const result = await window.executeAnalyticsQuery(queryData);
                    const data = result?.data || result || [];
                    filteredContacts.value = Array.isArray(data) ? data : [];
                    console.log("Preview results:", result);
                } catch (error) {
                    console.error("Preview failed:", error);
                } finally {
                    isPreviewing.value = false;
                }
            };

            const addCondition = () => {
                criteria.value.conditions.push({ metric: '', operator: 'eq', value: '' });
            };

            const removeCondition = (index) => {
                if (criteria.value.conditions.length > 1) {
                    criteria.value.conditions.splice(index, 1);
                }
            };

            async function saveCurrentSegment(name) {
                if (!name) {
                    alert('Please enter a segment name.');
                    return;
                }
                try {
                    const result = await createSegment(
                        name,
                        segmentDescription.value,
                        refreshType.value,
                        criteria.value
                    );
                    console.log("Segment created successfully:", result);
                    await loadSegments();
                    segmentName.value = '';
                    segmentDescription.value = '';
                    isCreating.value = false;
                    alert(`Segment "${name}" successfully created and synchronized!`);
                } catch (error) {
                    alert("Failed to create segment. Please check the console for details.");
                }
            }

            function loadSegment(segment) {
                segmentName.value = segment.name;
                rule.value.field = segment.rules[0].field;
                rule.value.operator = segment.rules[0].operator;
                rule.value.value = segment.rules[0].value;
                if (segment.criteria) {
                    criteria.value = JSON.parse(JSON.stringify(segment.criteria));
                }
            }

            // Professional formatting helpers
            const getFieldLabel = (field) => {
                const f = filterSchema.value.find(i => i.field === field);
                return f ? f.label : field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            };

            const getOperatorLabel = (op) => {
                const ops = {
                    'eq': 'is',
                    'ne': 'is not',
                    'gt': 'is greater than',
                    'lt': 'is less than',
                    'gte': 'is at least',
                    'lte': 'is at most',
                    'contains': 'contains',
                    'before': 'is before',
                    'after': 'is after'
                };
                return ops[op] || op;
            };

            const getSegmentSummary = (seg) => {
                const conditions = seg.criteria?.conditions || seg.conditions || [];
                if (conditions.length === 0) return "No rules defined";

                const c = conditions[0];
                if (!c.metric) return "New Segment";

                const base = `${getFieldLabel(c.metric)} ${getOperatorLabel(c.operator)} ${c.value}`;
                const count = conditions.length - 1;
                return count > 0 ? `${base} (and ${count} other rules)` : base;
            };

            return {
                rule, criteria, segmentName, segmentDescription, refreshType,
                availableFields: filterSchema, filteredContacts, segments, isCreating, isPreviewing,
                addCondition, removeCondition, saveCurrentSegment, loadSegment, startCreating, runPreview,
                getFieldLabel, getOperatorLabel, getSegmentSummary
            };
        }
    });

    // Mount to whichever element exists first (Vue apps can only mount once)
    const mountEl = document.getElementById('createSegmentApp') || document.getElementById('app');
    if (mountEl) {
        app.mount(mountEl);
        console.log(`Segmentation App mounted to #${mountEl.id}`);
    }


    // ─── Saved Segments App ───────────────────────────────────────────────────
    const savedSegmentsApp = createApp({
        setup() {
            const segments = ref([]);
            const selectedSegment = ref(null);
            const isLoading = ref(false);
            const filteredContacts = ref([]);
            const isPreviewLoading = ref(false);

            const loadSavedSegments = async () => {
                isLoading.value = true;
                try {
                    const res = await window.fetchSegments();
                    segments.value = res?.data || res || [];
                } catch (error) {
                    console.error("Error loading saved segments:", error);
                    segments.value = JSON.parse(localStorage.getItem('segments') || '[]');
                } finally {
                    isLoading.value = false;
                }
            };

            onMounted(loadSavedSegments);

            async function viewSegment(segment) {
                if (selectedSegment.value && selectedSegment.value.name === segment.name) {
                    selectedSegment.value = null;
                    filteredContacts.value = [];
                } else {
                    selectedSegment.value = segment;
                    await runPreview(segment);
                }
            }

            async function runPreview(segment) {
                if (!segment.criteria || !segment.criteria.conditions) return;

                isPreviewLoading.value = true;
                try {
                    const queryData = {
                        measure: "count",
                        measure_field: "profileId",
                        filters: segment.criteria.conditions.map(c => ({
                            field: c.metric,
                            operator: c.operator,
                            value: c.value
                        })),
                        operator: segment.criteria.operator || 'AND'
                    };

                    const result = await window.executeAnalyticsQuery(queryData);
                    const data = result?.data || result || [];
                    filteredContacts.value = Array.isArray(data) ? data : [];
                } catch (error) {
                    console.error("Preview failed for saved segment:", error);
                } finally {
                    isPreviewLoading.value = false;
                }
            }

            const getFieldLabel = (field) => {
                return field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            };

            const getOperatorLabel = (op) => {
                const ops = {
                    'eq': 'is',
                    'ne': 'is not',
                    'gt': '>',
                    'lt': '<',
                    'gte': '≥',
                    'lte': '≤',
                    'contains': 'contains'
                };
                return ops[op] || op;
            };

            const getSegmentSummary = (seg) => {
                const conditions = seg.criteria?.conditions || [];
                if (conditions.length === 0) return "No rules defined";

                const c = conditions[0];
                const base = `${getFieldLabel(c.metric)} ${getOperatorLabel(c.operator)} ${c.value}`;
                const remaining = conditions.length - 1;
                return remaining > 0 ? `${base} (+${remaining} more)` : base;
            };

            return { segments, selectedSegment, isLoading, filteredContacts, isPreviewLoading, viewSegment, getSegmentSummary };
        }
    });

    if (document.getElementById('savedSegmentsApp')) {
        savedSegmentsApp.mount('#savedSegmentsApp');
        console.log("savedSegmentsApp mounted.");
    }


    // ─── Segment View App ─────────────────────────────────────────────────────
    const segmentViewApp = createApp({
        setup() {
            const segmentData = ref({});

            const urlParams = new URLSearchParams(window.location.search);
            const segmentName = urlParams.get('name');

            onMounted(async () => {
                if (segmentName) {
                    try {
                        const res = await window.fetchSegments();
                        const segmentsList = res?.data || res || [];
                        const found = segmentsList.find(s => s.name === segmentName);
                        if (found) {
                            segmentData.value = found;
                            return;
                        }
                    } catch (e) { console.error("API fetch failed, checking local storage"); }

                    const localSegments = JSON.parse(localStorage.getItem('segments') || '[]');
                    const foundLocal = localSegments.find(s => s.name === segmentName);
                    if (foundLocal) segmentData.value = foundLocal;
                }
            });

            function getFieldLabel(field) {
                const fieldConfig = (window.filterSchema || []).find(f => f.field === field);
                return fieldConfig ? fieldConfig.label : field;
            }

            function getOperatorLabel(operator) {
                const operators = {
                    'equals': 'Equals',
                    'contains': 'Contains',
                    'gte': 'Greater than or equal to',
                    'lte': 'Less than or equal to'
                };
                return operators[operator] || operator;
            }

            function deleteSegment() {
                if (confirm(`Are you sure you want to delete "${segmentData.value.name}"?`)) {
                    const segments = JSON.parse(localStorage.getItem('segments') || '[]');
                    const filtered = segments.filter(s => s.name !== segmentData.value.name);
                    localStorage.setItem('segments', JSON.stringify(filtered));
                    alert('Segment deleted!');
                    window.location.href = 'pages-segmentation.html';
                }
            }

            return { segmentData, filteredContacts: ref([]), getFieldLabel, getOperatorLabel, deleteSegment };
        }
    });

    if (document.getElementById('segmentViewApp')) {
        segmentViewApp.mount('#segmentViewApp');
        console.log("segmentViewApp mounted.");
    }


    // ─── Rule Builder App ─────────────────────────────────────────────────────
    const ruleBuilderApp = createApp({
        setup() {
            const rule = ref({
                steps: [{ event: 'deposit', threshold: 0 }],
                window: 24,
                reset_logic: 'sliding'
            });

            const existingRules = ref([]);

            const addStep = () => {
                rule.value.steps.push({ event: 'deposit', threshold: 0 });
            };

            const removeStep = (index) => {
                rule.value.steps.splice(index, 1);
            };

            const publishToEngine = async () => {
                try {
                    console.log("Publishing Master JSON:", JSON.stringify(rule.value, null, 2));
                    const result = await publishRule(rule.value);
                    alert("Rule successfully published to Flink Engine!");
                    await loadRules();
                } catch (error) {
                    alert("Failed to publish rule. Check console for details.");
                }
            };

            const loadRules = async () => {
                try {
                    const data = await fetchRules();
                    existingRules.value = data;
                    console.log("Successfully loaded rules:", data);
                } catch (error) {
                    console.error("Failed to load rules:", error);
                }
            };

            onMounted(loadRules);

            return { rule, existingRules, addStep, removeStep, publishRule: publishToEngine };
        }
    });

    if (document.getElementById('ruleBuilderApp')) {
        ruleBuilderApp.mount('#ruleBuilderApp');
        console.log("ruleBuilderApp mounted.");
    }


    // ─── Dashboard Analytics App ──────────────────────────────────────────────
    if (document.getElementById('dashboardApp')) {
        const dashboardApp = createApp({
            setup() {
                const stats = ref({
                    totalBets: 0,
                    totalStake: 0,
                    totalPayout: 0,
                    activeBettors: 0
                });

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

                        stats.value = {
                            totalBets: bets.value || 0,
                            totalStake: stake.value || 0,
                            totalPayout: payout.value || 0,
                            activeBettors: players.value || 0
                        };
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

                async function curl(url, data) {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    // Log raw HTTP status before attempting JSON parse
                    console.log("HTTP status:", response.status, response.statusText);

                    const rawText = await response.text();
                    console.log("Raw response body:", rawText);

                    // Only parse if there is a body to parse
                    if (!rawText || rawText.trim() === '') {
                        return { status: response.status, message: `Empty response (HTTP ${response.status})` };
                    }

                    try {
                        return JSON.parse(rawText);
                    } catch (parseErr) {
                        console.error("JSON parse failed — raw body was:", rawText);
                        return { status: response.status, message: `Non-JSON response: ${rawText.substring(0, 120)}` };
                    }
                }

                const login = async () => {
                    console.log("Login function triggered for:", username.value);

                    alert_error.value = false;
                    alert_success.value = false;

                    if (!username.value || !password.value) {
                        alert_message.value = 'Phone Number and Password are required';
                        alert_error.value = true;
                        return;
                    }

                    const payload = {
                        email: "string",
                        msisdn: Number(String(username.value || '').replace(/\D/g, '')),
                        password: password.value,
                        username: "string"
                    };

                    console.log("Sending payload:", JSON.stringify(payload, null, 2));

                    try {
                        const res = await curl(`${baseUrl}/user/login?lang=en`, payload);

                        console.log("Identity Service Response:", JSON.stringify(res, null, 2));

                        if (res && (parseInt(res.status) === 1 || parseInt(res.status) === 202)) {
                            console.log("Authentication successful. Redirecting to dashboard...");
                            sessionStorage.setItem('api_key', res.auth || '');
                            sessionStorage.setItem('isLoggedIn', 'true');
                            window.location.href = 'index.html';
                        } else {
                            alert_error.value = true;
                            alert_message.value = (res && res.message) ? res.message : 'Login failed: Invalid credentials';
                        }
                    } catch (e) {
                        console.error("Login Error:", e);
                        alert_error.value = true;
                        alert_message.value = 'Connection error to identity service';
                    }
                };

                return {
                    username,
                    password,
                    alert_message, alert_error, alert_success,
                    login
                };
            }
        });

        loginApp.mount('#loginApp');
        console.log("loginApp mounted successfully.");
    }

    // ─── Global Logout Function ──────────────────────────────────────────────
    /**
     * Clears session authentication data and redirects the user to the login page.
     */
    window.logout = function () {
        console.log("Rules Portal: Logging out...");
        sessionStorage.removeItem('api_key');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'auth-login.html';
    };

}); // end DOMContentLoaded