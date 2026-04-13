
(function ($) {

    'use strict';

    function initMetisMenu() {
        //metis menu initialization
        $("#side-menu").metisMenu({
            toggle: true, // Auto-close other menus
            triggerElement: '.has-arrow' // Explicitly define trigger
        });
    }

    function initLeftMenuCollapse() {
        $('#sidebar-btn').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('sidebar-enable');
            if ($(window).width() >= 992) {
                $('body').toggleClass('sidebar-collpsed');
            } else {
                $('body').removeClass('sidebar-collpsed');
            }
        });

        // Mobile backdrop click to close
        $(document).on('click', '.sidebar-left', function (e) {
            if ($(e.target).hasClass('sidebar-left')) {
                $("body").removeClass("sidebar-enable");
            }
        });
    }

    function initActiveMenu() {
        // === following js will activate the menu in left side bar based on url ====
        $("#sidebar-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];

            // Handle root/index matching effectively
            const isRoot = pageUrl.endsWith('index.html') || pageUrl.endsWith('/');

            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("mm-active"); // add active to li of the current link
                $(this).parents('ul').addClass("mm-show"); // Open matching submenus
                $(this).parents('li').addClass("mm-active"); // Mark parent items as active
            } else if (isRoot) {
                // Ensure we don't accidentally active submenus on root if href is empty or special
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
    // page topbar class added
    function windowScroll() {
        var pageTopbar = document.getElementById("page-topbar");
        if (pageTopbar) {
            document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add("topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
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
        // focus active menu in left sidebar
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
            if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
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
                console.log('pressed');
                $('body').removeClass('fullscreen-enable');
            }
        }
    }

    function initRightSidebar() {
        // right side-bar toggle
        $('.right-bar-toggle').on('click', function (e) {
            $('body').toggleClass('right-bar-enabled');
        });

        $(document).on('click', 'body', function (e) {
            if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                return;
            }

            $('body').removeClass('right-bar-enabled');
            return;
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
                }
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

        // Tooltip
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

        // Popover
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })

    }

    function initSettings() {

        //
        /********************* light-dark js ************************/
        //

        var bodyElem = document.documentElement;

        // layout mode
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
            lightDarkBtn.addEventListener('click', function (event) {
                if (bodyElem.hasAttribute("data-bs-theme") && bodyElem.getAttribute("data-bs-theme") == "dark") {
                    bodyElem.setAttribute('data-bs-theme', 'light');
                    sessionStorage.setItem("data-layout-mode", "light");
                } else {
                    bodyElem.setAttribute('data-bs-theme', 'dark');
                    sessionStorage.setItem("data-layout-mode", "dark");
                }
            });
        }

        // layout direction

        var layoutDirBtn = document.getElementById('layout-dir-btn');
        if (layoutDirBtn) {
            layoutDirBtn.addEventListener('click', function (event) {
                if (bodyElem.hasAttribute("dir") && bodyElem.getAttribute("dir") == "rtl") {
                    bodyElem.setAttribute("dir", "ltr")
                    document.getElementById("bootstrap-style").setAttribute("href", "assets/css/bootstrap.min.css");
                    document.getElementById("app-style").setAttribute("href", "assets/css/app.min.css");
                    this.innerHTML = "RTL";
                } else {
                    bodyElem.setAttribute("dir", "rtl")
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
        initMetisMenu();
        initLeftMenuCollapse();
        initMenuItem();
        initMenuItemScroll();
        initFullScreen();
        initRightSidebar();
        initDropdownMenu();
        initComponents();
        initPreloader()
        initSettings();
        Waves.init();
    }

    init();

})(jQuery)


import { createApp, ref, computed } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { applyRule, filterContacts, saveSegment } from "./logic.js";
import { contacts, ContactFilterSchema } from "./dummydata.js";

const app = createApp({
    setup() {
        // The currently selected rule
        const rule = ref({
            field: '',
            operator: '',
            value: ''
        });

        const segmentName = ref('');
        const allContacts = ref(contacts);
        const segments = ref(JSON.parse(localStorage.getItem('segments') || '[]'));

        const filteredContacts = computed(() => filterContacts(allContacts.value, rule.value));

        function saveCurrentSegment(name) {
            if (!rule.value.field || !rule.value.operator) {
                alert('Please select a field and operator first!');
                return;
            }
            segments.value = saveSegment(name, rule.value);
            segmentName.value = ''; // Clear input after saving
            alert(`Segment "${name}" saved!`);
        }

        function loadSegment(segment) {
            segmentName.value = segment.name;
            rule.value.field = segment.rules[0].field;
            rule.value.operator = segment.rules[0].operator;
            rule.value.value = segment.rules[0].value;
        }

        return {
            rule,
            segmentName,
            ContactFilterSchema,
            filteredContacts,
            segments,
            saveCurrentSegment,
            loadSegment
        };
    }
});

// Mount createSegmentApp
if (document.getElementById('createSegmentApp')) {
    app.mount('#createSegmentApp');
}

// Old segmentation page support (backwards compatibility)
if (document.getElementById('app')) {
    app.mount('#app');
}

// Saved Segments App
const savedSegmentsApp = createApp({
    setup() {
        const segments = ref(JSON.parse(localStorage.getItem('segments') || '[]'));
        const selectedSegment = ref(null);
        const allContacts = ref(contacts);

        const filteredContacts = computed(() => {
            if (!selectedSegment.value || !selectedSegment.value.rules || !selectedSegment.value.rules[0]) {
                return [];
            }
            return filterContacts(allContacts.value, selectedSegment.value.rules[0]);
        });

        function viewSegment(segment) {
            // Toggle: if clicking the same segment, close it; otherwise show the new one
            if (selectedSegment.value && selectedSegment.value.name === segment.name) {
                selectedSegment.value = null;
            } else {
                selectedSegment.value = segment;
            }
        }

        return {
            segments,
            selectedSegment,
            filteredContacts,
            viewSegment
        };
    }
});

if (document.getElementById('savedSegmentsApp')) {
    savedSegmentsApp.mount('#savedSegmentsApp');
}

// Segment View App
const segmentViewApp = createApp({
    setup() {
        const segmentData = ref({});
        const allContacts = ref(contacts);

        // Load segment from URL parameter or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const segmentName = urlParams.get('name');

        if (segmentName) {
            const segments = JSON.parse(localStorage.getItem('segments') || '[]');
            const found = segments.find(s => s.name === segmentName);
            if (found) {
                segmentData.value = found;
            }
        }

        // Compute filtered contacts based on segment rule
        const filteredContacts = computed(() => {
            if (!segmentData.value.rules || !segmentData.value.rules[0]) return [];
            return filterContacts(allContacts.value, segmentData.value.rules[0]);
        });

        function getFieldLabel(field) {
            const fieldConfig = ContactFilterSchema.find(f => f.field === field);
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

        return {
            segmentData,
            filteredContacts,
            getFieldLabel,
            getOperatorLabel,
            deleteSegment
        };
    }
});

if (document.getElementById('segmentViewApp')) {
    segmentViewApp.mount('#segmentViewApp');
}
