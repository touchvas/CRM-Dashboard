import { createApp, ref, computed, onMounted, nextTick } from 'vue';
import { VueFlow, useVueFlow, Handle } from '@vue-flow/core';
import { Background } from '@vue-flow/background';

/* ─────────────────────────────────────────────
   API HELPERS
───────────────────────────────────────────── */
const API_BASE = 'https://crm.gamesapi.dev/v1';
const getApiKey = () => sessionStorage.getItem('api_key') || '';

const apiRequest = async (url, method = 'GET', body = null) => {
    const opts = {
        method,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': getApiKey(),
            'Authorization': `Bearer ${getApiKey()}`
        }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    if (res.status === 401) {
        sessionStorage.removeItem('api_key');
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'auth-login.html';
        return;
    }
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`API ${res.status}: ${txt}`);
    }
    if (res.status === 204) return null;
    return res.json();
};

/* ─────────────────────────────────────────────
   UUID v7 GENERATOR
───────────────────────────────────────────── */
function uuidv7() {
    const now = Date.now();
    const hi = Math.floor(now / 0x1000);
    const lo = now & 0xfff;
    const r16 = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
    const time = hi.toString(16).padStart(12, '0');
    return `${time.slice(0, 8)}-${time.slice(8, 12)}-7${lo.toString(16).padStart(3, '0')}-${(0x8000 | (Math.random() * 0x4000 | 0)).toString(16)}-${r16()}${r16()}${r16()}`;
}

/* ─────────────────────────────────────────────
   CATALOG
───────────────────────────────────────────── */
const CATALOG = {
    triggers: [
        { key: 'DEPOSIT',           icon: '💰', label: 'Deposit',           desc: 'Any successful payment',            nodeType: 'trigger' },
        { key: 'SIGN_IN',           icon: '🔑', label: 'Sign In',           desc: 'User authentication event',         nodeType: 'trigger' },
        { key: 'CASINO_BET',        icon: '🎰', label: 'Casino Bet',        desc: 'Any casino game stake placed',      nodeType: 'trigger' },
        { key: 'SPORTS_BET',        icon: '⚽', label: 'Sports Bet',        desc: 'Any sportsbook wager placed',       nodeType: 'trigger' },
        { key: 'CASINO_WIN',        icon: '💎', label: 'Casino Win',        desc: 'User won a casino round',           nodeType: 'trigger' },
        { key: 'WINNING',           icon: '🏆', label: 'Winning',           desc: 'Any winning event fired',           nodeType: 'trigger' },
        { key: 'WITHDRAWAL',        icon: '🏧', label: 'Withdrawal',        desc: 'User payout request submitted',     nodeType: 'trigger' },
        { key: 'RAW_EVENTS',        icon: '📡', label: 'Raw Events',        desc: 'Listen to any raw custom event',    nodeType: 'trigger' },
        { key: 'JOIN_SEGMENT',      icon: '🎯', label: 'Join Segment',      desc: 'User enters a segment',             nodeType: 'trigger' },
        { key: 'LEAVE_SEGMENT',     icon: '🚪', label: 'Leave Segment',     desc: 'User exits a segment',              nodeType: 'trigger' },
        { key: 'SCHEDULE',          icon: '🕐', label: 'Schedule',          desc: 'Time-based or cron trigger',        nodeType: 'trigger' },
        { key: 'FIRST_DEPOSIT',     icon: '✨', label: 'First Deposit',     desc: 'First-time player funded',          nodeType: 'trigger' },
        { key: 'FIRST_STAKE',       icon: '🎯', label: 'First Stake',       desc: 'First sportsbook bet placed',       nodeType: 'trigger' },
        { key: 'FIRST_CASINO',      icon: '🎲', label: 'First Casino Bet',  desc: 'First casino round played',         nodeType: 'trigger' },
        { key: 'FIRST_WIN',         icon: '🔥', label: 'First Winning',     desc: 'First win of any kind',             nodeType: 'trigger' },
        { key: 'FIRST_CASINO_WIN',  icon: '🎉', label: 'First Casino Win',  desc: 'First casino round victory',        nodeType: 'trigger' },
        { key: 'FIRST_BET_LOSS',    icon: '📉', label: 'First Bet Loss',    desc: 'First sportsbook loss',             nodeType: 'trigger' },
        { key: 'FIRST_CASINO_LOSS', icon: '💔', label: 'First Casino Loss', desc: 'First casino round loss',           nodeType: 'trigger' },
    ],
    actions: [
        { key: 'novu_notification',    icon: '🔔', label: 'Novu Notification',    desc: 'Push / email / SMS via Novu',       nodeType: 'action' },
        { key: 'send_email',           icon: '✉️', label: 'Send Email',           desc: 'Deliver an email to the user',      nodeType: 'action' },
        { key: 'send_sms',             icon: '💬', label: 'Send SMS',             desc: 'Send a text message',               nodeType: 'action' },
        { key: 'send_push',            icon: '📲', label: 'Push Notification',    desc: 'Mobile push alert',                 nodeType: 'action' },
        { key: 'award_bonus',          icon: '🎁', label: 'Award Bonus',          desc: 'Credit bonus to user wallet',       nodeType: 'action' },
        { key: 'add_tag',              icon: '🏷️', label: 'Add Tag',              desc: 'Tag the user profile',              nodeType: 'action' },
        { key: 'update_attribute',     icon: '✏️', label: 'Update Attribute',     desc: 'Modify a user attribute',           nodeType: 'action' },
        { key: 'webhook',              icon: '🔗', label: 'Webhook',              desc: 'Call an external HTTP endpoint',    nodeType: 'action' },
        { key: 'add_to_segment',       icon: '➕', label: 'Add to Segment',       desc: 'Move user into a segment',          nodeType: 'action' },
        { key: 'remove_from_segment',  icon: '➖', label: 'Remove from Segment',  desc: 'Remove user from a segment',        nodeType: 'action' },
        { key: 'wait_delay',           icon: '⏳', label: 'Wait / Delay',         desc: 'Pause for a fixed duration',        nodeType: 'wait'   },
        { key: 'wait_event',           icon: '👀', label: 'Wait for Event',       desc: 'Pause until a specific event',      nodeType: 'wait'   },
    ]
};

