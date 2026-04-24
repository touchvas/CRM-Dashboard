/**
 * segdummy.js  v2
 * Local dummy logic for Segmentation.
 * Adds: rich field schema, word-label operators, nested group support.
 */

(function () {
    const getLocalSegments   = () => JSON.parse(localStorage.getItem('dummy_segments')  || '[]');
    const saveLocalSegments  = (s) => localStorage.setItem('dummy_segments', JSON.stringify(s));
    const getLocalFavoriteIds = () => JSON.parse(localStorage.getItem('dummy_favorite_segment_ids') || '[]');
    const saveLocalFavoriteIds = (ids) => localStorage.setItem('dummy_favorite_segment_ids', JSON.stringify(ids));

    // ── Field categories (drives the query builder UI) ────────────────────
    window.QBFieldCategories = [
        {
            label: '💰 Financial',
            fields: [
                { field: 'lifetime_deposits',    label: 'Total Deposits (KES)',    type: 'number', operators: 'numeric' },
                { field: 'lifetime_withdrawals', label: 'Total Withdrawals (KES)', type: 'number', operators: 'numeric' },
                { field: 'lifetime_bets',        label: 'Total Stake (KES)',       type: 'number', operators: 'numeric' },
                { field: 'deposit_count',        label: 'Deposit Count',           type: 'number', operators: 'numeric' },
                { field: 'avg_deposit',          label: 'Avg. Deposit (KES)',      type: 'number', operators: 'numeric' },
                { field: 'withdrawal_ratio',     label: 'Withdrawal / Deposit %',  type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '🏃 Player Profile',
            fields: [
                { field: 'status',        label: 'Player Status', type: 'enum', operators: 'enum',
                  values: ['active', 'dormant', 'suspended', 'blocked'] },
                { field: 'country',       label: 'Country',       type: 'enum', operators: 'enum',
                  values: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia'] },
                { field: 'name',          label: 'Player Name',   type: 'string', operators: 'string' },
                { field: 'email',         label: 'Email',         type: 'string', operators: 'string' },
                { field: 'registered_at', label: 'Registered Date', type: 'date', operators: 'date' },
                { field: 'last_active',   label: 'Last Active Date', type: 'date', operators: 'date' },
            ]
        },
        {
            label: '🎰 Casino',
            fields: [
                { field: 'casino_rounds',      label: 'Casino Rounds',         type: 'number', operators: 'numeric' },
                { field: 'casino_stake',       label: 'Casino Stake (KES)',    type: 'number', operators: 'numeric' },
                { field: 'casino_ggr',         label: 'Casino GGR (KES)',      type: 'number', operators: 'numeric' },
                { field: 'casino_avg_rtp_pct', label: 'Casino Avg. RTP %',     type: 'number', operators: 'numeric' },
                { field: 'casino_jackpot_wins',label: 'Jackpot Wins',          type: 'number', operators: 'numeric' },
                { field: 'casino_bonus_used',  label: 'Bonus Used (KES)',      type: 'number', operators: 'numeric' },
                { field: 'casino_slots_stake', label: 'Slots Stake (KES)',     type: 'number', operators: 'numeric' },
                { field: 'casino_live_stake',  label: 'Live Casino Stake (KES)',type: 'number', operators: 'numeric' },
                { field: 'casino_crash_stake', label: 'Crash Stake (KES)',     type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '⚽ Sportsbook',
            fields: [
                { field: 'sb_bets',        label: 'Sports Bet Count',      type: 'number', operators: 'numeric' },
                { field: 'sb_stake',       label: 'Sports Stake (KES)',    type: 'number', operators: 'numeric' },
                { field: 'sb_ggr',         label: 'Sports GGR (KES)',      type: 'number', operators: 'numeric' },
                { field: 'sb_win_count',   label: 'Sports Wins',           type: 'number', operators: 'numeric' },
                { field: 'sb_avg_odds',    label: 'Avg. Odds',             type: 'number', operators: 'numeric' },
                { field: 'sb_parlay_pct',  label: 'Parlay/Acca %',         type: 'number', operators: 'numeric' },
                { field: 'sb_epl_stake',   label: 'EPL Stake (KES)',       type: 'number', operators: 'numeric' },
                { field: 'sb_ucl_stake',   label: 'UCL Stake (KES)',       type: 'number', operators: 'numeric' },
                { field: 'sb_afcon_stake', label: 'AFCON Stake (KES)',     type: 'number', operators: 'numeric' },
                { field: 'sb_kpl_stake',   label: 'KPL Stake (KES)',       type: 'number', operators: 'numeric' },
                { field: 'sb_nba_stake',   label: 'NBA Stake (KES)',       type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '📊 Behaviour',
            fields: [
                { field: 'total_ggr',          label: 'Total GGR (KES)',       type: 'number', operators: 'numeric' },
                { field: 'new_players',        label: 'Is New Player',         type: 'enum',   operators: 'enum',
                  values: ['Yes', 'No'] },
                { field: 'churned_players',    label: 'Is Churned',            type: 'enum',   operators: 'enum',
                  values: ['Yes', 'No'] },
                { field: 'reactivated_players',label: 'Was Reactivated',       type: 'enum',   operators: 'enum',
                  values: ['Yes', 'No'] },
                { field: 'deposit_count',      label: 'Deposit Transactions',  type: 'number', operators: 'numeric' },
                { field: 'failed_deposits',    label: 'Failed Deposits',       type: 'number', operators: 'numeric' },
                { field: 'sb_cashout_count',   label: 'Cashout Count',         type: 'number', operators: 'numeric' },
            ]
        }
    ];

    // ── Operator sets (value → display label) ────────────────────────────
    window.QBOperatorSets = {
        numeric: [
            { value: 'eq',  label: 'equals' },
            { value: 'ne',  label: 'does not equal' },
            { value: 'gt',  label: 'greater than' },
            { value: 'gte', label: 'greater than or equal to' },
            { value: 'lt',  label: 'less than' },
            { value: 'lte', label: 'less than or equal to' },
            { value: 'between', label: 'is between' },
        ],
        string: [
            { value: 'eq',       label: 'equals' },
            { value: 'ne',       label: 'does not equal' },
            { value: 'contains', label: 'contains' },
            { value: 'starts',   label: 'starts with' },
            { value: 'ends',     label: 'ends with' },
        ],
        enum: [
            { value: 'eq', label: 'is' },
            { value: 'ne', label: 'is not' },
        ],
        date: [
            { value: 'eq',     label: 'is on' },
            { value: 'gt',     label: 'is after' },
            { value: 'gte',    label: 'is on or after' },
            { value: 'lt',     label: 'is before' },
            { value: 'lte',    label: 'is on or before' },
            { value: 'between',label: 'is between' },
        ],
    };

    // ── Helpers exposed to Vue templates ─────────────────────────────────

    /** Returns flat list of all field configs */
    window.getAllFields = () =>
        window.QBFieldCategories.flatMap(c => c.fields);

    /** Finds one field config by field key */
    window.getFieldConfig = (fieldKey) =>
        window.getAllFields().find(f => f.field === fieldKey) || null;

    /** Returns operator options array for a field key */
    window.getOperatorsForField = (fieldKey) => {
        const cfg = window.getFieldConfig(fieldKey);
        if (!cfg) return [];
        return window.QBOperatorSets[cfg.operators] || [];
    };

    window.getFieldLabel = (field) => {
        const cfg = window.getFieldConfig(field);
        return cfg?.label || field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    window.getOperatorLabel = (op) => {
        const all = Object.values(window.QBOperatorSets).flat();
        return all.find(o => o.value === op)?.label || op;
    };

    window.getSegmentSummary = (seg) => {
        if (seg.description) return seg.description;
        const rules = seg.criteria?.rules || [];
        if (!rules.length) return 'No rules defined';
        const r = rules[0];
        if (r._type === 'group') return `Group: ${r.rules?.length || 0} rules`;
        const base = `${window.getFieldLabel(r.field || '')} ${window.getOperatorLabel(r.operator || '')} ${r.value ?? ''}`;
        const remaining = rules.length - 1;
        return remaining > 0 ? `${base} (+${remaining} more)` : base;
    };

    // ── Flat field list for backward-compat (getProcessedFilterSchema) ────
    window.getProcessedFilterSchema = () => window.getAllFields();

    // ── Filter engine (supports flat rules + nested groups) ───────────────
    const evaluateRule = (player, rule) => {
        const val = player[rule.field];
        const target = rule.value;
        if (val === undefined || val === null) return false;

        switch (rule.operator) {
            case 'eq':       return String(val).toLowerCase() === String(target).toLowerCase();
            case 'ne':       return String(val).toLowerCase() !== String(target).toLowerCase();
            case 'contains': return String(val).toLowerCase().includes(String(target).toLowerCase());
            case 'starts':   return String(val).toLowerCase().startsWith(String(target).toLowerCase());
            case 'ends':     return String(val).toLowerCase().endsWith(String(target).toLowerCase());
            case 'gt':       return Number(val) >  Number(target);
            case 'gte':      return Number(val) >= Number(target);
            case 'lt':       return Number(val) <  Number(target);
            case 'lte':      return Number(val) <= Number(target);
            case 'between': {
                const [lo, hi] = String(target).split(',').map(Number);
                return Number(val) >= lo && Number(val) <= hi;
            }
            default: return true;
        }
    };

    const evaluateGroup = (player, group) => {
        const results = (group.rules || []).map(item => {
            if (item._type === 'group') return evaluateGroup(player, item);
            return evaluateRule(player, item);
        });
        return group.operator === 'OR'
            ? results.some(Boolean)
            : results.every(Boolean);
    };

    window.filterPlayersByCriteria = async (criteria) => {
        const allPlayers = window.players || [];
        const filtered = allPlayers.filter(p => evaluateGroup(p, criteria));
        return new Promise(resolve =>
            setTimeout(() => resolve({ status: 1, data: filtered }), 200)
        );
    };

    // ── Player resolver ───────────────────────────────────────────────────
    window.getPlayersForSegment = async (segment) => {
        if (segment.players?.length) return segment.players;
        if (window.players) {
            const found = window.players.filter(p =>
                String(p.segment_id) === String(segment.id) ||
                String(p.segment)    === String(segment.name)
            );
            if (found.length) return found;
        }
        if (segment.criteria) {
            const result = await window.filterPlayersByCriteria(segment.criteria);
            return result.data || [];
        }
        return [];
    };

    // ── Favorite toggle ───────────────────────────────────────────────────
    window.toggleSegmentFavoriteDummy = async (segmentId) => {
        const hardcoded = window.segments || [];
        const local = getLocalSegments();
        let favoriteIds = getLocalFavoriteIds();
        const seg = [...hardcoded, ...local].find(s => String(s.id) === String(segmentId));
        if (seg) {
            seg.is_favorite = !seg.is_favorite;
            if (seg.is_favorite) {
                if (!favoriteIds.includes(segmentId)) favoriteIds.push(segmentId);
            } else {
                favoriteIds = favoriteIds.filter(id => String(id) !== String(segmentId));
            }
            saveLocalFavoriteIds(favoriteIds);
            const localIdx = local.findIndex(s => String(s.id) === String(segmentId));
            if (localIdx !== -1) { local[localIdx].is_favorite = seg.is_favorite; saveLocalSegments(local); }
        }
    };

    // ── Fetch all segments ────────────────────────────────────────────────
    window.fetchSegmentsDummy = async () => {
        return new Promise(resolve => {
            const hardcoded   = window.segments || [];
            const local       = getLocalSegments();
            const favoriteIds = getLocalFavoriteIds();
            const allSegments = [...hardcoded, ...local].map(seg => ({
                ...seg,
                is_favorite: favoriteIds.includes(seg.id) ? true : (seg.is_favorite || false)
            }));
            setTimeout(() => resolve(allSegments), 300);
        });
    };

    // ── Create segment ────────────────────────────────────────────────────
    window.createSegmentDummy = async (name, description, refreshType, criteria) => {
        const segments = getLocalSegments();
        const newSegment = {
            id: 'seg_' + Date.now(),
            name, description,
            refresh_type: refreshType,
            criteria,
            created_at: new Date().toISOString(),
            is_favorite: false,
        };
        segments.push(newSegment);
        saveLocalSegments(segments);
        return new Promise(resolve =>
            setTimeout(() => resolve({ status: 1, data: newSegment }), 200)
        );
    };

    console.log('segdummy.js v2: loaded — %d field categories, %d total fields',
        window.QBFieldCategories.length,
        window.getAllFields().length
    );
})();