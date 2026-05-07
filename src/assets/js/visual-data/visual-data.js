(function() {
    window.visualDummyData = {
        months: ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'],
        
        // Simplified Metrics for Performance Trends
        metrics: {
            deposits:      [4500000, 5200000, 6800000, 7500000, 9200000, 10500000],
            withdrawals:   [1200000, 1500000, 2100000, 2400000, 3100000, 3800000],
            active_users:  [980, 1100, 1320, 1540, 1890, 2100],
            dormant_users: [450, 420, 380, 350, 310, 280],
            blocked_users: [12, 15, 18, 22, 25, 30],
            new_players:   [120, 150, 240, 280, 350, 420],
            casino_bets:   [5200000, 6100000, 7800000, 8900000, 10500000, 12800000],
            sports_bets:   [3000000, 3400000, 4600000, 5900000, 7700000, 8600000],
            bonus_bets:    [450000, 520000, 680000, 750000, 920000, 1050000],
            jackpot_bets:  [150000, 180000, 240000, 290000, 360000, 420000],
            ggr:           [1500000, 1800000, 2400000, 2900000, 3600000, 4200000],
            net_revenue:   [3700000, 4300000, 5600000, 6800000, 8100000, 9500000]
        },

        // Field definitions for the UI controls
        field_configs: [
            { key: 'deposits',      label: 'Deposits',       color: '#4e7adf' },
            { key: 'withdrawals',   label: 'Withdrawals',    color: '#f43f5e' },
            { key: 'active_users',  label: 'Active Players', color: '#38c66c' },
            { key: 'dormant_users', label: 'Dormant Players',color: '#f1b44c' },
            { key: 'blocked_users', label: 'Blocked Players',color: '#64748b' },
            { key: 'new_players',   label: 'New Players',    color: '#34c38f' },
            { key: 'casino_bets',   label: 'Casino Bets',    color: '#5b73e8' },
            { key: 'sports_bets',   label: 'Sportsbook Bets',color: '#fb923c' },
            { key: 'bonus_bets',    label: 'Bonus Bets',     color: '#ec4899' },
            { key: 'jackpot_bets',  label: 'Jackpot Bets',   color: '#facc15' },
            { key: 'ggr',           label: 'GGR',            color: '#ffd166' },
            { key: 'net_revenue',   label: 'Net Revenue',    color: '#a78bfa' }
        ],

        // For Cashflow Chart (Up/Down)
        cashflow: {
            deposits:    [4500000, 5200000, 6800000, 7500000, 9200000, 10500000],
            withdrawals: [-1200000, -1500000, -2100000, -2400000, -3100000, -3800000]
        },

        // For Engagement Status
        engagement: {
            series: [65, 35], // [Active, Dormant]
            labels: ['Active Players', 'Dormant Players'],
            colors: ['#38c66c', '#f43f5e']
        },

        // Casino Donuts (5 items each)
        casino_games: {
            series: [35, 25, 15, 15, 10],
            labels: ['Slots', 'Roulette', 'Crash Games', 'Blackjack', 'Other'],
            colors: ['#5b73e8', '#34c38f', '#f1b44c', '#f46a6a', '#dfe2e6']
        },
        casino_providers: {
            series: [45, 20, 15, 10, 10],
            labels: ['Pragmatic Play', 'Evolution', 'Hacksaw', 'Spribe', 'Other'],
            colors: ['#5b73e8', '#f1b44c', '#34c38f', '#f46a6a', '#dfe2e6']
        },

        // Top 10 Tables
        top_games: [
            { game_name: "Lightning Roulette", unique_players: 450, bet_count: 12400, total_stake: 8500000, total_ggr: 425000, rtp_pct: 95.0 },
            { game_name: "Sweet Bonanza",      unique_players: 380, bet_count: 18600, total_stake: 6200000, total_ggr: 186000, rtp_pct: 97.0 },
            { game_name: "Crazy Time",         unique_players: 310, bet_count: 9500,  total_stake: 5800000, total_ggr: 290000, rtp_pct: 95.0 },
            { game_name: "Aviator",            unique_players: 890, bet_count: 45000, total_stake: 4200000, total_ggr: -126000, rtp_pct: 103.0 },
            { game_name: "Live Blackjack",     unique_players: 120, bet_count: 4200,  total_stake: 3900000, total_ggr: 195000, rtp_pct: 95.0 },
            { game_name: "Gates of Olympus",   unique_players: 240, bet_count: 11200, total_stake: 3500000, total_ggr: 105000, rtp_pct: 97.0 },
            { game_name: "Mega Ball",          unique_players: 150, bet_count: 7800,  total_stake: 2800000, total_ggr: 140000, rtp_pct: 95.0 },
            { game_name: "Sugar Rush",         unique_players: 210, bet_count: 9200,  total_stake: 2400000, total_ggr: 72000,  rtp_pct: 97.0 },
            { game_name: "Dream Catcher",      unique_players: 95,  bet_count: 5600,  total_stake: 1900000, total_ggr: 95000,  rtp_pct: 95.0 },
            { game_name: "Wolf Gold",          unique_players: 180, bet_count: 6400,  total_stake: 1500000, total_ggr: 45000,  rtp_pct: 97.0 }
        ],
        top_tournaments: [
            { dimension_name: "EPL",         unique_players: 1250, total_bets: 3450, total_stake: 18400000, total_ggr: 2208000 },
            { dimension_name: "Champions Lg", unique_players: 980,  total_bets: 2890, total_stake: 15200000, total_ggr: 1824000 },
            { dimension_name: "NBA",         unique_players: 640,  total_bets: 4120, total_stake: 9600000,  total_ggr: 1152000 },
            { dimension_name: "La Liga",     unique_players: 520,  total_bets: 1980, total_stake: 8400000,  total_ggr: 1008000 },
            { dimension_name: "Serie A",     unique_players: 480,  total_bets: 1650, total_stake: 7200000,  total_ggr: 864000 },
            { dimension_name: "NFL",         unique_players: 310,  total_bets: 1240, total_stake: 6800000, total_ggr: 816000 },
            { dimension_name: "Wimbledon",   unique_players: 420,  total_bets: 3200, total_stake: 5400000,  total_ggr: 648000 },
            { dimension_name: "Ligue 1",     symbol: "🇫🇷", unique_players: 290,  total_bets: 1100, total_stake: 4800000,  total_ggr: 576000 },
            { dimension_name: "Bundesliga",  unique_players: 350,  total_bets: 950,  total_stake: 4200000,  total_ggr: 504000 },
            { dimension_name: "F1",          unique_players: 210,  total_bets: 820,  total_stake: 3500000,  total_ggr: 420000 }
        ],

        kpis: {
            growthRate: 14.2,
            projectedValue: 12500000,
            nggr: 1840000
        },

        // New Data for Side Charts
        device_breakdown: {
            series: [72, 22, 6],
            labels: ['Mobile', 'Desktop', 'Tablet'],
            colors: ['#5b73e8', '#34c38f', '#f1b44c']
        },
        regional_distribution: {
            series: [45, 25, 15, 10, 5],
            labels: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Other'],
            colors: ['#5b73e8', '#34c38f', '#f1b44c', '#f46a6a', '#dfe2e6']
        },
        acquisition_channels: {
            series: [40, 30, 15, 10, 5],
            labels: ['Direct', 'Social Media', 'Affiliates', 'Search', 'Other'],
            colors: ['#5b73e8', '#34c38f', '#f1b44c', '#f46a6a', '#dfe2e6']
        }
    };
    console.log('visual-data.js: Restored rich dataset.');
})();