/* ─────────────────────────────────────────────
   EDGE FACTORY  — single source of truth
───────────────────────────────────────────── */
const makeEdge = (sourceId, targetId) => ({
    id: uuidv7(),
    source: sourceId,
    target: targetId,
    type: 'default',
    animated: true,
    style: { stroke: '#38c66c', strokeWidth: 2, strokeDasharray: '6,4' },
    markerEnd: 'url(#arrowhead)'
});

/* ─────────────────────────────────────────────
   VUE APP
───────────────────────────────────────────── */
createApp({
    components: { VueFlow, Handle, Background },

    setup() {
        const {
            onConnect,
            fitView, zoomIn, zoomOut,
            getNodes, getEdges,
            project
        } = useVueFlow();

        /* ── Journey meta ──────────────────────────────────────── */
        const journeyName  = ref('High Roller Re-engagement');
        const isActive     = ref(false);
        const isPublished  = ref(false);
        const publishing   = ref(false);
        const journeyUuid  = ref(uuidv7());
        const triggerType  = ref('RAW_EVENTS');
        const triggerValue = ref('DEPOSIT_FAILED_HIGH_VALUE');

        /* ── SPLIT nodes / edges (fixes invisible-until-drag bug) ── */
        const nodes = ref([
            {
                id: 'root-placeholder',
                type: 'custom',
                position: { x: 300, y: 160 },
                data: {
                    label: 'Select Trigger',
                    desc: 'Click "Select Trigger" or pick from the sidebar',
                    isPlaceholder: true,
                    nodeType: 'placeholder'
                }
            }
        ]);

        const edges = ref([]);   // ← always separate, never mixed into nodes

        const nodeTypes = { custom: 'custom' };

        /* ── Sidebar state ─────────────────────────────────────── */
        const selectedNode   = ref(null);
        const sidebarSearch  = ref('');
        const activeTab      = ref('triggers');

        // pendingSourceId: set when user clicks +, cleared after sidebar pick
        const pendingSourceId = ref(null);

        const isCatalogView = computed(() =>
            !selectedNode.value || selectedNode.value.data.isPlaceholder
        );
        const sidebarTitle = computed(() =>
            isCatalogView.value ? 'Add a Step' : 'Edit Step'
        );

        /* ── Picker modal (kept for "Select Trigger" placeholder click) */
        const pickerOpen         = ref(false);
        const pickerSearch       = ref('');
        const pickerSourceNodeId = ref(null);
        const pickerInput        = ref(null);

        const openPicker = (sourceId = null) => {
            pickerSourceNodeId.value = sourceId;
            pickerSearch.value = '';
            pickerOpen.value = true;
            nextTick(() => pickerInput.value?.focus());
        };

        const filteredPicker = computed(() => {
            const q = pickerSearch.value.toLowerCase().trim();
            const f = arr => arr.filter(i =>
                !q ||
                i.label.toLowerCase().includes(q) ||
                i.key.toLowerCase().includes(q) ||
                i.desc.toLowerCase().includes(q)
            );
            return { triggers: f(CATALOG.triggers), actions: f(CATALOG.actions) };
        });

        /* ── Filtered sidebar catalog ──────────────────────────── */
        const filteredCatalog = computed(() => {
            const q = sidebarSearch.value.toLowerCase().trim();
            const f = arr => arr.filter(i =>
                !q ||
                i.label.toLowerCase().includes(q) ||
                i.key.toLowerCase().includes(q) ||
                i.desc.toLowerCase().includes(q)
            );
            return { triggers: f(CATALOG.triggers), actions: f(CATALOG.actions) };
        });

        const popularTriggers = computed(() => filteredCatalog.value.triggers.slice(0, 5));
        const allTriggers     = computed(() => filteredCatalog.value.triggers.slice(5));

        /* ── Payload preview ───────────────────────────────────── */
        const payloadJson = ref('');

        const previewPayload = () => {
            payloadJson.value = JSON.stringify(buildPayload(), null, 4);
            if (window.bootstrap) {
                new bootstrap.Modal(document.getElementById('payloadModal')).show();
            } else {
                alert(payloadJson.value);
            }
        };

        const copyPayload = () => {
            navigator.clipboard.writeText(payloadJson.value);
            showToast('Success', 'Payload copied to clipboard', 'success');
        };

        /* ── Node factory ──────────────────────────────────────── */
        const createNewNode = (item, pos) => ({
            id: uuidv7(),
            type: 'custom',
            position: pos,
            data: {
                ...item,
                uuid: uuidv7(),
                blueprint_id: uuidv7(),
                wait_event_name: '',
                config: { retry_attempts: 3, retry_interval_seconds: 300, timeout_seconds: 60 },
                metadata: {
                    description: item.desc,
                    owner: 'Marketing Team',
                    tags: [item.nodeType.toUpperCase()]
                },
                stats: {
                    total:   Math.floor(Math.random() * 5000),
                    success: Math.floor(Math.random() * 4500),
                    failed:  Math.floor(Math.random() * 500)
                }
            }
        });

        /* ── Vue Flow events ───────────────────────────────────── */
        const onNodeClick  = ({ node }) => {
            // if + was pending, clicking a node cancels the pending state
            pendingSourceId.value = null;
            selectedNode.value = node;
        };

        const onPaneClick  = () => {
            pendingSourceId.value = null;
            selectedNode.value = null;
        };

        // User drags handle → handle manually
        onConnect(params => {
            edges.value = [...edges.value, {
                ...makeEdge(params.source, params.target),
                ...params          // preserve sourceHandle / targetHandle
            }];
        });

        /* ── + button: set pending source, NO modal ────────────── */
        const setPendingSource = (id) => {
            pendingSourceId.value = id;
            selectedNode.value = null;   // close properties panel if open
            openPicker(id); // Open the picker modal when '+' is clicked
        };

        /* ── Core: add item from sidebar OR picker modal ───────── */
        const addFromPicker = (item) => {
            // close modal if it was open
            pickerOpen.value = false;

            // priority: pendingSourceId (from + button) > pickerSourceNodeId (from modal)
            const sourceId = pendingSourceId.value || pickerSourceNodeId.value;
            pendingSourceId.value   = null;
            pickerSourceNodeId.value = null;

            // ── Case 1: no source → replace root placeholder ────
            if (!sourceId) {
                const placeholder = nodes.value.find(n => n.data?.isPlaceholder);
                if (placeholder) {
                    const newNode = createNewNode(item, placeholder.position);
                    nodes.value = [newNode];
                    if (item.nodeType === 'trigger') triggerType.value = item.key;
                }
                return;
            }

            const sourceNode = nodes.value.find(n => n.id === sourceId);
            if (!sourceNode) return;

            // ── Case 2: source IS the placeholder → replace it ──
            if (sourceNode.data?.isPlaceholder) {
                const newNode = createNewNode(item, sourceNode.position);
                nodes.value = [newNode];
                edges.value = [];
                if (item.nodeType === 'trigger') triggerType.value = item.key;
                return;
            }

            // ── Case 3: real node → add below + connect ─────────
            const newNode = createNewNode(item, {
                x: sourceNode.position.x,
                y: sourceNode.position.y + 160
            });
            nodes.value = [...nodes.value, newNode];
            edges.value = [...edges.value, makeEdge(sourceId, newNode.id)];
        };

        /* ── Drag from sidebar → canvas ────────────────────────── */
        const onDragStart = (event, item) => {
            event.dataTransfer.setData('application/vueflow', JSON.stringify(item));
            event.dataTransfer.effectAllowed = 'move';
        };

        const onDrop = (event) => {
            const raw = event.dataTransfer.getData('application/vueflow');
            if (!raw) return;
            const item = JSON.parse(raw);

            const isFirstTrigger =
                nodes.value.length === 1 &&
                nodes.value[0].data.isPlaceholder &&
                item.nodeType === 'trigger';

            let pos = project({ x: event.clientX - 150, y: event.clientY - 50 });
            if (!pos || isNaN(pos.x)) pos = { x: 300, y: 300 };
            if (isFirstTrigger) pos = nodes.value[0].position;

            const newNode = createNewNode(item, pos);

            if (isFirstTrigger) {
                nodes.value = [newNode];
                edges.value = [];
                triggerType.value = item.key;
            } else {
                nodes.value = [...nodes.value, newNode];
                showToast('Hint', 'Drag handles to connect this step, or use the + button.', 'info');
            }
        };

        /* ── Drop item onto an unconfigured node ───────────────── */
        const onDropOnNode = (event, nodeId) => {
            event.preventDefault();
            event.stopPropagation();
            const raw = event.dataTransfer.getData('application/vueflow');
            if (!raw) return;
            const item = JSON.parse(raw);
            const idx  = nodes.value.findIndex(n => n.id === nodeId);
            if (idx === -1 || nodes.value[idx].data.key) return;   // only empty nodes
            const updated = { ...nodes.value[idx], data: createNewNode(item, nodes.value[idx].position).data };
            nodes.value = nodes.value.map((n, i) => i === idx ? updated : n);
            if (nodeId === nodes.value[0]?.id && item.nodeType === 'trigger') {
                triggerType.value = item.key;
            }
        };

        /* ── Remove node + its edges ───────────────────────────── */
        const removeNode = (id) => {
            nodes.value = nodes.value.filter(n => n.id !== id);
            edges.value = edges.value.filter(e => e.source !== id && e.target !== id);
            if (nodes.value.length === 0) {
                nodes.value = [{
                    id: 'root-placeholder', type: 'custom',
                    position: { x: 300, y: 160 },
                    data: { label: 'Select Trigger', desc: 'Pick from sidebar to start', isPlaceholder: true, nodeType: 'placeholder' }
                }];
            }
            selectedNode.value = null;
        };

        /* ── Reset ─────────────────────────────────────────────── */
        const resetFlow = () => {
            if (!confirm('Clear the entire journey and start over?')) return;
            nodes.value = [{
                id: 'root-placeholder', type: 'custom',
                position: { x: 300, y: 160 },
                data: { label: 'Select Trigger', desc: 'Pick from sidebar to start', isPlaceholder: true, nodeType: 'placeholder' }
            }];
            edges.value      = [];
            journeyUuid.value = uuidv7();
            selectedNode.value = null;
            pendingSourceId.value = null;
            isPublished.value = false;
        };

        /* ── Build payload ─────────────────────────────────────── */
        const buildPayload = () => {
            const flowNodes = nodes.value.filter(n => !n.data?.isPlaceholder);
            const flowEdges = edges.value;

            return {
                uuid:          journeyUuid.value,
                name:          journeyName.value.trim(),
                is_active:     isActive.value,
                trigger_type:  triggerType.value,
                trigger_Value: triggerValue.value,
                start_node:    flowNodes[0]?.data?.uuid || flowNodes[0]?.id || '',
                created:       new Date().toISOString(),
                nodes: flowNodes.map(n => ({
                    uuid:             n.data.uuid || n.id,
                    blueprint_id:     n.data.blueprint_id || uuidv7(),
                    plugin_key:       n.data.key,
                    type:             n.data.nodeType === 'trigger' ? 'TRIGGER' : 'ACTION',
                    wait_event_name:  n.data.wait_event_name || '',
                    config:           n.data.config || {},
                    metadata:         n.data.metadata || {},
                    created:          new Date().toISOString()
                })),
                edges: flowEdges.map(e => ({
                    uuid:            e.id || uuidv7(),
                    source:          flowNodes.find(n => n.id === e.source)?.data?.uuid || e.source,
                    target:          flowNodes.find(n => n.id === e.target)?.data?.uuid || e.target,
                    priority_number: 0
                }))
            };
        };

        /* ── Publish ───────────────────────────────────────────── */
        const publish = async () => {
            if (nodes.value.some(n => n.data?.isPlaceholder)) {
                showToast('Warning', 'Please select a starting trigger before publishing.', 'warning');
                return;
            }
            if (!journeyName.value.trim()) {
                showToast('Warning', 'Please enter a journey name.', 'warning');
                return;
            }
            publishing.value = true;
            try {
                const payload = buildPayload();
                payload.is_active = true;
                await apiRequest(`${API_BASE}/customer-journey`, 'POST', payload);
                isPublished.value = true;
                isActive.value    = true;
                showToast('Success', 'Journey published successfully!', 'success');
            } catch (err) {
                console.error('[Journey] Publish error:', err);
                showToast('Error', err.message, 'error');
            } finally {
                publishing.value = false;
            }
        };

        const submitToApi = () => publish();

        /* ── Toast ─────────────────────────────────────────────── */
        const showToast = (title, message, type = 'info') => {
            if (window.showToast) {
                window.showToast(title, message, type);
                return;
            }
            const id    = 'toast-' + Date.now();
            const color = type === 'success' ? 'bg-success'
                        : type === 'error'   ? 'bg-danger'
                        : type === 'warning' ? 'bg-warning'
                        : 'bg-info';
            document.body.insertAdjacentHTML('beforeend', `
                <div id="${id}" class="toast align-items-center text-white ${color} border-0 show position-fixed"
                     style="bottom:20px;right:20px;z-index:9999;min-width:260px" role="alert">
                    <div class="d-flex">
                        <div class="toast-body fw-semibold">${title}: ${message}</div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                onclick="document.getElementById('${id}').remove()"></button>
                    </div>
                </div>`);
            setTimeout(() => document.getElementById(id)?.remove(), 4000);
        };

        onMounted(() => console.log('[Journey] mounted.'));

        /* ── Expose to template ────────────────────────────────── */
        return {
            journeyName, isActive, isPublished, publishing,
            triggerType, triggerValue, journeyUuid,

            // ← split refs (v-model:nodes / v-model:edges in HTML)
            nodes, edges,
            nodeTypes, selectedNode,

            filteredCatalog, popularTriggers, allTriggers,
            sidebarSearch, activeTab,
            isCatalogView, sidebarTitle,

            // pendingSourceId for + button → sidebar flow
            pendingSourceId, setPendingSource,

            // picker modal (placeholder click only)
            pickerOpen, pickerSearch, filteredPicker, pickerInput,
            openPicker, addFromPicker,

            payloadJson, previewPayload, copyPayload, submitToApi,
            onNodeClick, onPaneClick, onDropOnNode,
            onDragStart, onDrop,
            removeNode, resetFlow,
            publish, buildPayload,
            zoomIn, zoomOut, fitView,
        };
    }
}).mount('#customerJourneyApp');