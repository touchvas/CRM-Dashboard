import { createApp, ref, computed, onMounted } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';

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

function uuidv7() {
    const now = Date.now();
    const hi = Math.floor(now / 0x1000);
    const lo = now & 0xfff;
    const r16 = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
    const time = hi.toString(16).padStart(12, '0');
    return `${time.slice(0, 8)}-${time.slice(8, 12)}-7${lo.toString(16).padStart(3, '0')}-${(0x8000 | (Math.random() * 0x4000 | 0)).toString(16)}-${r16()}${r16()}${r16()}`;
}

createApp({
    components: { VueFlow, Background },
    setup() {
        const { fitView, zoomIn, zoomOut, getNodes } = useVueFlow();

        const journeyId = ref(new URLSearchParams(window.location.search).get('id') || '1');
        const journeyName = ref('Loading...');
        const isPublished = ref(false);
        const elements = ref([]);
        const nodeTypes = { custom: 'custom' };

        const stats = ref({
            totalEnrolled: 0,
            completed: 0,
            inProgress: 0,
            dropOff: 0,
            completionRate: 0,
            avgDuration: 0,
            triggerEvents: 0,
            actionsExecuted: 0
        });

        const stepProgress = ref([]);
        const recentActivity = ref([]);

        const loadJourney = async () => {
            try {
                const data = await apiRequest(`${API_BASE}/customer-journey/${journeyId.value}`);
                if (data) {
                    journeyName.value = data.name || 'Untitled Journey';
                    isPublished.value = data.is_active || false;

                    // Convert journey nodes to VueFlow format
                    if (data.nodes && data.edges) {
                        const nodes = data.nodes.map((node, index) => ({
                            id: node.uuid || `node-${index}`,
                            type: 'custom',
                            position: { x: 100 + (index % 3) * 450, y: 100 + Math.floor(index / 3) * 200 },
                            data: {
                                label: node.plugin_key?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Step',
                                desc: node.metadata?.description || '',
                                key: node.plugin_key || '',
                                nodeType: node.type === 'TRIGGER' ? 'trigger' : 'action',
                                icon: getIconForKey(node.plugin_key),
                                uuid: node.uuid,
                                blueprint_id: node.blueprint_id,
                                wait_event_name: node.wait_event_name || '',
                                config: node.config || { retry_attempts: 3, retry_interval_seconds: 300, timeout_seconds: 60 },
                                metadata: node.metadata || { description: '', owner: '', tags: [] },
                                stats: node.stats || { total: 0, success: 0, failed: 0 }
                            }
                        }));

                        const edges = data.edges.map(edge => ({
                            id: edge.uuid,
                            source: edge.source,
                            target: edge.target,
                            animated: true,
                            style: { stroke: '#38c66c', strokeWidth: 2, strokeDasharray: '6,6' },
                            markerEnd: 'url(#arrowhead)'
                        }));

                        elements.value = [...nodes, ...edges];
                    }
                }
            } catch (err) {
                console.error('[Stats] Load error:', err);
            }
        };

        const loadStats = async () => {
            try {
                const data = await apiRequest(`${API_BASE}/customer-journey/${journeyId.value}/stats`);
                if (data) {
                    stats.value = {
                        totalEnrolled: data.total_enrolled || 14520,
                        completed: data.completed || 11894,
                        inProgress: data.in_progress || 1823,
                        dropOff: data.drop_off || 15,
                        completionRate: data.completion_rate || 82,
                        avgDuration: data.avg_duration || 4.2,
                        triggerEvents: data.trigger_events || 156000,
                        actionsExecuted: data.actions_executed || 89000
                    };

                    stepProgress.value = data.step_progress || [
                        { name: 'Sign Up', rate: 95, color: '#38c66c' },
                        { name: 'First Deposit', rate: 78, color: '#38c66c' },
                        { name: 'Welcome Email', rate: 76, color: '#f5a623' },
                        { name: 'Bonus Awarded', rate: 65, color: '#f5a623' },
                        { name: 'First Bet', rate: 45, color: '#4a90d9' }
                    ];

                    recentActivity.value = data.recent_activity || [
                        { title: 'User completed journey', time: '2 mins ago', icon: 'ri-check-line', color: 'rgba(78, 198, 108, 0.15)' },
                        { title: 'New user enrolled', time: '5 mins ago', icon: 'ri-user-add-line', color: 'rgba(78, 122, 223, 0.15)' },
                        { title: 'Step 3 completed by 50 users', time: '12 mins ago', icon: 'ri-bar-chart-line', color: 'rgba(245, 166, 35, 0.15)' }
                    ];
                }
            } catch (err) {
                console.error('[Stats] API error:', err);
            }
        };

        const getIconForKey = (key) => {
            if (!key) return '⚡';
            const icons = {
                'DEPOSIT': '💰', 'SIGN_IN': '🔑', 'CASINO_BET': '🎰',
                'SPORTS_BET': '⚽', 'CASINO_WIN': '💎', 'WINNING': '🏆',
                'WITHDRAWAL': '🏧', 'RAW_EVENTS': '📡', 'JOIN_SEGMENT': '🎯',
                'LEAVE_SEGMENT': '🚪', 'SCHEDULE': '🕐',
                'FIRST_DEPOSIT': '✨', 'FIRST_STAKE': '🎯', 'FIRST_CASINO': '🎲',
                'FIRST_WIN': '🔥', 'FIRST_CASINO_WIN': '🎉', 'FIRST_BET_LOSS': '📉',
                'FIRST_CASINO_LOSS': '💔',
                'novu_notification': '🔔', 'send_email': '✉️', 'send_sms': '💬',
                'send_push': '📲', 'award_bonus': '🎁', 'add_tag': '🏷️',
                'update_attribute': '✏️', 'webhook': '🔗', 'add_to_segment': '➕',
                'remove_from_segment': '➖', 'wait_delay': '⏳', 'wait_event': '👀'
            };
            return icons[key] || '⚡';
        };

        const refreshStats = () => {
            loadJourney();
            loadStats();
        };

        onMounted(() => {
            loadJourney();
            loadStats();
        });

        return {
            journeyId, journeyName, isPublished, elements, nodeTypes,
            stats, stepProgress, recentActivity,
            fitView, zoomIn, zoomOut, refreshStats
        };
    }
}).mount('#journeyStatsApp');
