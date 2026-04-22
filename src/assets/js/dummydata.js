// ============================================================
// GAMBLING PLATFORM DUMMY DATA
// Designed for rich graphical/chart analysis
// ============================================================

// ─── UTILITY FUNCTIONS ──────────────────────────────────────

window.fmtShort = (n) => {
  if (!n && n !== 0) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

// ─── PLAYERS ────────────────────────────────────────────────

window.players = [
  // ACTIVE PLAYERS (last_active within 30 days of 2026-02-01)
  { id: "p01", name: "Amina Hassan",    email: "amina@gmail.com",      country: "Kenya",    status: "active",  segment_id: "seg1", registered_at: "2023-03-15", last_active: "2026-01-28", lifetime_deposits: 95000,  lifetime_withdrawals: 42000,  lifetime_bets: 138000 },
  { id: "p02", name: "Brian Otieno",    email: "brian@yahoo.com",       country: "Kenya",    status: "active",  segment_id: "seg2", registered_at: "2024-06-20", last_active: "2026-01-30", lifetime_deposits: 18500,  lifetime_withdrawals: 6200,   lifetime_bets: 24000  },
  { id: "p03", name: "Sarah Kimani",    email: "sarah@company.com",     country: "Kenya",    status: "active",  segment_id: "seg1", registered_at: "2022-11-04", last_active: "2026-01-25", lifetime_deposits: 210000, lifetime_withdrawals: 95000,  lifetime_bets: 315000 },
  { id: "p04", name: "James Mwangi",    email: "james@gmail.com",       country: "Uganda",   status: "active",  segment_id: "seg3", registered_at: "2023-08-10", last_active: "2026-01-29", lifetime_deposits: 42000,  lifetime_withdrawals: 19500,  lifetime_bets: 58000  },
  { id: "p05", name: "Lucy Wanjiru",    email: "lucy@startup.io",       country: "Kenya",    status: "active",  segment_id: "seg1", registered_at: "2021-05-22", last_active: "2026-01-31", lifetime_deposits: 540000, lifetime_withdrawals: 210000, lifetime_bets: 820000 },
  { id: "p06", name: "Daniel Okello",   email: "daniel@hotmail.com",    country: "Tanzania", status: "active",  segment_id: "seg2", registered_at: "2024-09-03", last_active: "2026-01-27", lifetime_deposits: 9800,   lifetime_withdrawals: 2100,   lifetime_bets: 13500  },
  { id: "p07", name: "Faith Njoroge",   email: "faith@gmail.com",       country: "Kenya",    status: "active",  segment_id: "seg2", registered_at: "2024-04-18", last_active: "2026-01-26", lifetime_deposits: 22000,  lifetime_withdrawals: 8500,   lifetime_bets: 31000  },
  { id: "p08", name: "Kevin Oduya",     email: "kevin@safaricom.ke",    country: "Kenya",    status: "active",  segment_id: "seg3", registered_at: "2025-02-11", last_active: "2026-01-30", lifetime_deposits: 6500,   lifetime_withdrawals: 1200,   lifetime_bets: 8800   },
  { id: "p09", name: "Grace Achieng",   email: "grace@gmail.com",       country: "Uganda",   status: "active",  segment_id: "seg3", registered_at: "2025-05-30", last_active: "2026-01-29", lifetime_deposits: 4200,   lifetime_withdrawals: 800,    lifetime_bets: 5900   },
  { id: "p10", name: "Moses Kamau",     email: "moses@yahoo.com",       country: "Kenya",    status: "active",  segment_id: "seg1", registered_at: "2022-07-14", last_active: "2026-01-28", lifetime_deposits: 175000, lifetime_withdrawals: 68000,  lifetime_bets: 260000 },
  { id: "p11", name: "Irene Waweru",    email: "irene@company.ke",      country: "Kenya",    status: "active",  segment_id: "seg2", registered_at: "2024-11-08", last_active: "2026-01-25", lifetime_deposits: 14000,  lifetime_withdrawals: 4300,   lifetime_bets: 19500  },
  { id: "p12", name: "Tom Achola",      email: "tom@gmail.com",         country: "Tanzania", status: "active",  segment_id: "seg2", registered_at: "2024-08-19", last_active: "2026-01-22", lifetime_deposits: 31000,  lifetime_withdrawals: 12000,  lifetime_bets: 44000  },

  // DORMANT PLAYERS (last_active > 90 days ago)
  { id: "p13", name: "Cynthia Mwamba",  email: "cynthia@gmail.com",     country: "Kenya",    status: "dormant", segment_id: "seg2", registered_at: "2022-04-05", last_active: "2025-09-14", lifetime_deposits: 28000,  lifetime_withdrawals: 11000,  lifetime_bets: 38000  },
  { id: "p14", name: "Eric Kariuki",    email: "eric@hotmail.com",      country: "Kenya",    status: "dormant", segment_id: "seg3", registered_at: "2023-01-20", last_active: "2025-08-02", lifetime_deposits: 7500,   lifetime_withdrawals: 2800,   lifetime_bets: 10000  },
  { id: "p15", name: "Miriam Osei",     email: "miriam@gmail.com",      country: "Uganda",   status: "dormant", segment_id: "seg3", registered_at: "2023-06-12", last_active: "2025-07-30", lifetime_deposits: 5000,   lifetime_withdrawals: 900,    lifetime_bets: 6800   },
  { id: "p16", name: "Patrick Lumumba", email: "plumumba@yahoo.com",    country: "Tanzania", status: "dormant", segment_id: "seg2", registered_at: "2022-10-28", last_active: "2025-10-01", lifetime_deposits: 19000,  lifetime_withdrawals: 7200,   lifetime_bets: 25000  },
  { id: "p17", name: "Rose Nyambura",   email: "rose@startup.io",       country: "Kenya",    status: "dormant", segment_id: "seg1", registered_at: "2021-08-17", last_active: "2025-06-15", lifetime_deposits: 88000,  lifetime_withdrawals: 31000,  lifetime_bets: 120000 },
  { id: "p18", name: "Victor Omondi",   email: "victor@gmail.com",      country: "Kenya",    status: "dormant", segment_id: "seg3", registered_at: "2024-01-09", last_active: "2025-09-20", lifetime_deposits: 3200,   lifetime_withdrawals: 400,    lifetime_bets: 4100   },
];

// ─── SEGMENTS ───────────────────────────────────────────────

window.segments = [
  {
    id: "seg1",
    name: "High Rollers",
    description: "VIP players with lifetime deposits above KES 80,000. Targeted with exclusive bonuses and personal account managers.",
    color: "#f59e0b",
    total_players: 5,
    active_players: 4,
    dormant_players: 1,
    total_deposits: 1108000,
    total_withdrawals: 446000,
    total_bets: 1653000,
    avg_deposit_per_player: 221600,
    avg_bet_per_player: 330600,
    monthly_trend: [
      { month: "Aug 25", deposits: 72000, stake: 108000, bets: 420, withdrawals: 28000, players: 4, new_players: 1 },
      { month: "Sep 25", deposits: 88000, stake: 132000, bets: 485, withdrawals: 35000, players: 4, new_players: 0 },
      { month: "Oct 25", deposits: 95000, stake: 145000, bets: 510, withdrawals: 40000, players: 4, new_players: 0 },
      { month: "Nov 25", deposits: 110000, stake: 168000, bets: 620, withdrawals: 48000, players: 5, new_players: 1 },
      { month: "Dec 25", deposits: 134000, stake: 205000, bets: 740, withdrawals: 62000, players: 5, new_players: 0 },
      { month: "Jan 26", deposits: 148000, stake: 225000, bets: 810, withdrawals: 71000, players: 5, new_players: 0 },
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
    id: "seg2",
    name: "Casual Players",
    description: "Regular players with moderate activity. Lifetime deposits between KES 5,000–80,000. Respond well to reload bonuses.",
    color: "#6366f1",
    total_players: 7,
    active_players: 5,
    dormant_players: 2,
    total_deposits: 142300,
    total_withdrawals: 51300,
    total_bets: 195500,
    avg_deposit_per_player: 20328,
    avg_bet_per_player: 27928,
    monthly_trend: [
      { month: "Aug 25", deposits: 15000, stake: 21000, bets: 120, withdrawals: 5500, players: 5, new_players: 1 },
      { month: "Sep 25", deposits: 18500, stake: 26000, bets: 145, withdrawals: 6800, players: 6, new_players: 1 },
      { month: "Oct 25", deposits: 21000, stake: 30000, bets: 168, withdrawals: 7900, players: 6, new_players: 0 },
      { month: "Nov 25", deposits: 25000, stake: 35500, bets: 195, withdrawals: 9200, players: 7, new_players: 1 },
      { month: "Dec 25", deposits: 28000, stake: 40000, bets: 210, withdrawals: 10500, players: 7, new_players: 0 },
      { month: "Jan 26", deposits: 32000, stake: 45500, bets: 245, withdrawals: 12000, players: 7, new_players: 0 },
    ],
    casino_stats: [
      { game: "Aviator", bets: 85000 },
      { game: "Sweet Bonanza", bets: 55000 },
      { game: "Gates of Olympus", bets: 35000 },
      { game: "Crazy Time", bets: 20500 }
    ]
  },
  {
    id: "seg3",
    name: "New & At-Risk",
    description: "Players registered within 12 months OR dormant with < 5 sessions. Targeted with reactivation campaigns and first-deposit match offers.",
    color: "#10b981",
    total_players: 6,
    active_players: 3,
    dormant_players: 3,
    total_deposits: 26400,
    total_withdrawals: 6100,
    total_bets: 35600,
    avg_deposit_per_player: 4400,
    avg_bet_per_player: 5933,
    monthly_trend: [
      { month: "Aug 25", deposits: 1800, stake: 2500, bets: 45, withdrawals: 400, players: 2, new_players: 2 },
      { month: "Sep 25", deposits: 2400, stake: 3300, bets: 58, withdrawals: 520, players: 3, new_players: 1 },
      { month: "Oct 25", deposits: 3100, stake: 4400, bets: 72, withdrawals: 680, players: 4, new_players: 1 },
      { month: "Nov 25", deposits: 4200, stake: 5900, bets: 88, withdrawals: 900, players: 5, new_players: 1 },
      { month: "Dec 25", deposits: 5800, stake: 8100, bets: 104, withdrawals: 1300, players: 6, new_players: 1 },
      { month: "Jan 26", deposits: 7200, stake: 10100, bets: 128, withdrawals: 1600, players: 6, new_players: 0 },
    ],
    casino_stats: [
      { game: "Aviator", bets: 15000 },
      { game: "Sweet Bonanza", bets: 8000 },
      { game: "Crash Games", bets: 7600 },
      { game: "Slots", bets: 5000 }
    ]
  }
];

// ─── SPORTSBOOK BETS ────────────────────────────────────────

window.sportsbookBets = [
  // Format: { id, player_id, sport, market, odds, stake, potential_win, outcome, settled_at }
  { id: "sb001", player_id: "p01", sport: "Football",   market: "Match Winner",    odds: 1.85, stake: 2500,  potential_win: 4625,  outcome: "win",  settled_at: "2026-01-28" },
  { id: "sb002", player_id: "p03", sport: "Football",   market: "Over/Under 2.5",  odds: 1.95, stake: 5000,  potential_win: 9750,  outcome: "loss", settled_at: "2026-01-27" },
  { id: "sb003", player_id: "p05", sport: "Football",   market: "Match Winner",    odds: 3.40, stake: 10000, potential_win: 34000, outcome: "win",  settled_at: "2026-01-26" },
  { id: "sb004", player_id: "p02", sport: "Basketball", market: "Point Spread",    odds: 1.90, stake: 1500,  potential_win: 2850,  outcome: "loss", settled_at: "2026-01-25" },
  { id: "sb005", player_id: "p10", sport: "Football",   market: "Both Teams Score", odds: 1.75, stake: 8000, potential_win: 14000, outcome: "win",  settled_at: "2026-01-28" },
  { id: "sb006", player_id: "p04", sport: "Tennis",     market: "Match Winner",    odds: 2.10, stake: 3000,  potential_win: 6300,  outcome: "win",  settled_at: "2026-01-24" },
  { id: "sb007", player_id: "p07", sport: "Football",   market: "Correct Score",   odds: 8.50, stake: 500,   potential_win: 4250,  outcome: "loss", settled_at: "2026-01-29" },
  { id: "sb008", player_id: "p05", sport: "Rugby",      market: "Match Winner",    odds: 2.25, stake: 12000, potential_win: 27000, outcome: "win",  settled_at: "2026-01-30" },
  { id: "sb009", player_id: "p03", sport: "Basketball", market: "Total Points",    odds: 1.88, stake: 4000,  potential_win: 7520,  outcome: "win",  settled_at: "2026-01-22" },
  { id: "sb010", player_id: "p01", sport: "Cricket",    market: "Match Winner",    odds: 1.65, stake: 3500,  potential_win: 5775,  outcome: "loss", settled_at: "2026-01-20" },
  { id: "sb011", player_id: "p11", sport: "Football",   market: "Match Winner",    odds: 2.05, stake: 2000,  potential_win: 4100,  outcome: "win",  settled_at: "2026-01-18" },
  { id: "sb012", player_id: "p12", sport: "Tennis",     market: "Set Betting",     odds: 3.20, stake: 2500,  potential_win: 8000,  outcome: "loss", settled_at: "2026-01-17" },
  { id: "sb013", player_id: "p05", sport: "Football",   market: "Accumulator",     odds: 12.5, stake: 5000,  potential_win: 62500, outcome: "loss", settled_at: "2026-01-15" },
  { id: "sb014", player_id: "p10", sport: "Football",   market: "Asian Handicap",  odds: 1.92, stake: 6000,  potential_win: 11520, outcome: "win",  settled_at: "2026-01-14" },
  { id: "sb015", player_id: "p08", sport: "Basketball", market: "Match Winner",    odds: 1.72, stake: 800,   potential_win: 1376,  outcome: "win",  settled_at: "2026-01-12" },
  { id: "sb016", player_id: "p06", sport: "Football",   market: "Over/Under 2.5",  odds: 1.80, stake: 1200,  potential_win: 2160,  outcome: "win",  settled_at: "2026-01-10" },
  { id: "sb017", player_id: "p09", sport: "Rugby",      market: "Match Winner",    odds: 2.60, stake: 600,   potential_win: 1560,  outcome: "loss", settled_at: "2026-01-08" },
  { id: "sb018", player_id: "p03", sport: "Football",   market: "Match Winner",    odds: 1.55, stake: 9000,  potential_win: 13950, outcome: "win",  settled_at: "2026-01-06" },
  { id: "sb019", player_id: "p05", sport: "Cricket",    market: "Top Batsman",     odds: 4.50, stake: 3000,  potential_win: 13500, outcome: "win",  settled_at: "2026-01-04" },
  { id: "sb020", player_id: "p01", sport: "Football",   market: "Both Teams Score", odds: 1.70, stake: 4500, potential_win: 7650,  outcome: "loss", settled_at: "2026-01-02" },
];

// Aggregated sportsbook stats by sport (for pie/bar charts)
window.sportsbookBySport = [
  { sport: "Football",   total_bets: 11, total_staked: 65200, total_won_by_players: 41800, ggr: 23400 },
  { sport: "Basketball", total_bets: 4,  total_staked: 7800,  total_won_by_players: 4226,  ggr: 3574  },
  { sport: "Tennis",     total_bets: 3,  total_staked: 5500,  total_won_by_players: 3150,  ggr: 2350  },
  { sport: "Rugby",      total_bets: 2,  total_staked: 12600, total_won_by_players: 9000,  ggr: 3600  },
  { sport: "Cricket",    total_bets: 2,  total_staked: 6500,  total_won_by_players: 3375,  ggr: 3125  },
];

// Monthly sportsbook trend
window.sportsbookMonthly = [
  { month: "Aug 25", bets: 142, total_staked: 68000,  ggr: 9520  },
  { month: "Sep 25", bets: 168, total_staked: 81000,  ggr: 11340 },
  { month: "Oct 25", bets: 195, total_staked: 97500,  ggr: 13650 },
  { month: "Nov 25", bets: 224, total_staked: 115000, ggr: 16100 },
  { month: "Dec 25", bets: 278, total_staked: 148000, ggr: 20720 },
  { month: "Jan 26", bets: 310, total_staked: 171000, ggr: 23940 },
];

// ─── CASINO BETS ────────────────────────────────────────────

window.casinoBets = [
  { id: "cb001", player_id: "p05", game: "Sweet Bonanza",    game_type: "slots",       stake: 500,   win: 1200, net: -700,  played_at: "2026-01-31" },
  { id: "cb002", player_id: "p03", game: "Lightning Roulette", game_type: "live_table", stake: 2000,  win: 0,    net: 2000,  played_at: "2026-01-30" },
  { id: "cb003", player_id: "p10", game: "Book of Dead",     game_type: "slots",       stake: 1000,  win: 4500, net: -3500, played_at: "2026-01-30" },
  { id: "cb004", player_id: "p05", game: "Live Blackjack",   game_type: "live_table",  stake: 5000,  win: 9500, net: -4500, played_at: "2026-01-29" },
  { id: "cb005", player_id: "p01", game: "Gates of Olympus", game_type: "slots",       stake: 800,   win: 0,    net: 800,   played_at: "2026-01-29" },
  { id: "cb006", player_id: "p03", game: "Crazy Time",       game_type: "live_game",   stake: 3000,  win: 7500, net: -4500, played_at: "2026-01-28" },
  { id: "cb007", player_id: "p12", game: "Aviator",          game_type: "crash",       stake: 1500,  win: 2700, net: -1200, played_at: "2026-01-28" },
  { id: "cb008", player_id: "p07", game: "Aviator",          game_type: "crash",       stake: 600,   win: 0,    net: 600,   played_at: "2026-01-27" },
  { id: "cb009", player_id: "p05", game: "Monopoly Live",    game_type: "live_game",   stake: 4000,  win: 8000, net: -4000, played_at: "2026-01-27" },
  { id: "cb010", player_id: "p10", game: "Sweet Bonanza",    game_type: "slots",       stake: 1200,  win: 600,  net: 600,   played_at: "2026-01-26" },
  { id: "cb011", player_id: "p02", game: "Aviator",          game_type: "crash",       stake: 400,   win: 880,  net: -480,  played_at: "2026-01-26" },
  { id: "cb012", player_id: "p04", game: "Live Baccarat",    game_type: "live_table",  stake: 2500,  win: 2400, net: 100,   played_at: "2026-01-25" },
  { id: "cb013", player_id: "p03", game: "Book of Dead",     game_type: "slots",       stake: 2000,  win: 0,    net: 2000,  played_at: "2026-01-25" },
  { id: "cb014", player_id: "p05", game: "Sweet Bonanza",    game_type: "slots",       stake: 700,   win: 2800, net: -2100, played_at: "2026-01-24" },
  { id: "cb015", player_id: "p11", game: "Lightning Roulette", game_type: "live_table", stake: 1800,  win: 0,    net: 1800,  played_at: "2026-01-23" },
  { id: "cb016", player_id: "p08", game: "Aviator",          game_type: "crash",       stake: 300,   win: 510,  net: -210,  played_at: "2026-01-22" },
  { id: "cb017", player_id: "p06", game: "Gates of Olympus", game_type: "slots",       stake: 500,   win: 1250, net: -750,  played_at: "2026-01-22" },
  { id: "cb018", player_id: "p01", game: "Crazy Time",       game_type: "live_game",   stake: 2500,  win: 0,    net: 2500,  played_at: "2026-01-20" },
  { id: "cb019", player_id: "p09", game: "Aviator",          game_type: "crash",       stake: 250,   win: 375,  net: -125,  played_at: "2026-01-19" },
  { id: "cb020", player_id: "p10", game: "Live Blackjack",   game_type: "live_table",  stake: 4000,  win: 3800, net: 200,   played_at: "2026-01-18" },
];

// Casino bets aggregated by game (for charts)
window.casinoByGame = [
  { game: "Aviator",             game_type: "crash",       total_rounds: 6,  total_staked: 3050,  total_paid_out: 4465,  ggr: -1415, rtp_pct: 146.4 },
  { game: "Sweet Bonanza",       game_type: "slots",       total_rounds: 4,  total_staked: 3200,  total_paid_out: 4600,  ggr: -1400, rtp_pct: 143.8 },
  { game: "Book of Dead",        game_type: "slots",       total_rounds: 2,  total_staked: 3000,  total_paid_out: 4500,  ggr: -1500, rtp_pct: 150.0 },
  { game: "Crazy Time",          game_type: "live_game",   total_rounds: 2,  total_staked: 5500,  total_paid_out: 7500,  ggr: -2000, rtp_pct: 136.4 },
  { game: "Lightning Roulette",  game_type: "live_table",  total_rounds: 2,  total_staked: 3800,  total_paid_out: 0,     ggr: 3800,  rtp_pct: 0     },
  { game: "Live Blackjack",      game_type: "live_table",  total_rounds: 2,  total_staked: 9000,  total_paid_out: 13300, ggr: -4300, rtp_pct: 147.8 },
  { game: "Monopoly Live",       game_type: "live_game",   total_rounds: 1,  total_staked: 4000,  total_paid_out: 8000,  ggr: -4000, rtp_pct: 200.0 },
  { game: "Gates of Olympus",    game_type: "slots",       total_rounds: 2,  total_staked: 1300,  total_paid_out: 1250,  ggr: 50,    rtp_pct: 96.2  },
  { game: "Live Baccarat",       game_type: "live_table",  total_rounds: 1,  total_staked: 2500,  total_paid_out: 2400,  ggr: 100,   rtp_pct: 96.0  },
];

// Casino bets by game type (for donut chart)
window.casinoByGameType = [
  { game_type: "slots",       total_rounds: 8,  total_staked: 7500,  ggr: -2850 },
  { game_type: "crash",       total_rounds: 6,  total_staked: 3050,  ggr: -1415 },
  { game_type: "live_table",  total_rounds: 5,  total_staked: 15300, ggr: -400  },
  { game_type: "live_game",   total_rounds: 3,  total_staked: 9500,  ggr: -6000 },
];

// Monthly casino trend
window.casinoMonthly = [
  { month: "Aug 25", rounds: 1240, total_staked: 88000,  ggr: 5280  },
  { month: "Sep 25", rounds: 1580, total_staked: 112000, ggr: 6720  },
  { month: "Oct 25", rounds: 1920, total_staked: 138000, ggr: 8280  },
  { month: "Nov 25", rounds: 2350, total_staked: 168000, ggr: 10080 },
  { month: "Dec 25", rounds: 3100, total_staked: 228000, ggr: 13680 },
  { month: "Jan 26", rounds: 3640, total_staked: 271000, ggr: 16260 },
];

// ─── DEPOSITS ───────────────────────────────────────────────

window.deposits = [
  { id: "d001", player_id: "p05", amount: 50000, method: "M-Pesa",    status: "completed", created_at: "2026-01-31" },
  { id: "d002", player_id: "p03", amount: 20000, method: "Bank",      status: "completed", created_at: "2026-01-30" },
  { id: "d003", player_id: "p10", amount: 15000, method: "M-Pesa",    status: "completed", created_at: "2026-01-29" },
  { id: "d004", player_id: "p01", amount: 8000,  method: "Card",      status: "completed", created_at: "2026-01-28" },
  { id: "d005", player_id: "p05", amount: 30000, method: "M-Pesa",    status: "completed", created_at: "2026-01-27" },
  { id: "d006", player_id: "p04", amount: 5000,  method: "M-Pesa",    status: "completed", created_at: "2026-01-26" },
  { id: "d007", player_id: "p02", amount: 2000,  method: "Card",      status: "completed", created_at: "2026-01-25" },
  { id: "d008", player_id: "p11", amount: 3500,  method: "M-Pesa",    status: "completed", created_at: "2026-01-24" },
  { id: "d009", player_id: "p07", amount: 4000,  method: "M-Pesa",    status: "completed", created_at: "2026-01-23" },
  { id: "d010", player_id: "p08", amount: 1500,  method: "Card",      status: "completed", created_at: "2026-01-22" },
  { id: "d011", player_id: "p03", amount: 25000, method: "Bank",      status: "completed", created_at: "2026-01-21" },
  { id: "d012", player_id: "p12", amount: 6000,  method: "M-Pesa",    status: "completed", created_at: "2026-01-20" },
  { id: "d013", player_id: "p06", amount: 1800,  method: "Card",      status: "completed", created_at: "2026-01-18" },
  { id: "d014", player_id: "p09", amount: 1200,  method: "M-Pesa",    status: "completed", created_at: "2026-01-15" },
  { id: "d015", player_id: "p05", amount: 40000, method: "Bank",      status: "completed", created_at: "2026-01-10" },
  { id: "d016", player_id: "p10", amount: 20000, method: "M-Pesa",    status: "completed", created_at: "2026-01-08" },
  { id: "d017", player_id: "p01", amount: 10000, method: "M-Pesa",    status: "completed", created_at: "2026-01-05" },
  { id: "d018", player_id: "p02", amount: 1500,  method: "Card",      status: "failed",    created_at: "2026-01-04" },
  { id: "d019", player_id: "p07", amount: 5000,  method: "M-Pesa",    status: "completed", created_at: "2026-01-02" },
  { id: "d020", player_id: "p04", amount: 8000,  method: "Bank",      status: "pending",   created_at: "2026-01-01" },
];

// Monthly deposit trend
window.depositsMonthly = [
  { month: "Aug 25", total: 124000, count: 210, avg_deposit: 590,  mpesa_pct: 68, bank_pct: 18, card_pct: 14 },
  { month: "Sep 25", total: 151000, count: 248, avg_deposit: 609,  mpesa_pct: 70, bank_pct: 16, card_pct: 14 },
  { month: "Oct 25", total: 178000, count: 290, avg_deposit: 614,  mpesa_pct: 71, bank_pct: 15, card_pct: 14 },
  { month: "Nov 25", total: 215000, count: 340, avg_deposit: 632,  mpesa_pct: 72, bank_pct: 15, card_pct: 13 },
  { month: "Dec 25", total: 268000, count: 415, avg_deposit: 646,  mpesa_pct: 73, bank_pct: 14, card_pct: 13 },
  { month: "Jan 26", total: 307000, count: 471, avg_deposit: 651,  mpesa_pct: 74, bank_pct: 14, card_pct: 12 },
];

// Deposit method breakdown
window.depositsByMethod = [
  { method: "M-Pesa", total_amount: 724000, count: 1042, pct: 72.4 },
  { method: "Bank Transfer", total_amount: 148000, count: 156,  pct: 14.8 },
  { method: "Card", total_amount: 128000, count: 210,  pct: 12.8 },
];

// ─── WITHDRAWALS ────────────────────────────────────────────

window.withdrawals = [
  { id: "w001", player_id: "p05", amount: 25000, method: "M-Pesa",  status: "completed", created_at: "2026-01-30" },
  { id: "w002", player_id: "p03", amount: 12000, method: "Bank",    status: "completed", created_at: "2026-01-29" },
  { id: "w003", player_id: "p10", amount: 8000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-28" },
  { id: "w004", player_id: "p05", amount: 18000, method: "M-Pesa",  status: "completed", created_at: "2026-01-27" },
  { id: "w005", player_id: "p01", amount: 5000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-25" },
  { id: "w006", player_id: "p03", amount: 9000,  method: "Bank",    status: "completed", created_at: "2026-01-23" },
  { id: "w007", player_id: "p04", amount: 3000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-22" },
  { id: "w008", player_id: "p10", amount: 11000, method: "Bank",    status: "pending",   created_at: "2026-01-21" },
  { id: "w009", player_id: "p07", amount: 2500,  method: "M-Pesa",  status: "completed", created_at: "2026-01-19" },
  { id: "w010", player_id: "p12", amount: 4000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-17" },
  { id: "w011", player_id: "p05", amount: 30000, method: "Bank",    status: "completed", created_at: "2026-01-15" },
  { id: "w012", player_id: "p11", amount: 1800,  method: "M-Pesa",  status: "completed", created_at: "2026-01-12" },
  { id: "w013", player_id: "p02", amount: 800,   method: "M-Pesa",  status: "completed", created_at: "2026-01-10" },
  { id: "w014", player_id: "p06", amount: 700,   method: "Card",    status: "failed",    created_at: "2026-01-08" },
  { id: "w015", player_id: "p08", amount: 500,   method: "M-Pesa",  status: "completed", created_at: "2026-01-05" },
];

// Monthly withdrawal trend
window.withdrawalsMonthly = [
  { month: "Aug 25", total: 42000,  count: 88,  avg_withdrawal: 477 },
  { month: "Sep 25", total: 53000,  count: 108, avg_withdrawal: 491 },
  { month: "Oct 25", total: 68000,  count: 135, avg_withdrawal: 504 },
  { month: "Nov 25", total: 84000,  count: 162, avg_withdrawal: 519 },
  { month: "Dec 25", total: 112000, count: 208, avg_withdrawal: 538 },
  { month: "Jan 26", total: 131000, count: 241, avg_withdrawal: 544 },
];

// ─── ACTIVE vs DORMANT PLAYERS ───────────────────────────────

window.playerStatusSummary = {
  active:  { count: 12, pct: 66.7, avg_monthly_deposit: 28400, avg_monthly_bets: 41800 },
  dormant: { count: 6,  pct: 33.3, avg_monthly_deposit: 0,     avg_monthly_bets: 0     },
};

// New registrations + churn trend by month
window.playerActivityMonthly = [
  { month: "Aug 25", new_registrations: 8,  churned: 2,  active_eom: 38, dormant_eom: 12 },
  { month: "Sep 25", new_registrations: 11, churned: 3,  active_eom: 44, dormant_eom: 14 },
  { month: "Oct 25", new_registrations: 14, churned: 4,  active_eom: 51, dormant_eom: 15 },
  { month: "Nov 25", new_registrations: 18, churned: 5,  active_eom: 60, dormant_eom: 16 },
  { month: "Dec 25", new_registrations: 22, churned: 6,  active_eom: 71, dormant_eom: 17 },
  { month: "Jan 26", new_registrations: 28, churned: 8,  active_eom: 84, dormant_eom: 18 },
];

// ─── PLATFORM OVERVIEW KPIs ──────────────────────────────────

window.platformKPIs = {
  total_players: 18,
  active_players: 12,
  dormant_players: 6,
  total_deposits_alltime: 1276700,
  total_withdrawals_alltime: 503400,
  total_sportsbook_bets_alltime: 730000,
  total_casino_bets_alltime: 852000,
  total_ggr: 198600,
  avg_deposit_per_player: 70928,
  avg_bets_per_active_player: 132583,
  deposit_to_bet_ratio: 1.23,
  withdrawal_to_deposit_ratio: 0.39,
  top_country: "Kenya",
  top_payment_method: "M-Pesa",
  top_sport: "Football",
  top_casino_game: "Aviator",
};