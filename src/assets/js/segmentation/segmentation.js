
/**
 * segmentation.js
 * Centralized Segmentation Logic & Vue Apps
 */

/* ═══════════════════════════════════════════════════════════════
   1.  API SERVICE & UTILS
   ═══════════════════════════════════════════════════════════════ */

const SEGMENTATION_BASE_URL = 'https://crm.gamesapi.dev/v1';
const CRM_API_BASE = 'https://crm.gamesapi.dev/v1';
const getApiKey = () => sessionStorage.getItem('api_key') || '';

const apiRequest = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': getApiKey(),
            'Authorization': `Bearer ${getApiKey()}`
        }
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    if (response.status === 401) {
        console.warn('[API] Unauthorized (401) at ' + url + '. Redirecting to login.');
        sessionStorage.removeItem('api_key');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'auth-login.html';
        return;
    }
    if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`API ${response.status}: ${errText}`);
    }
    if (response.status === 204) return null;
    return response.json();
};

/**
 * Walks the Vue criteria tree and produces the flat rules[] + groups[]
 * arrays the API expects.
 *
 * FIX: Removed node.value unwrap — criteria is reactive(), not ref().
 * Previously `node.value` was undefined, causing silent failures.
 */
function flattenCriteria(node, rules = [], groups = []) {
    // FIX: criteria is reactive (no .value). Support both just in case.
    const rawNode = (node && node.value !== undefined) ? node.value : node;
    for (const item of rawNode.rules || []) {
        if (item._type === 'group') {
            groups.push(item.operator || 'AND');
            flattenCriteria(item, rules, groups);
        } else {
            if (!item.field || !item.operator) continue;
            rules.push({
                field: item.field,
                operator: item.operator,
                value: String(item.value ?? ''),
                sub_query: null
            });
        }
    }
    return { rules, groups };
}
window.flattenCriteria = flattenCriteria;

/* ── Exposed API helpers ─────────────────────────────────────── */
window.fetchSegments = (page = 1, limit = 20) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments?page=${page}&limit=${limit}`);

window.fetchRules = (page = 1, limit = 20, active = true) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/rules?page=${page}&limit=${limit}&active=${active}`);

window.publishRule = (data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments`, 'POST', data);

window.updateSegment = (id, data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`, 'PUT', data);

window.deleteSegment = (id) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`, 'DELETE');

// Notification Templates API helpers
window.createNotificationTemplate = (data) =>
    apiRequest(`${CRM_API_BASE}/notifications/templates`, 'POST', data);

window.updateNotificationTemplate = (data) => // ID is in the body as per curl example
    apiRequest(`${CRM_API_BASE}/notifications/templates`, 'PUT', data);

window.deleteNotificationTemplate = (id) =>
    apiRequest(`${CRM_API_BASE}/notifications/templates/${id}`, 'DELETE');

window.fetchNotificationTemplates = async (page = 1, limit = 20) => {
    console.log(`[API] Fetching notification templates: page=${page}, limit=${limit}`);
    try {
        return await apiRequest(`${CRM_API_BASE}/notifications/templates?page=${page}&per_page=${limit}`);
    } catch (err) {
        console.warn("[API] Failed to fetch notification templates, falling back to dummy.", err);
        if (window.fetchNotificationTemplatesDummy) {
            return await window.fetchNotificationTemplatesDummy();
        }
        throw err;
    }
};

window.fetchSegmentById = (id) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/segments/${id}`);

window.executeAnalyticsQuery = (data) =>
    apiRequest(`${SEGMENTATION_BASE_URL}/analytics/query`, 'POST', data);

// Notification Schedules API helpers
window.fetchNotificationSchedules = (page = 1, per_page = 20) =>
    apiRequest(`${CRM_API_BASE}/notifications/schedules?page=${page}&per_page=${per_page}`);

window.createNotificationSchedule = (data) =>
    apiRequest(`${CRM_API_BASE}/notifications/schedules`, 'POST', data);

window.deleteNotificationSchedule = (id) =>
    apiRequest(`${CRM_API_BASE}/notifications/schedules/${id}`, 'DELETE');

window.deactivateNotificationSchedule = (id) =>
    apiRequest(`${CRM_API_BASE}/notifications/schedules/${id}/deactivate`, 'PATCH');

window.activateNotificationSchedule = (id) =>
    apiRequest(`${CRM_API_BASE}/notifications/schedules/${id}/activate`, 'PATCH');

/* ── Shared Formatting Helpers ────────────────────────────────── */
const fmtShort = (n) => {
    if (!n && n !== 0) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
};
window.fmtShort = fmtShort;

/**
 * Shared Marketing Actions (SMS, Gifts, Scheduling)
 * Extracted to global scope so it can be used by page-specific scripts (like segment-details.js).
 */
