/**
 * app.js
 * Core platform logic: Authentication, Global Dashboard, Notifications, and Modals.
 * Segmentation-specific logic is now in segmentation.js.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("app.js: Initializing core platform apps...");

    // Initialize MetisMenu for sidebar
    if (typeof $ !== 'undefined' && $('#side-menu').length) {
        $('#side-menu').metisMenu();
        console.log("MetisMenu initialized on #side-menu");
    } else {
        console.warn("MetisMenu or #side-menu not found.");
    }


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
                        if (window.showToast) window.showToast('Error', 'Email and Password are required', 'error');
                        else alert('Email and Password are required');
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
                            if (window.showToast) window.showToast('Error', msg, 'error');
                            else alert(msg);
                            return;
                        }

                        const apiKey = data?.auth || data?.token || data?.api_key || data?.access_token || data?.data?.token || '';

                        if (!apiKey) {
                            console.error('[login] No API key found in response:', data);
                            if (window.showToast) window.showToast('Error', 'Session token missing. Contact support.', 'error');
                            else alert('Session token missing. Contact support.');
                            return;
                        }

                        sessionStorage.setItem('api_key', apiKey);
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('user_email', username.value);

                        window.location.href = 'index.html';

                    } catch (err) {
                        console.error('[login] error:', err);
                        if (window.showToast) window.showToast('Error', 'Connection error. Please try again.', 'error');
                        else alert('Connection error. Please try again.');
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

    // ─── Toast Notification Helper ─────────────────────────────────────────────
    window.showToast = function (title, message, type = 'info') {
        const toast = $('#actionToast');
        if (!toast.length) return;
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

});