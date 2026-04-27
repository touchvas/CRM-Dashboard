/**
 * segdummy.js  v3 (Consolidated)
 * 
 * This file now contains BOTH the raw dummy data (players, segments, KPIs)
 * and the mock service logic (filtering, local storage, API simulation).
 */

(function () {
    // ============================================================
    // ─── UTILS ──────────────────────────────────────────────────
    // ============================================================
    const FAV_KEY = 'imarabet_fav_segments';
    const getLocalFavoriteIds = () => JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    const saveLocalFavoriteIds = (ids) => localStorage.setItem(FAV_KEY, JSON.stringify(ids));

    const SEG_KEY = 'imarabet_local_segments';
    const getLocalSegments = () => JSON.parse(localStorage.getItem(SEG_KEY) || '[]');
    const saveLocalSegments = (segs) => localStorage.setItem(SEG_KEY, JSON.stringify(segs));

    window.fmtShort = (n) => {
        if (!n && n !== 0) return '0';
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toString();
    };

    // ============================================================
    // ─── RAW DATA ───────────────────────────────────────────────
    // ============================================================

    // --- PLAYERS (Abbreviated for brevity, full set in original dummydata.js) ---
    window.players = [
        {
            id: "p01", name: "Amina Hassan", email: "amina@gmail.com",
            country: "Kenya", status: "active", segment_id: "seg1",
            registered_at: "2023-03-15", last_active: "2026-01-28",
            lifetime_deposits: 95000, lifetime_withdrawals: 42000, lifetime_bets: 138000,
            deposit_count: 62, avg_deposit: 1532, withdrawal_ratio: 44,
            failed_deposits: 3, casino_rounds: 820, casino_stake: 38000, casino_ggr: 2660,
            casino_slots_stake: 12000, casino_live_stake: 20000, casino_crash_stake: 6000,
            casino_avg_rtp_pct: 93, casino_jackpot_wins: 1, casino_bonus_used: 3200,
            sb_bets: 310, sb_stake: 57000, sb_ggr: 6840,
            sb_win_count: 124, sb_avg_odds: 2.10, sb_parlay_pct: 18, sb_cashout_count: 14,
            sb_epl_stake: 22000, sb_ucl_stake: 9000, sb_afcon_stake: 3500,
            sb_kpl_stake: 1800, sb_nba_stake: 2800,
            total_ggr: 9500, churned_players: "No", reactivated_players: "No", new_players: "No",
        },
        {
            id: "p02", name: "Brian Otieno", email: "brian@yahoo.com",
            country: "Kenya", status: "active", segment_id: "seg2",
            registered_at: "2024-06-20", last_active: "2026-01-30",
            lifetime_deposits: 18500, lifetime_withdrawals: 6200, lifetime_bets: 24000,
            deposit_count: 28, avg_deposit: 661, withdrawal_ratio: 33,
            failed_deposits: 2, casino_rounds: 220, casino_stake: 8500, casino_ggr: 595,
            casino_slots_stake: 3000, casino_live_stake: 3500, casino_crash_stake: 2000,
            casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 900,
            sb_bets: 88, sb_stake: 12000, sb_ggr: 1440,
            sb_win_count: 35, sb_avg_odds: 1.88, sb_parlay_pct: 12, sb_cashout_count: 5,
            sb_epl_stake: 4500, sb_ucl_stake: 1800, sb_afcon_stake: 700,
            sb_kpl_stake: 400, sb_nba_stake: 900,
            total_ggr: 2035, churned_players: "No", reactivated_players: "No", new_players: "No",
        },
        {
            id: "p03", name: "Sarah Kimani", email: "sarah@company.com",
            country: "Kenya", status: "active", segment_id: "seg1",
            registered_at: "2022-11-04", last_active: "2026-01-25",
            lifetime_deposits: 210000, lifetime_withdrawals: 95000, lifetime_bets: 315000,
            deposit_count: 140, avg_deposit: 1500, withdrawal_ratio: 45,
            failed_deposits: 6, casino_rounds: 1850, casino_stake: 92000, casino_ggr: 6440,
            casino_slots_stake: 28000, casino_live_stake: 48000, casino_crash_stake: 16000,
            casino_avg_rtp_pct: 93, casino_jackpot_wins: 3, casino_bonus_used: 8500,
            sb_bets: 680, sb_stake: 125000, sb_ggr: 15000,
            sb_win_count: 270, sb_avg_odds: 2.15, sb_parlay_pct: 22, sb_cashout_count: 32,
            sb_epl_stake: 48000, sb_ucl_stake: 22000, sb_afcon_stake: 8000,
            sb_kpl_stake: 4000, sb_nba_stake: 7000,
            total_ggr: 21440, churned_players: "No", reactivated_players: "No", new_players: "No",
        },
        // ... (Adding more samples to ensure filters work well)
        {
            id: "p04", name: "James Mwangi", email: "james@gmail.com",
            country: "Uganda", status: "active", segment_id: "seg3",
            registered_at: "2023-08-10", last_active: "2026-01-29",
            lifetime_deposits: 42000, lifetime_withdrawals: 19500, lifetime_bets: 58000,
            deposit_count: 38, avg_deposit: 1105, withdrawal_ratio: 46,
            failed_deposits: 2, casino_rounds: 420, casino_stake: 18000, casino_ggr: 1260,
            casino_slots_stake: 5000, casino_live_stake: 9000, casino_crash_stake: 4000,
            casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 1800,
            sb_bets: 195, sb_stake: 32000, sb_ggr: 3840,
            sb_win_count: 78, sb_avg_odds: 1.95, sb_parlay_pct: 14, sb_cashout_count: 8,
            sb_epl_stake: 12000, sb_ucl_stake: 5500, sb_afcon_stake: 2200,
            sb_kpl_stake: 1100, sb_nba_stake: 2000,
            total_ggr: 5100, churned_players: "No", reactivated_players: "No", new_players: "No",
        },
        {
            id: "p05", name: "Lucy Wanjiru", email: "lucy@startup.io",
            country: "Kenya", status: "active", segment_id: "seg1",
            registered_at: "2021-05-22", last_active: "2026-01-31",
            lifetime_deposits: 540000, lifetime_withdrawals: 210000, lifetime_bets: 820000,
            deposit_count: 310, avg_deposit: 1742, withdrawal_ratio: 39,
            failed_deposits: 11, casino_rounds: 4800, casino_stake: 245000, casino_ggr: 17150,
            casino_slots_stake: 72000, casino_live_stake: 130000, casino_crash_stake: 43000,
            casino_avg_rtp_pct: 93, casino_jackpot_wins: 8, casino_bonus_used: 22000,
            sb_bets: 1650, sb_stake: 320000, sb_ggr: 38400,
            sb_win_count: 640, sb_avg_odds: 2.22, sb_parlay_pct: 28, sb_cashout_count: 75,
            sb_epl_stake: 120000, sb_ucl_stake: 55000, sb_afcon_stake: 20000,
            sb_kpl_stake: 10000, sb_nba_stake: 18000,
            total_ggr: 55550, churned_players: "No", reactivated_players: "No", new_players: "No",
        }
    ];

    // --- SEGMENTS (Initial hardcoded set) ---
    window.segments = [
        {
            id: "seg1", name: "High Rollers", color: "#f59e0b", is_favorite: true,
            description: "VIP players with lifetime deposits above KES 80,000.",
            total_players: 5, total_deposits: 1108000, total_bets: 1653000,
            criteria: { operator: "AND", rules: [{ field: "lifetime_deposits", operator: "gt", value: "80000" }] },
            monthly_trend: [
                { month: "Aug 25", players: 4, deposits: 72000, total_ggr: 10460, sb_stake: 58000, casino_stake: 50000 },
                { month: "Sep 25", players: 4, deposits: 88000, total_ggr: 12840, sb_stake: 72000, casino_stake: 60000 },
                { month: "Oct 25", players: 4, deposits: 95000, total_ggr: 14250, sb_stake: 82000, casino_stake: 63000 },
                { month: "Nov 25", players: 5, deposits: 110000, total_ggr: 16660, sb_stake: 98000, casino_stake: 70000 },
                { month: "Dec 25", players: 5, deposits: 134000, total_ggr: 20600, sb_stake: 125000, casino_stake: 80000 },
                { month: "Jan 26", players: 5, deposits: 148000, total_ggr: 22750, sb_stake: 140000, casino_stake: 85000 }
            ],
            casino_stats: [
                { game: "Lightning Roulette", bets: 520000 },
                { game: "Sweet Bonanza", bets: 480000 },
                { game: "Crazy Time", bets: 350000 },
                { game: "Aviator", bets: 200000 },
                { game: "Live Blackjack", bets: 103000 }
            ]
        },
        {
            id: "seg2", name: "Casual Players", color: "#6366f1", is_favorite: true,
            description: "Regular players with moderate activity. KES 5k–80k deposits.",
            total_players: 7, total_deposits: 142300, total_bets: 195500,
            criteria: { operator: "AND", rules: [{ field: "lifetime_deposits", operator: "between", value: "5000,80000" }] },
            monthly_trend: [
                { month: "Aug 25", players: 5, deposits: 15000, total_ggr: 2070, sb_stake: 12000, casino_stake: 9000 },
                { month: "Sep 25", players: 6, deposits: 18500, total_ggr: 2545, sb_stake: 14500, casino_stake: 11500 },
                { month: "Oct 25", players: 6, deposits: 21000, total_ggr: 2950, sb_stake: 17000, casino_stake: 13000 },
                { month: "Nov 25", players: 7, deposits: 25000, total_ggr: 3485, sb_stake: 20000, casino_stake: 15500 },
                { month: "Dec 25", players: 7, deposits: 28000, total_ggr: 3950, sb_stake: 23000, casino_stake: 17000 },
                { month: "Jan 26", players: 7, deposits: 32000, total_ggr: 4485, sb_stake: 26000, casino_stake: 19500 }
            ]
        }
    ];

    window.casinoByGame = [
        { game: "Aviator", game_type: "crash", total_rounds: 6, total_staked: 3050, total_paid_out: 4465, ggr: -1415, rtp_pct: 146.4 },
        { game: "Sweet Bonanza", game_type: "slots", total_rounds: 4, total_staked: 3200, total_paid_out: 4600, ggr: -1400, rtp_pct: 143.8 },
        { game: "Book of Dead", game_type: "slots", total_rounds: 2, total_staked: 3000, total_paid_out: 4500, ggr: -1500, rtp_pct: 150.0 }
    ];

    window.sportsbookByTournament = [
        { tournament: "EPL", sport: "Football", total_bets: 312, total_staked: 184000, ggr: 22080 },
        { tournament: "La Liga", sport: "Football", total_bets: 198, total_staked: 96000, ggr: 11520 },
        { tournament: "UCL", sport: "Football", total_bets: 165, total_staked: 78000, ggr: 9360 }
    ];

    window.platformKPIs = {
        total_players: 18, active_players: 12, dormant_players: 6,
        total_deposits_alltime: 1276700, total_withdrawals_alltime: 503400,
        total_ggr: 198600, top_country: "Kenya", top_sport: "Football"
    };

    // ============================================================
    // ─── MOCK SERVICE LOGIC ─────────────────────────────────────
    // ============================================================

    window.QBFieldCategories = [
        {
            label: '💰 Financial',
            fields: [
                { field: 'lifetime_deposits', label: 'Total Deposits (KES)', type: 'number', operators: 'numeric' },
                { field: 'lifetime_withdrawals', label: 'Total Withdrawals (KES)', type: 'number', operators: 'numeric' },
                { field: 'lifetime_bets', label: 'Total Stake (KES)', type: 'number', operators: 'numeric' },
                { field: 'deposit_count', label: 'Deposit Count', type: 'number', operators: 'numeric' },
                { field: 'avg_deposit', label: 'Avg. Deposit (KES)', type: 'number', operators: 'numeric' },
                { field: 'withdrawal_ratio', label: 'Withdrawal / Deposit %', type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '🏃 Player Profile',
            fields: [
                {
                    field: 'status', label: 'Player Status', type: 'enum', operators: 'enum',
                    values: ['active', 'dormant', 'suspended', 'blocked']
                },
                {
                    field: 'country', label: 'Country', type: 'enum', operators: 'enum',
                    values: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia']
                },
                { field: 'name', label: 'Player Name', type: 'string', operators: 'string' },
                { field: 'email', label: 'Email', type: 'string', operators: 'string' },
                { field: 'registered_at', label: 'Registered Date', type: 'date', operators: 'date' },
                { field: 'last_active', label: 'Last Active Date', type: 'date', operators: 'date' },
            ]
        },
        {
            label: '🎰 Casino',
            fields: [
                { field: 'casino_rounds', label: 'Casino Rounds', type: 'number', operators: 'numeric' },
                { field: 'casino_stake', label: 'Casino Stake (KES)', type: 'number', operators: 'numeric' },
                { field: 'casino_ggr', label: 'Casino GGR (KES)', type: 'number', operators: 'numeric' },
                { field: 'casino_avg_rtp_pct', label: 'Casino Avg. RTP %', type: 'number', operators: 'numeric' },
                { field: 'casino_jackpot_wins', label: 'Jackpot Wins', type: 'number', operators: 'numeric' },
                { field: 'casino_bonus_used', label: 'Bonus Used (KES)', type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '⚽ Sportsbook',
            fields: [
                { field: 'sb_bets', label: 'Sports Bet Count', type: 'number', operators: 'numeric' },
                { field: 'sb_stake', label: 'Sports Stake (KES)', type: 'number', operators: 'numeric' },
                { field: 'sb_ggr', label: 'Sports GGR (KES)', type: 'number', operators: 'numeric' },
                { field: 'sb_win_count', label: 'Sports Wins', type: 'number', operators: 'numeric' },
                { field: 'sb_avg_odds', label: 'Avg. Odds', type: 'number', operators: 'numeric' },
                { field: 'sb_parlay_pct', label: 'Parlay/Acca %', type: 'number', operators: 'numeric' },
            ]
        },
        {
            label: '📊 Behaviour',
            fields: [
                { field: 'total_ggr', label: 'Total GGR (KES)', type: 'number', operators: 'numeric' },
                {

                    field: 'new_players', label: 'Is New Player', type: 'enum', operators: 'enum',
                    values: ['Yes', 'No']
                },
                {
                    field: 'churned_players', label: 'Is Churned', type: 'enum', operators: 'enum',
                    values: ['Yes', 'No']
                },
                {
                    field: 'reactivated_players', label: 'Was Reactivated', type: 'enum', operators: 'enum',
                    values: ['Yes', 'No']
                },
            ]
        }
    ];

    window.QBOperatorSets = {
        numeric: [
            { value: 'eq', label: 'equals' },
            { value: 'ne', label: 'does not equal' },
            { value: 'gt', label: 'greater than' },
            { value: 'gte', label: 'greater than or equal to' },
            { value: 'lt', label: 'less than' },
            { value: 'lte', label: 'less than or equal to' },
            { value: 'between', label: 'is between' },
        ],
        string: [
            { value: 'eq', label: 'equals' },
            { value: 'ne', label: 'does not equal' },
            { value: 'contains', label: 'contains' },
            { value: 'starts', label: 'starts with' },
            { value: 'ends', label: 'ends with' },
        ],
        enum: [
            { value: 'eq', label: 'is' },
            { value: 'ne', label: 'is not' },
        ],
        date: [
            { value: 'eq', label: 'is on' },
            { value: 'gt', label: 'is after' },
            { value: 'gte', label: 'is on or after' },
            { value: 'lt', label: 'is before' },
            { value: 'lte', label: 'is on or before' },
            { value: 'between', label: 'is between' },
        ],
    };

    window.getAllFields = () => window.QBFieldCategories.flatMap(c => c.fields);
    window.getFieldConfig = (fieldKey) => window.getAllFields().find(f => f.field === fieldKey) || null;
    window.getOperatorsForField = (fieldKey) => {
        const cfg = window.getFieldConfig(fieldKey);
        return cfg ? window.QBOperatorSets[cfg.operators] || [] : [];
    };
    window.getFieldLabel = (field) => window.getFieldConfig(field)?.label || field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    window.getOperatorLabel = (op) => Object.values(window.QBOperatorSets).flat().find(o => o.value === op)?.label || op;

    const evaluateRule = (player, rule) => {
        // Field Mapping: Map API field names to dummy data property names
        const fieldMap = {
            'deposit_total': 'lifetime_deposits',
            'withdraw_total': 'lifetime_withdrawals',
            'bet_total': 'lifetime_bets',
            'deposit_count': 'deposit_count',
            'withdraw_count': 'withdrawal_count',
            'bet_count': 'sb_bets'
        };

        const fieldKey = fieldMap[rule.field] || rule.field;
        const val = player[fieldKey];
        const target = rule.value;

        if (val === undefined || val === null) return false;
        switch (rule.operator) {
            case 'eq': return String(val).toLowerCase() === String(target).toLowerCase();
            case 'ne': return String(val).toLowerCase() !== String(target).toLowerCase();
            case 'contains': return String(val).toLowerCase().includes(String(target).toLowerCase());
            case 'gt': return Number(val) > Number(target);
            case 'gte': return Number(val) >= Number(target);
            case 'lt': return Number(val) < Number(target);
            case 'lte': return Number(val) <= Number(target);
            case 'between': {
                const [lo, hi] = String(target).split(',').map(Number);
                return Number(val) >= lo && Number(val) <= hi;
            }
            default: return true;
        }
    };

    const evaluateGroup = (player, group) => {
        const results = (group.rules || []).map(item => item._type === 'group' ? evaluateGroup(player, item) : evaluateRule(player, item));
        return group.operator === 'OR' ? results.some(Boolean) : results.every(Boolean);
    };

    window.fetchSegmentsDummy = async () => {
        const hardcoded = window.segments || [];
        const local = getLocalSegments();
        const favoriteIds = getLocalFavoriteIds().map(String);
        return [...hardcoded, ...local].map(seg => ({
            ...seg, is_favorite: favoriteIds.includes(String(seg.id)) || seg.is_favorite
        }));
    };

    window.fetchSegmentDetailsDummy = async (id) => {
        const all = await window.fetchSegmentsDummy();
        return all.find(s => String(s.id) === String(id)) || null;
    };

    window.toggleSegmentFavoriteDummy = async (id) => {
        const sid = String(id);
        const ids = getLocalFavoriteIds().map(String);
        const idx = ids.indexOf(sid);
        if (idx > -1) ids.splice(idx, 1);
        else ids.push(sid);
        saveLocalFavoriteIds(ids);
        return { status: 1 };
    };

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
        return { status: 1, data: newSegment };
    };

    window.filterPlayersByCriteria = async (criteria) => {
        if (!window.players) return { data: [] };
        const results = window.players.filter(p => evaluateGroup(p, criteria));
        return { data: results };
    };

    window.getPlayersForSegment = async (segment) => {
        if (segment.players?.length) return segment.players;

        // 1. Try matching by ID/Name (Hardcoded segments)
        if (window.players) {
            const found = window.players.filter(p =>
                String(p.segment_id) === String(segment.id) ||
                String(p.segment) === String(segment.name)
            );
            if (found.length) return found;
        }

        // 2. Try matching by dynamic criteria (API/Local segments)
        if (segment.criteria && window.players) {
            return window.players.filter(p => evaluateGroup(p, segment.criteria));
        }

        return [];
    };

    console.log('segdummy.js Consolidated: Loaded logic and dummy data.');
})();