window.initMarketingActions = () => {
    console.log("[Marketing] Initializing Marketing Actions (SMS/Gifts listeners)");

    // Clear existing listeners to avoid duplicates
    $('#smsTemplateSelect, #createTemplateBtn, #updateTemplateBtn, #deleteTemplateBtn, #smsMessage, .sms-variable-btn, input[name="giftType"], #awardGiftBtn, #cashType, #cashAmount, #bonusType').off();

    $('#smsMessage').on('input', function () {
        const len = $(this).val().length;
        $('#charCount').text(len);
        $('#msgCount').text(Math.ceil(len / 160));
    });

    $('#smsTemplateSelect').on('change', function () {
        const selected = $(this).find('option:selected');
        const templateId = selected.data('id');
        const isCustom = !templateId;

        if (!isCustom) {
            $('#smsTemplateName').val(selected.text());
            $('#createTemplateBtn').hide();
            $('#updateTemplateBtn, #deleteTemplateBtn').show();
            $('#smsMessage').val(selected.val()).trigger('input');
        } else {
            $('#smsTemplateName').val('');
            $('#smsMessage').val('').trigger('input');
            $('#createTemplateBtn').show();
            $('#updateTemplateBtn, #deleteTemplateBtn').hide();
        }
    });

    $('#createTemplateBtn').on('click', async function () {
        const name = $('#smsTemplateName').val().trim();
        if (!name) { showToast('Warning', 'Please enter a name for the new template', 'warning'); return; }
        const content = $('#smsMessage').val().trim();
        if (!content) { showToast('Error', 'Message content cannot be empty', 'error'); return; }

        const payload = {
            name: name,
            description: `Template: ${name}`,
            content: [{ channel: 'sms', title: name, content: content, image: "" }],
            default_retry_config: {}
        };

        try {
            await window.createNotificationTemplate(payload);
            showToast('Success', 'Template created successfully', 'success');
            if (window.openSmsModal) await window.openSmsModal();
        } catch (err) { showToast('Error', 'Failed to create template: ' + err.message, 'error'); }
    });

    $('#updateTemplateBtn').on('click', async function () {
        const selected = $('#smsTemplateSelect option:selected');
        const templateId = selected.data('id');
        const name = $('#smsTemplateName').val().trim();
        const content = $('#smsMessage').val().trim();
        if (!templateId) return;
        if (!name || !content) { showToast('Error', 'Name and message content are required', 'error'); return; }

        const payload = {
            id: String(templateId),
            name: name,
            description: `Template: ${name}`,
            content: [{ channel: 'sms', title: name, content: content, image: "" }],
            default_retry_config: {}
        };

        try {
            await window.updateNotificationTemplate(payload);
            showToast('Success', 'Template updated successfully', 'success');
            if (window.openSmsModal) await window.openSmsModal();
        } catch (err) { showToast('Error', 'Failed to update template: ' + err.message, 'error'); }
    });

    $('#saveScheduleBtn').on('click', async function () {
        const btn = $(this);
        const name = $('#schedCampaignName').val().trim();
        const templateId = $('#schedTemplateSelect').val();
        const cron = $('#schedCron').val().trim();
        const tz = $('#schedTimezone').val();
        const seg = window.__segmentData__;

        if (!name || !templateId || !cron) {
            window.showToast('Warning', 'Please fill in all required fields.', 'warning');
            return;
        }

        const payload = {
            name: name,
            template_id: templateId,
            cron_expression: cron,
            timezone: tz,
            target_type: 'segment',
            target_value: String(seg?.id || ''),
            end_date: null
        };

        const oldText = btn.html();
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Saving...');
        try {
            await window.createNotificationSchedule(payload);
            window.showToast('Success', 'Campaign schedule created successfully', 'success');
            $('#scheduleCampaignModal').modal('hide');
        } catch (err) { window.showToast('Error', 'Failed to save schedule: ' + err.message, 'error'); }
        finally { btn.prop('disabled', false).html(oldText); }
    });
};

/* ═══════════════════════════════════════════════════════════════
   2.  VUE APPS
   ═══════════════════════════════════════════════════════════════ */
const { createApp, reactive, ref, computed, onMounted, watch, nextTick } = Vue;

// Global initialization for pages that might not have the full Vue app but have the modals
document.addEventListener('DOMContentLoaded', () => {
    // If we are NOT on a page with segmentViewApp, we still might want to init marketing actions
    // but only if the modals are present in the DOM.
    if (!document.getElementById('segmentViewApp') && document.getElementById('sendSmsModal')) {
        console.log("[Marketing] Global trigger for Marketing Actions");
        if (window.initMarketingActions) window.initMarketingActions();
    }
});
