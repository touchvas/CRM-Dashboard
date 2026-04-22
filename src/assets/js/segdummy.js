/**
 * segment.js
 * Local dummy logic for Segmentation to replace API calls.
 * Works with window.contacts from dummydata.js
 */

(function() {
    // Helper to get segments from local storage
    const getLocalSegments = () => JSON.parse(localStorage.getItem('dummy_segments') || '[]');
    const saveLocalSegments = (segments) => localStorage.setItem('dummy_segments', JSON.stringify(segments));

    // Raw schema definition for filtering
    window.ContactFilterSchemaRaw = {
        dimensions: ['name', 'email', 'country', 'status', 'registered_at', 'last_active'],
        metrics: ['lifetime_deposits', 'lifetime_withdrawals', 'lifetime_bets', 'total_deposits', 'total_withdrawals', 'total_bets'] // Added for flexibility
    };

    window.getFieldLabel = (field) => {
        const labels = {
            'lifetime_deposits': 'Deposits',
            'lifetime_withdrawals': 'Withdrawals',
            'lifetime_bets': 'Total Bets',
            'last_active': 'Last Active'
        };
        return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    window.getOperatorLabel = (op) => {
        const ops = { 'eq': 'is', 'ne': 'is not', 'gt': '>', 'lt': '<', 'contains': 'contains', 'equals': 'is' };
        return ops[op] || op;
    };

    window.getSegmentSummary = (seg) => {
        if (seg.description) return seg.description;
        const rules = seg.criteria?.rules || [];
        if (rules.length === 0) return "No rules defined";
        const r = rules[0];
        const base = `${window.getFieldLabel(r.field || '')} ${window.getOperatorLabel(r.operator || '')} ${r.value || ''}`;
        const remaining = rules.length - 1;
        return remaining > 0 ? `${base} (+${remaining} more)` : base;
    };

    // Processes the raw schema into a usable format for the UI
    window.getProcessedFilterSchema = () => {
        const fields = [];
        const formatLabel = (s) => s.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();

        const response = window.ContactFilterSchemaRaw;

        if (response?.dimensions || response?.metrics) {
            (response.dimensions || []).forEach(d => fields.push({ field: d, label: formatLabel(d), type: 'string', operators: ['eq', 'ne', 'contains'] }));
            (response.metrics || []).forEach(m => fields.push({ field: m, label: formatLabel(m), type: 'number', operators: ['eq', 'gt', 'lt', 'gte', 'lte'] }));
        } else {
            // Fallback for older/different formats if needed
            const raw = typeof response?.data === 'string' ? response.data : JSON.stringify(response);
            const matches = Array.from(raw.matchAll(/\[(.*?)\]/g));
            if (matches[0]) matches[0][1].split(' ').filter(s => s).forEach(d => fields.push({ field: d, label: formatLabel(d), type: 'string', operators: ['eq', 'ne', 'contains'] }));
            if (matches[1]) matches[1][1].split(' ').filter(s => s).forEach(m => fields.push({ field: m, label: formatLabel(m), type: 'number', operators: ['eq', 'gt', 'lt'] }));
        }
        return fields;
    };

    // Dummy Analytics Query (Filtering local contacts) - Renamed for clarity
    // This was previously executeAnalyticsQueryDummy, now it's a general purpose filter
    window.filterPlayersByCriteria = async (criteria) => {
        console.log("Executing dummy query preview...", criteria);
        const { operator, rules } = criteria;
        const allContacts = window.players || [];

        const filtered = allContacts.filter(contact => {
            const results = rules.map(rule => {
                const val = contact[rule.field];
                const target = rule.value;
                if (val === undefined) return false; // If field doesn't exist on contact, it doesn't match

                switch (rule.operator) {
                    case 'eq':
                    case 'equals': return String(val).toLowerCase() === String(target).toLowerCase();
                    case 'ne': return String(val).toLowerCase() !== String(target).toLowerCase();
                    case 'contains': return String(val).toLowerCase().includes(String(target).toLowerCase());
                    case 'gt': return Number(val) > Number(target);
                    case 'lt': return Number(val) < Number(target);
                    case 'gte': return Number(val) >= Number(target);
                    case 'lte': return Number(val) <= Number(target);
                    default: return true;
                }
            });

            return operator === 'OR' ? results.some(r => r === true) : results.every(r => r === true);
        });

        return new Promise(resolve => {
            setTimeout(() => resolve({ status: 1, data: filtered }), 400);
        });
    };

    /**
     * Centralized logic to resolve players for a segment (static or dynamic)
     */
    window.getPlayersForSegment = async (segment) => {
        console.log("Resolving players for segment:", segment.name);
        
        // 1. Check nested players
        if (segment.players && segment.players.length > 0) return segment.players;

        // 2. Link from dummydata.js via segment_id or name
        if (window.players) {
            const found = window.players.filter(p => 
                String(p.segment_id) === String(segment.id) || 
                String(p.segment) === String(segment.name) ||
                String(p.segment_id) === String(segment.name)
            );
            if (found.length > 0) return found;
        }

        // 3. Dynamic Filtering Fallback
        if (segment.criteria) {
            const result = await window.filterPlayersByCriteria(segment.criteria);
            return result.data || [];
        }

        return [];
    };

    // Dummy Fetch Segments
    window.fetchSegmentsDummy = async () => {
        console.log("Fetching dummy segments...");
        return new Promise((resolve) => {
            const hardcoded = window.segments || []; // Using dummydata.js
            const local = getLocalSegments();
            setTimeout(() => resolve([...hardcoded, ...local]), 500);
        });
    };

    // Dummy Create Segment
    window.createSegmentDummy = async (name, description, refreshType, criteria) => {
        console.log("Creating dummy segment:", name);
        const segments = getLocalSegments();
        const newSegment = {
            id: 'seg_' + Date.now(),
            name,
            description,
            refresh_type: refreshType,
            criteria: criteria,
            created_at: new Date().toISOString()
        };
        segments.push(newSegment);
        saveLocalSegments(segments);
        return new Promise(resolve => setTimeout(() => resolve({ status: 1, data: newSegment }), 300));
    };

    console.log("segdummy.js: Logic and Helpers loaded.");
})();
