const { createApp, ref, computed } = Vue;
const { VueFlow, useVueFlow, Handle, Background } = VueFlowCore;

createApp({
    components: { VueFlow, Handle, Background },
    setup() {
        const { onConnect, addEdges, addNodes, toObject, fitView, zoomIn, zoomOut, findNode } = useVueFlow();

        const journeyName = ref('Engagement Flow #12');
        
        // Starting State: EXACTLY ONE Placeholder
        const elements = ref([
            { 
                id: 'root-placeholder', 
                type: 'custom', 
                position: { x: 300, y: 150 }, 
                data: { 
                    label: 'Select Trigger', 
                    isPlaceholder: true,
                    nodeType: 'placeholder' 
                } 
            }
        ]);

        const nodeTypes = { custom: 'custom' };
        const selectedNode = ref(null);

        // Betting & CRM Specific Catalog (Updated)
        const catalog = {
            triggers: [
                { key: 'DEPOSIT', icon: '💰', label: 'Deposit', desc: 'Any successful payment', nodeType: 'trigger' },
                { key: 'SIGN_IN', icon: '🔑', label: 'Sign In', desc: 'User authentication', nodeType: 'trigger' },
                { key: 'CASINO_BET', icon: '🎰', label: 'Casino', desc: 'Any casino game stake', nodeType: 'trigger' },
                { key: 'SPORTS_BET', icon: '⚽', label: 'Sports', desc: 'Any sportsbook stake', nodeType: 'trigger' },
                { key: 'CASINO_WIN', icon: '💎', label: 'Casino Win', desc: 'User won a casino round', nodeType: 'trigger' },
                { key: 'WINNING', icon: '🏆', label: 'Winning', desc: 'Any winning event', nodeType: 'trigger' },
                { key: 'LOGIN', icon: '🚪', label: 'Login', desc: 'User session started', nodeType: 'trigger' },
                { key: 'WITHDRAWAL', icon: '🏧', label: 'Withdrawal', desc: 'User payout request', nodeType: 'trigger' },
                { key: 'FIRST_DEPOSIT', icon: '✨', label: 'First Deposit', desc: 'First time player funded', nodeType: 'trigger' },
                { key: 'FIRST_STAKE', icon: '🎯', label: 'First Stake', desc: 'First sportsbook bet', nodeType: 'trigger' },
                { key: 'FIRST_CASINO', icon: '🎲', label: 'First Casino Bet', desc: 'First casino round played', nodeType: 'trigger' },
                { key: 'FIRST_WIN', icon: '🔥', label: 'First Winning', desc: 'First win of any kind', nodeType: 'trigger' },
                { key: 'FIRST_CASINO_WIN', icon: '🎉', label: 'First Casino Win', desc: 'First casino victory', nodeType: 'trigger' },
                { key: 'FIRST_BET_LOSS', icon: '📉', label: 'First Bet Loss', desc: 'First sportsbook loss', nodeType: 'trigger' },
                { key: 'FIRST_CASINO_LOSS', icon: '💔', label: 'First Casino Loss', desc: 'First casino round loss', nodeType: 'trigger' }
            ],
            actions: [
                { key: 'AWARD_BONUS', icon: '🎁', label: 'Award Bonus', desc: 'Credit bonus wallet', nodeType: 'action' },
                { key: 'SEND_NOTIF', icon: '🔔', label: 'Send Notif', desc: 'Push notification or SMS', nodeType: 'action' },
                { key: 'WAIT_TIMER', icon: '⏳', label: 'Wait Timer', desc: 'Pause for specific duration', nodeType: 'wait' },
                { key: 'WAIT_EVENT', icon: '👀', label: 'Wait for Event', desc: 'Pause until event (e.g. Deposit)', nodeType: 'wait' }
            ]
        };

        const onNodeClick = ({ node }) => { selectedNode.value = node; };
        const onPaneClick = () => { selectedNode.value = null; };
        const onConnectHandler = (params) => { addEdges([params]); };

        const onDragStart = (event, item) => {
            event.dataTransfer.setData('application/vueflow', JSON.stringify(item));
            event.dataTransfer.effectAllowed = 'move';
        };

        const onDrop = (event) => {
            const rawData = event.dataTransfer.getData('application/vueflow');
            if (!rawData) return;
            
            const data = JSON.parse(rawData);
            const position = { x: event.offsetX, y: event.offsetY };
            
            // Interaction Rule: Drop on placeholder replaces it
            if (elements.value.length === 1 && elements.value[0].data.isPlaceholder && data.nodeType === 'trigger') {
                elements.value = [{
                    id: 'node-' + Date.now(),
                    type: 'custom',
                    position: elements.value[0].position,
                    data: { ...data }
                }];
            } else {
                addNodes([{
                    id: 'node-' + Date.now(),
                    type: 'custom',
                    position,
                    data: { ...data }
                }]);
            }
        };

        const removeNode = (id) => {
            elements.value = elements.value.filter(el => el.id !== id && el.source !== id && el.target !== id);
            if (elements.value.length === 0) {
                elements.value = [{ 
                    id: 'root-placeholder', 
                    type: 'custom', 
                    position: { x: 300, y: 150 }, 
                    data: { label: 'Select Trigger', isPlaceholder: true, nodeType: 'placeholder' } 
                }];
            }
            selectedNode.value = null;
        };

        const resetFlow = () => {
            if (confirm('Clear entire journey and start over?')) {
                elements.value = [{ 
                    id: 'root-placeholder', 
                    type: 'custom', 
                    position: { x: 300, y: 150 }, 
                    data: { label: 'Select Trigger', isPlaceholder: true, nodeType: 'placeholder' } 
                }];
            }
        };

        const publish = () => {
            if (elements.value.some(e => e.data.isPlaceholder)) {
                alert('Please select a starting trigger before publishing!');
                return;
            }
            alert('Journey published successfully!');
        };

        onConnect(onConnectHandler);

        return {
            journeyName, elements, nodeTypes, selectedNode, catalog,
            onNodeClick, onPaneClick, onDragStart, onDrop, removeNode, resetFlow,
            zoomIn, zoomOut, fitView, publish
        };
    }
}).mount('#customerJourneyApp');
