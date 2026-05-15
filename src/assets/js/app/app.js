/**
 * app.js
 * Core platform logic: Authentication, Global Dashboard, Notifications, and Modals.
 * Segmentation-specific logic is now in segmentation.js.
 */

/**
 * App.js - Global App Logic
 */

// ─── Toast Notification Helper (Global) ─────────────────────────────────────────────
// Defined at the very top to ensure availability for other scripts
window.showToast = function (title, message, type = 'info') {
    const id = 'toast-' + Date.now() + Math.floor(Math.random() * 1000);
    const color = type === 'success' ? 'bg-success'
        : type === 'error' || type === 'danger' ? 'bg-danger'
            : type === 'warning' ? 'bg-warning'
                : 'bg-primary';

    // Remove old toasts to prevent stacking off-screen (since it's top-center)
    const existingToasts = document.querySelectorAll('.global-toast');
    existingToasts.forEach(t => t.remove());

    document.body.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="toast global-toast align-items-center text-white ${color} border-0 show position-fixed"
             style="top:24px;left:50%;transform:translateX(-50%);z-index:9999;min-width:300px;box-shadow:0 10px 25px rgba(0,0,0,0.15);border-radius:10px;padding:4px" role="alert">
            <div class="d-flex">
                <div class="toast-body fw-semibold fs-14">
                    <i class="${type === 'success' ? 'ri-checkbox-circle-fill' : type === 'error' || type === 'danger' ? 'ri-error-warning-fill' : type === 'warning' ? 'ri-alert-fill' : 'ri-information-fill'} me-2 fs-16 align-middle"></i>
                    ${title}: <span class="fw-normal opacity-75">${message}</span>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                        onclick="document.getElementById('${id}').remove()"></button>
            </div>
        </div>`);

    setTimeout(() => {
        const t = document.getElementById(id);
        if (t) {
            t.style.opacity = '0';
            t.style.transition = 'opacity 0.4s ease';
            setTimeout(() => t.remove(), 400);
        }
    }, 4000);
};

document.addEventListener('DOMContentLoaded', function () {
    console.log("app.js: Initializing core platform apps...");

    // Initialize MetisMenu for sidebar
    if (typeof $ !== 'undefined' && $('#side-menu').length) {
        $('#side-menu').metisMenu();
        console.log("MetisMenu initialized on #side-menu");

        // ── Highlight Active Menu Item ──
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        $('#side-menu a').each(function () {
            const page = $(this).attr('href');
            if (!page || page === 'javascript: void(0);') return;

            let isMatch = (page === currentPath);
            
            // Handle sub-pages (e.g. creating a segment should highlight the main Segmentation menu)
            if (currentPath === 'pages-segmentation.html' && page === 'pages-saved-segments.html') isMatch = true;
            if (currentPath === 'pages-segment-details.html' && page === 'pages-saved-segments.html') isMatch = true;
            if (currentPath === 'pages-customer-journey.html' && page === 'pages-customer-journeys-list.html') isMatch = true;

            if (isMatch) {
                $(this).addClass('active');
                $(this).parent().addClass('mm-active');
                $(this).parent().parent().addClass('mm-show');
                $(this).parent().parent().prev().addClass('mm-active'); // For parent has-arrow
                $(this).parent().parent().parent().addClass('mm-active');
            }
        });
    } else {
        console.warn("MetisMenu or #side-menu not found.");
    }

    // Sidebar Toggle Logic (Desktop & Mobile)
    document.addEventListener('click', function (e) {
        // Toggle Sidebar (Single unified button)
        const toggleBtn = e.target.closest('#sidebar-btn');
        if (toggleBtn) {
            e.preventDefault();
            const isMobile = window.innerWidth < 992;
            
            if (!isMobile) {
                document.body.classList.toggle('sidebar-collapsed');
            } else {
                document.body.classList.toggle('sidebar-enable');
            }
            return;
        }

        // Close Sidebar (Internal close button or clicking the Overlay)
        const closeTrigger = e.target.closest('#close-sidebar') || e.target.closest('#mobileSidebarOverlay');
        if (closeTrigger) {
            e.preventDefault();
            document.body.classList.remove('sidebar-enable');
            return;
        }

        // Fallback: Click outside on main content to close
        if (e.target.closest('.main-content') && document.body.classList.contains('sidebar-enable')) {
            document.body.classList.remove('sidebar-enable');
        }
    });


    // ─── Login App ───────────────────────────────────────────────────────────
    if (document.getElementById('loginApp')) {
        const loginApp = Vue.createApp({
            setup() {
                const username = Vue.ref('');
                const password = Vue.ref('');
                const isLoading = Vue.ref(false);

                const handleLogin = async () => {
                    console.log("[login] handleLogin triggered for user:", username.value);
                    if (!username.value || !password.value) {
                        showToast('Error', 'Email and Password are required', 'error');
                        return;
                    }

                    isLoading.value = true;

                    try {
                        const msisdnVal = username.value.replace(/\D/g, '');
                        const response = await fetch('https://identity.gamesapi.dev/user/login?lang=en', {
                            method: 'POST',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: username.value,
                                msisdn: msisdnVal ? Number(msisdnVal) : null,
                                password: password.value,
                                username: username.value
                            })
                        });

                        const data = await response.json();
                        console.log('[login] full response:', data);

                        if (!response.ok || data?.error_code) {
                            const msg = data?.error_message || data?.message || 'Login failed. Check your credentials.';
                            showToast('Error', msg, 'error');
                            return;
                        }

                        const apiKey = data?.auth || data?.token || data?.api_key || data?.access_token || data?.data?.token || '';

                        if (!apiKey) {
                            console.error('[login] No API key found in response:', data);
                            showToast('Error', 'Session token missing. Contact support.', 'error');
                            return;
                        }

                        sessionStorage.setItem('api_key', apiKey);
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('user_email', username.value);

                        window.location.href = 'index.html';

                    } catch (err) {
                        console.error('[login] error:', err);
                        showToast('Error', 'Connection error. Please try again.', 'error');
                    } finally {
                        isLoading.value = false;
                    }
                };

                return { username, password, isLoading, handleLogin };
            }
        });
        loginApp.mount('#loginApp');
        console.log("loginApp mounted successfully.");
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
                        const query = window.executeAnalyticsQuery || (() => Promise.resolve({ value: 0 }));
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
                const baseUrl = 'https://identity.gamesapi.dev/v1';

                const showNotification = (msg, type = 'danger') => {
                    showToast(type === 'success' ? 'Success' : 'Error', msg, type);
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

    // ─── Expose Modal Functions Globally ────────────────────────────────────────
    window.openSmsModal = async function () { // Made async to fetch templates
        console.log("[SMS Modal] Opening modal and fetching templates...");
        const modalEl = document.getElementById('sendSmsModal');
        if (modalEl) new bootstrap.Modal(modalEl).show();

        const smsTemplateSelect = document.getElementById('smsTemplateSelect');
        if (!smsTemplateSelect) {
            console.error("[SMS Modal] #smsTemplateSelect not found in DOM.");
            return;
        }

        // Clear previous templates and reset message
        smsTemplateSelect.innerHTML = '<option value="">-- Custom Message --</option>';

        if (typeof window.fetchNotificationTemplates !== 'function') {
            console.error("[SMS Modal] window.fetchNotificationTemplates is not defined. Ensure segmentation.js is loaded.");
            return;
        }

        // Fetch templates and populate dropdown
        try {
            const templatesData = await window.fetchNotificationTemplates(1, 100); // Fetch up to 100 templates
            console.log("[SMS Modal] Templates fetched:", templatesData);

            const templates = templatesData?.results || templatesData?.data || (Array.isArray(templatesData) ? templatesData : []);

            templates.forEach(template => {
                const smsContent = Array.isArray(template.content) ? template.content.find(c => c.channel === 'sms') : null;
                if (smsContent && smsContent.content) {
                    const option = document.createElement('option');
                    option.value = smsContent.content;
                    option.textContent = template.name;
                    option.setAttribute('data-id', template.id);
                    smsTemplateSelect.appendChild(option);
                }
            });
            // Trigger change to sync UI buttons and clear inputs via segmentation.js listener
            $(smsTemplateSelect).trigger('change');
        } catch (error) {
            console.error("Failed to fetch notification templates:", error);
            if (window.showToast) window.showToast('Error', 'Failed to load SMS templates.', 'error');
        }
    };

    window.openGiftsModal = function () {
        const seg = window.__segmentData__;
        const name = seg?.name || 'Current Segment';
        const count = seg?.total_players || seg?.players?.length || 0;

        const el = document.getElementById('giftRecipients');
        if (el) {
            el.value = name;
            el.dataset.segmentName = name;
            el.dataset.playerCount = count;
        }
        const badge = document.getElementById('giftRecipientCount');
        if (badge) badge.textContent = `${count} players`;

        const summaryEl = document.getElementById('summaryRecipients');
        if (summaryEl) summaryEl.textContent = `${name} (${count} players)`;

        const modalEl = document.getElementById('awardGiftsModal');
        if (modalEl) new bootstrap.Modal(modalEl).show();
    };

    window.openScheduleModal = async function () {
        console.log("[Schedule Modal] Opening modal and fetching templates...");
        const modalEl = document.getElementById('scheduleCampaignModal');
        if (modalEl) new bootstrap.Modal(modalEl).show();

        const templateSelect = document.getElementById('schedTemplateSelect');
        if (!templateSelect) return;

        templateSelect.innerHTML = '<option value="">-- Select Template --</option>';

        try {
            const templatesData = await window.fetchNotificationTemplates(1, 100);
            const templates = templatesData?.results || templatesData?.data || (Array.isArray(templatesData) ? templatesData : []);

            templates.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.textContent = t.name;
                templateSelect.appendChild(opt);
            });
        } catch (error) {
            console.error("Failed to fetch templates for schedule:", error);
            if (window.showToast) window.showToast('Error', 'Failed to load templates.', 'error');
        }
    };
});
