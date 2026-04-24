// ============================================================
// GAMBLING PLATFORM DUMMY DATA — v2
// Enriched monthly trends: casino vs sportsbook bets,
// active vs dormant players, tournament breakdowns,
// and ~20 additional fields per segment
// ============================================================

window.fmtShort = (n) => {
  if (!n && n !== 0) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

// ─── PLAYERS ────────────────────────────────────────────────

// ─── PLAYERS (enriched) ──────────────────────────────────────────────────────
// Every field listed in window.QBFieldCategories in segdummy.js is now a flat
// property on each player so the filter engine can evaluate rules against them.
//
// Fields added vs the original:
//   Financial  : deposit_count, avg_deposit, withdrawal_ratio
//   Casino     : casino_rounds, casino_stake, casino_ggr, casino_slots_stake,
//                casino_live_stake, casino_crash_stake, casino_avg_rtp_pct,
//                casino_jackpot_wins, casino_bonus_used
//   Sportsbook : sb_bets, sb_stake, sb_ggr, sb_win_count, sb_avg_odds,
//                sb_parlay_pct, sb_cashout_count,
//                sb_epl_stake, sb_ucl_stake, sb_afcon_stake, sb_kpl_stake,
//                sb_nba_stake
//   Behaviour  : total_ggr, failed_deposits, reactivated (bool string)

window.players = [
  {
    id: "p01", name: "Amina Hassan", email: "amina@gmail.com",
    country: "Kenya", status: "active", segment_id: "seg1",
    registered_at: "2023-03-15", last_active: "2026-01-28",
    // financial
    lifetime_deposits: 95000, lifetime_withdrawals: 42000, lifetime_bets: 138000,
    deposit_count: 62, avg_deposit: 1532, withdrawal_ratio: 44,
    failed_deposits: 3,
    // casino (lifetime totals)
    casino_rounds: 820, casino_stake: 38000, casino_ggr: 2660,
    casino_slots_stake: 12000, casino_live_stake: 20000, casino_crash_stake: 6000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 1, casino_bonus_used: 3200,
    // sportsbook (lifetime totals)
    sb_bets: 310, sb_stake: 57000, sb_ggr: 6840,
    sb_win_count: 124, sb_avg_odds: 2.10, sb_parlay_pct: 18, sb_cashout_count: 14,
    sb_epl_stake: 22000, sb_ucl_stake: 9000, sb_afcon_stake: 3500,
    sb_kpl_stake: 1800, sb_nba_stake: 2800,
    // behaviour
    total_ggr: 9500, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p02", name: "Brian Otieno", email: "brian@yahoo.com",
    country: "Kenya", status: "active", segment_id: "seg2",
    registered_at: "2024-06-20", last_active: "2026-01-30",
    lifetime_deposits: 18500, lifetime_withdrawals: 6200, lifetime_bets: 24000,
    deposit_count: 28, avg_deposit: 661, withdrawal_ratio: 33,
    failed_deposits: 2,
    casino_rounds: 220, casino_stake: 8500, casino_ggr: 595,
    casino_slots_stake: 3000, casino_live_stake: 3500, casino_crash_stake: 2000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 900,
    sb_bets: 88, sb_stake: 12000, sb_ggr: 1440,
    sb_win_count: 35, sb_avg_odds: 1.88, sb_parlay_pct: 12, sb_cashout_count: 5,
    sb_epl_stake: 4500, sb_ucl_stake: 1800, sb_afcon_stake: 700,
    sb_kpl_stake: 400, sb_nba_stake: 900,
    total_ggr: 2035, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p03", name: "Sarah Kimani", email: "sarah@company.com",
    country: "Kenya", status: "active", segment_id: "seg1",
    registered_at: "2022-11-04", last_active: "2026-01-25",
    lifetime_deposits: 210000, lifetime_withdrawals: 95000, lifetime_bets: 315000,
    deposit_count: 140, avg_deposit: 1500, withdrawal_ratio: 45,
    failed_deposits: 6,
    casino_rounds: 1850, casino_stake: 92000, casino_ggr: 6440,
    casino_slots_stake: 28000, casino_live_stake: 48000, casino_crash_stake: 16000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 3, casino_bonus_used: 8500,
    sb_bets: 680, sb_stake: 125000, sb_ggr: 15000,
    sb_win_count: 270, sb_avg_odds: 2.15, sb_parlay_pct: 22, sb_cashout_count: 32,
    sb_epl_stake: 48000, sb_ucl_stake: 22000, sb_afcon_stake: 8000,
    sb_kpl_stake: 4000, sb_nba_stake: 7000,
    total_ggr: 21440, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p04", name: "James Mwangi", email: "james@gmail.com",
    country: "Uganda", status: "active", segment_id: "seg3",
    registered_at: "2023-08-10", last_active: "2026-01-29",
    lifetime_deposits: 42000, lifetime_withdrawals: 19500, lifetime_bets: 58000,
    deposit_count: 38, avg_deposit: 1105, withdrawal_ratio: 46,
    failed_deposits: 2,
    casino_rounds: 420, casino_stake: 18000, casino_ggr: 1260,
    casino_slots_stake: 5000, casino_live_stake: 9000, casino_crash_stake: 4000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 1800,
    sb_bets: 195, sb_stake: 32000, sb_ggr: 3840,
    sb_win_count: 78, sb_avg_odds: 1.95, sb_parlay_pct: 14, sb_cashout_count: 8,
    sb_epl_stake: 12000, sb_ucl_stake: 5500, sb_afcon_stake: 2200,
    sb_kpl_stake: 1100, sb_nba_stake: 2000,
    total_ggr: 5100, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p05", name: "Lucy Wanjiru", email: "lucy@startup.io",
    country: "Kenya", status: "active", segment_id: "seg1",
    registered_at: "2021-05-22", last_active: "2026-01-31",
    lifetime_deposits: 540000, lifetime_withdrawals: 210000, lifetime_bets: 820000,
    deposit_count: 310, avg_deposit: 1742, withdrawal_ratio: 39,
    failed_deposits: 11,
    casino_rounds: 4800, casino_stake: 245000, casino_ggr: 17150,
    casino_slots_stake: 72000, casino_live_stake: 130000, casino_crash_stake: 43000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 8, casino_bonus_used: 22000,
    sb_bets: 1650, sb_stake: 320000, sb_ggr: 38400,
    sb_win_count: 640, sb_avg_odds: 2.22, sb_parlay_pct: 28, sb_cashout_count: 75,
    sb_epl_stake: 120000, sb_ucl_stake: 55000, sb_afcon_stake: 20000,
    sb_kpl_stake: 10000, sb_nba_stake: 18000,
    total_ggr: 55550, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p06", name: "Daniel Okello", email: "daniel@hotmail.com",
    country: "Tanzania", status: "active", segment_id: "seg2",
    registered_at: "2024-09-03", last_active: "2026-01-27",
    lifetime_deposits: 9800, lifetime_withdrawals: 2100, lifetime_bets: 13500,
    deposit_count: 18, avg_deposit: 544, withdrawal_ratio: 21,
    failed_deposits: 1,
    casino_rounds: 115, casino_stake: 4200, casino_ggr: 294,
    casino_slots_stake: 1500, casino_live_stake: 1800, casino_crash_stake: 900,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 400,
    sb_bets: 52, sb_stake: 7200, sb_ggr: 864,
    sb_win_count: 20, sb_avg_odds: 1.82, sb_parlay_pct: 10, sb_cashout_count: 3,
    sb_epl_stake: 2800, sb_ucl_stake: 1200, sb_afcon_stake: 500,
    sb_kpl_stake: 250, sb_nba_stake: 400,
    total_ggr: 1158, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p07", name: "Faith Njoroge", email: "faith@gmail.com",
    country: "Kenya", status: "active", segment_id: "seg2",
    registered_at: "2024-04-18", last_active: "2026-01-26",
    lifetime_deposits: 22000, lifetime_withdrawals: 8500, lifetime_bets: 31000,
    deposit_count: 32, avg_deposit: 688, withdrawal_ratio: 39,
    failed_deposits: 2,
    casino_rounds: 280, casino_stake: 10500, casino_ggr: 735,
    casino_slots_stake: 3500, casino_live_stake: 4500, casino_crash_stake: 2500,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 1100,
    sb_bets: 118, sb_stake: 16500, sb_ggr: 1980,
    sb_win_count: 46, sb_avg_odds: 1.92, sb_parlay_pct: 14, sb_cashout_count: 7,
    sb_epl_stake: 6200, sb_ucl_stake: 2800, sb_afcon_stake: 1100,
    sb_kpl_stake: 550, sb_nba_stake: 900,
    total_ggr: 2715, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p08", name: "Kevin Oduya", email: "kevin@safaricom.ke",
    country: "Kenya", status: "active", segment_id: "seg3",
    registered_at: "2025-02-11", last_active: "2026-01-30",
    lifetime_deposits: 6500, lifetime_withdrawals: 1200, lifetime_bets: 8800,
    deposit_count: 14, avg_deposit: 464, withdrawal_ratio: 18,
    failed_deposits: 1,
    casino_rounds: 88, casino_stake: 3200, casino_ggr: 224,
    casino_slots_stake: 1000, casino_live_stake: 1400, casino_crash_stake: 800,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 350,
    sb_bets: 38, sb_stake: 4800, sb_ggr: 576,
    sb_win_count: 15, sb_avg_odds: 1.78, sb_parlay_pct: 8, sb_cashout_count: 2,
    sb_epl_stake: 1800, sb_ucl_stake: 800, sb_afcon_stake: 320,
    sb_kpl_stake: 160, sb_nba_stake: 280,
    total_ggr: 800, churned_players: "No", reactivated_players: "No",
    new_players: "Yes",
  },
  {
    id: "p09", name: "Grace Achieng", email: "grace@gmail.com",
    country: "Uganda", status: "active", segment_id: "seg3",
    registered_at: "2025-05-30", last_active: "2026-01-29",
    lifetime_deposits: 4200, lifetime_withdrawals: 800, lifetime_bets: 5900,
    deposit_count: 10, avg_deposit: 420, withdrawal_ratio: 19,
    failed_deposits: 1,
    casino_rounds: 58, casino_stake: 2100, casino_ggr: 147,
    casino_slots_stake: 700, casino_live_stake: 900, casino_crash_stake: 500,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 220,
    sb_bets: 24, sb_stake: 3100, sb_ggr: 372,
    sb_win_count: 9, sb_avg_odds: 1.75, sb_parlay_pct: 6, sb_cashout_count: 1,
    sb_epl_stake: 1200, sb_ucl_stake: 520, sb_afcon_stake: 210,
    sb_kpl_stake: 105, sb_nba_stake: 180,
    total_ggr: 519, churned_players: "No", reactivated_players: "No",
    new_players: "Yes",
  },
  {
    id: "p10", name: "Moses Kamau", email: "moses@yahoo.com",
    country: "Kenya", status: "active", segment_id: "seg1",
    registered_at: "2022-07-14", last_active: "2026-01-28",
    lifetime_deposits: 175000, lifetime_withdrawals: 68000, lifetime_bets: 260000,
    deposit_count: 118, avg_deposit: 1483, withdrawal_ratio: 39,
    failed_deposits: 5,
    casino_rounds: 1520, casino_stake: 72000, casino_ggr: 5040,
    casino_slots_stake: 22000, casino_live_stake: 38000, casino_crash_stake: 12000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 2, casino_bonus_used: 6500,
    sb_bets: 540, sb_stake: 98000, sb_ggr: 11760,
    sb_win_count: 216, sb_avg_odds: 2.08, sb_parlay_pct: 20, sb_cashout_count: 26,
    sb_epl_stake: 38000, sb_ucl_stake: 17000, sb_afcon_stake: 6200,
    sb_kpl_stake: 3100, sb_nba_stake: 5500,
    total_ggr: 16800, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p11", name: "Irene Waweru", email: "irene@company.ke",
    country: "Kenya", status: "active", segment_id: "seg2",
    registered_at: "2024-11-08", last_active: "2026-01-25",
    lifetime_deposits: 14000, lifetime_withdrawals: 4300, lifetime_bets: 19500,
    deposit_count: 22, avg_deposit: 636, withdrawal_ratio: 31,
    failed_deposits: 2,
    casino_rounds: 175, casino_stake: 6500, casino_ggr: 455,
    casino_slots_stake: 2200, casino_live_stake: 2800, casino_crash_stake: 1500,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 680,
    sb_bets: 74, sb_stake: 10000, sb_ggr: 1200,
    sb_win_count: 29, sb_avg_odds: 1.90, sb_parlay_pct: 11, sb_cashout_count: 4,
    sb_epl_stake: 3800, sb_ucl_stake: 1700, sb_afcon_stake: 680,
    sb_kpl_stake: 340, sb_nba_stake: 580,
    total_ggr: 1655, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p12", name: "Tom Achola", email: "tom@gmail.com",
    country: "Tanzania", status: "active", segment_id: "seg2",
    registered_at: "2024-08-19", last_active: "2026-01-22",
    lifetime_deposits: 31000, lifetime_withdrawals: 12000, lifetime_bets: 44000,
    deposit_count: 44, avg_deposit: 705, withdrawal_ratio: 39,
    failed_deposits: 3,
    casino_rounds: 395, casino_stake: 14800, casino_ggr: 1036,
    casino_slots_stake: 5000, casino_live_stake: 6200, casino_crash_stake: 3600,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 1500,
    sb_bets: 165, sb_stake: 22000, sb_ggr: 2640,
    sb_win_count: 64, sb_avg_odds: 1.95, sb_parlay_pct: 16, sb_cashout_count: 9,
    sb_epl_stake: 8400, sb_ucl_stake: 3800, sb_afcon_stake: 1500,
    sb_kpl_stake: 750, sb_nba_stake: 1300,
    total_ggr: 3676, churned_players: "No", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p13", name: "Cynthia Mwamba", email: "cynthia@gmail.com",
    country: "Kenya", status: "dormant", segment_id: "seg2",
    registered_at: "2022-04-05", last_active: "2025-09-14",
    lifetime_deposits: 28000, lifetime_withdrawals: 11000, lifetime_bets: 38000,
    deposit_count: 38, avg_deposit: 737, withdrawal_ratio: 39,
    failed_deposits: 3,
    casino_rounds: 340, casino_stake: 12800, casino_ggr: 896,
    casino_slots_stake: 4200, casino_live_stake: 5500, casino_crash_stake: 3100,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 1300,
    sb_bets: 142, sb_stake: 19000, sb_ggr: 2280,
    sb_win_count: 55, sb_avg_odds: 1.92, sb_parlay_pct: 14, sb_cashout_count: 7,
    sb_epl_stake: 7200, sb_ucl_stake: 3200, sb_afcon_stake: 1300,
    sb_kpl_stake: 650, sb_nba_stake: 1100,
    total_ggr: 3176, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p14", name: "Eric Kariuki", email: "eric@hotmail.com",
    country: "Kenya", status: "dormant", segment_id: "seg3",
    registered_at: "2023-01-20", last_active: "2025-08-02",
    lifetime_deposits: 7500, lifetime_withdrawals: 2800, lifetime_bets: 10000,
    deposit_count: 14, avg_deposit: 536, withdrawal_ratio: 37,
    failed_deposits: 1,
    casino_rounds: 95, casino_stake: 3600, casino_ggr: 252,
    casino_slots_stake: 1200, casino_live_stake: 1500, casino_crash_stake: 900,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 380,
    sb_bets: 42, sb_stake: 5400, sb_ggr: 648,
    sb_win_count: 16, sb_avg_odds: 1.80, sb_parlay_pct: 9, sb_cashout_count: 2,
    sb_epl_stake: 2100, sb_ucl_stake: 940, sb_afcon_stake: 380,
    sb_kpl_stake: 190, sb_nba_stake: 320,
    total_ggr: 900, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p15", name: "Miriam Osei", email: "miriam@gmail.com",
    country: "Uganda", status: "dormant", segment_id: "seg3",
    registered_at: "2023-06-12", last_active: "2025-07-30",
    lifetime_deposits: 5000, lifetime_withdrawals: 900, lifetime_bets: 6800,
    deposit_count: 10, avg_deposit: 500, withdrawal_ratio: 18,
    failed_deposits: 1,
    casino_rounds: 64, casino_stake: 2400, casino_ggr: 168,
    casino_slots_stake: 800, casino_live_stake: 1000, casino_crash_stake: 600,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 250,
    sb_bets: 28, sb_stake: 3600, sb_ggr: 432,
    sb_win_count: 10, sb_avg_odds: 1.76, sb_parlay_pct: 7, sb_cashout_count: 1,
    sb_epl_stake: 1400, sb_ucl_stake: 620, sb_afcon_stake: 250,
    sb_kpl_stake: 125, sb_nba_stake: 210,
    total_ggr: 600, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p16", name: "Patrick Lumumba", email: "plumumba@yahoo.com",
    country: "Tanzania", status: "dormant", segment_id: "seg2",
    registered_at: "2022-10-28", last_active: "2025-10-01",
    lifetime_deposits: 19000, lifetime_withdrawals: 7200, lifetime_bets: 25000,
    deposit_count: 26, avg_deposit: 731, withdrawal_ratio: 38,
    failed_deposits: 2,
    casino_rounds: 225, casino_stake: 8500, casino_ggr: 595,
    casino_slots_stake: 2800, casino_live_stake: 3600, casino_crash_stake: 2100,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 850,
    sb_bets: 96, sb_stake: 12800, sb_ggr: 1536,
    sb_win_count: 37, sb_avg_odds: 1.88, sb_parlay_pct: 12, sb_cashout_count: 5,
    sb_epl_stake: 4900, sb_ucl_stake: 2200, sb_afcon_stake: 880,
    sb_kpl_stake: 440, sb_nba_stake: 740,
    total_ggr: 2131, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p17", name: "Rose Nyambura", email: "rose@startup.io",
    country: "Kenya", status: "dormant", segment_id: "seg1",
    registered_at: "2021-08-17", last_active: "2025-06-15",
    lifetime_deposits: 88000, lifetime_withdrawals: 31000, lifetime_bets: 120000,
    deposit_count: 72, avg_deposit: 1222, withdrawal_ratio: 35,
    failed_deposits: 4,
    casino_rounds: 1080, casino_stake: 42000, casino_ggr: 2940,
    casino_slots_stake: 13000, casino_live_stake: 22000, casino_crash_stake: 7000,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 1, casino_bonus_used: 4000,
    sb_bets: 480, sb_stake: 52000, sb_ggr: 6240,
    sb_win_count: 188, sb_avg_odds: 2.02, sb_parlay_pct: 18, sb_cashout_count: 22,
    sb_epl_stake: 20000, sb_ucl_stake: 9000, sb_afcon_stake: 3600,
    sb_kpl_stake: 1800, sb_nba_stake: 3000,
    total_ggr: 9180, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
  {
    id: "p18", name: "Victor Omondi", email: "victor@gmail.com",
    country: "Kenya", status: "dormant", segment_id: "seg3",
    registered_at: "2024-01-09", last_active: "2025-09-20",
    lifetime_deposits: 3200, lifetime_withdrawals: 400, lifetime_bets: 4100,
    deposit_count: 8, avg_deposit: 400, withdrawal_ratio: 13,
    failed_deposits: 1,
    casino_rounds: 38, casino_stake: 1400, casino_ggr: 98,
    casino_slots_stake: 480, casino_live_stake: 580, casino_crash_stake: 340,
    casino_avg_rtp_pct: 93, casino_jackpot_wins: 0, casino_bonus_used: 140,
    sb_bets: 18, sb_stake: 2200, sb_ggr: 264,
    sb_win_count: 6, sb_avg_odds: 1.72, sb_parlay_pct: 6, sb_cashout_count: 0,
    sb_epl_stake: 850, sb_ucl_stake: 380, sb_afcon_stake: 150,
    sb_kpl_stake: 75, sb_nba_stake: 130,
    total_ggr: 362, churned_players: "Yes", reactivated_players: "No",
    new_players: "No",
  },
];
// ─── SEGMENTS ───────────────────────────────────────────────
// Each segment's monthly_trend now includes:
//
// PLAYER FIELDS
//   players            — total players active in the platform that month
//   active_players     — players who placed at least 1 bet that month
//   dormant_players    — players who placed 0 bets that month
//   new_players        — newly registered players that month
//   churned_players    — players who went dormant that month
//   reactivated_players— dormant players who returned that month
//
// DEPOSITS / WITHDRAWALS
//   deposits           — total deposit amount (KES)
//   withdrawals        — total withdrawal amount (KES)
//   deposit_count      — number of deposit transactions
//   withdrawal_count   — number of withdrawal transactions
//   avg_deposit        — average deposit value per transaction
//   failed_deposits    — count of failed deposit attempts
//
// SPORTSBOOK FIELDS
//   sb_bets            — total sportsbook bet count
//   sb_stake           — total sportsbook stake amount (KES)
//   sb_ggr             — sportsbook gross gaming revenue (KES)
//   sb_win_count       — number of sportsbook bets that resulted in a win
//   sb_avg_odds        — average odds across all sportsbook bets
//   sb_parlay_pct      — percentage of bets that were parlays/accumulators
//   sb_cashout_count   — number of bets where cashout was used
//
// SPORTSBOOK TOURNAMENT BREAKDOWN (stake in KES)
//   sb_epl_stake       — English Premier League
//   sb_laliga_stake    — La Liga (Spanish top flight)
//   sb_ucl_stake       — UEFA Champions League
//   sb_serie_a_stake   — Serie A (Italian top flight)
//   sb_bundesliga_stake— Bundesliga (German top flight)
//   sb_afcon_stake     — Africa Cup of Nations
//   sb_kpl_stake       — Kenyan Premier League
//   sb_nba_stake       — NBA Basketball
//   sb_atp_stake       — ATP Tennis
//   sb_rugby_stake     — Rugby Union / Sevens
//
// CASINO FIELDS
//   casino_rounds      — total casino rounds played
//   casino_stake       — total casino stake amount (KES)
//   casino_ggr         — casino gross gaming revenue (KES)
//   casino_slots_stake — stake on slot games
//   casino_live_stake  — stake on live dealer/table games
//   casino_crash_stake — stake on crash games (Aviator etc.)
//   casino_avg_rtp_pct — average RTP experienced by segment (%)
//   casino_jackpot_wins— number of jackpot wins triggered
//   casino_bonus_used  — bonus credit consumed (KES)
//
// GGR TOTALS
//   total_ggr          — combined sportsbook + casino GGR

window.segments = [
  // ───────────────────────────────────────────────────────────
  // SEG1: HIGH ROLLERS
  // ───────────────────────────────────────────────────────────
  {
    id: "seg1",
    name: "High Rollers",
    description: "VIP players with lifetime deposits above KES 80,000. Targeted with exclusive bonuses and personal account managers.",
    color: "#f59e0b",
    is_favorite: true,
    total_players: 5,
    active_players: 4,
    dormant_players: 1,
    total_deposits: 1108000,
    total_withdrawals: 446000,
    total_bets: 1653000,
    avg_deposit_per_player: 221600,
    avg_bet_per_player: 330600,
    monthly_trend: [
      {
        month: "Aug 25",
        // players
        players: 4, active_players: 4, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        // deposits / withdrawals
        deposits: 72000, withdrawals: 28000,
        deposit_count: 38, withdrawal_count: 14,
        avg_deposit: 1895, failed_deposits: 1,
        // sportsbook
        sb_bets: 220, sb_stake: 58000, sb_ggr: 6960,
        sb_win_count: 92, sb_avg_odds: 2.15, sb_parlay_pct: 18, sb_cashout_count: 12,
        sb_epl_stake: 18000, sb_laliga_stake: 11000, sb_ucl_stake: 9000,
        sb_serie_a_stake: 5000, sb_bundesliga_stake: 4000, sb_afcon_stake: 2000,
        sb_kpl_stake: 1500, sb_nba_stake: 3500, sb_atp_stake: 2500, sb_rugby_stake: 1500,
        // casino
        casino_rounds: 310, casino_stake: 50000, casino_ggr: 3500,
        casino_slots_stake: 15000, casino_live_stake: 28000, casino_crash_stake: 7000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 4000,
        // totals
        total_ggr: 10460
      },
      {
        month: "Sep 25",
        players: 4, active_players: 4, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 88000, withdrawals: 35000,
        deposit_count: 45, withdrawal_count: 17,
        avg_deposit: 1956, failed_deposits: 2,
        sb_bets: 265, sb_stake: 72000, sb_ggr: 8640,
        sb_win_count: 108, sb_avg_odds: 2.20, sb_parlay_pct: 20, sb_cashout_count: 15,
        sb_epl_stake: 22000, sb_laliga_stake: 14000, sb_ucl_stake: 12000,
        sb_serie_a_stake: 6000, sb_bundesliga_stake: 5000, sb_afcon_stake: 2500,
        sb_kpl_stake: 2000, sb_nba_stake: 4000, sb_atp_stake: 2500, sb_rugby_stake: 2000,
        casino_rounds: 390, casino_stake: 60000, casino_ggr: 4200,
        casino_slots_stake: 18000, casino_live_stake: 33000, casino_crash_stake: 9000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 5000,
        total_ggr: 12840
      },
      {
        month: "Oct 25",
        players: 4, active_players: 4, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 95000, withdrawals: 40000,
        deposit_count: 50, withdrawal_count: 20,
        avg_deposit: 1900, failed_deposits: 1,
        sb_bets: 290, sb_stake: 82000, sb_ggr: 9840,
        sb_win_count: 118, sb_avg_odds: 2.18, sb_parlay_pct: 22, sb_cashout_count: 18,
        sb_epl_stake: 25000, sb_laliga_stake: 16000, sb_ucl_stake: 13000,
        sb_serie_a_stake: 7000, sb_bundesliga_stake: 5500, sb_afcon_stake: 3000,
        sb_kpl_stake: 2000, sb_nba_stake: 4500, sb_atp_stake: 3000, sb_rugby_stake: 3000,
        casino_rounds: 460, casino_stake: 63000, casino_ggr: 4410,
        casino_slots_stake: 19000, casino_live_stake: 35000, casino_crash_stake: 9000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 5500,
        total_ggr: 14250
      },
      {
        month: "Nov 25",
        players: 5, active_players: 5, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 110000, withdrawals: 48000,
        deposit_count: 58, withdrawal_count: 24,
        avg_deposit: 1897, failed_deposits: 2,
        sb_bets: 350, sb_stake: 98000, sb_ggr: 11760,
        sb_win_count: 140, sb_avg_odds: 2.22, sb_parlay_pct: 24, sb_cashout_count: 22,
        sb_epl_stake: 30000, sb_laliga_stake: 19000, sb_ucl_stake: 16000,
        sb_serie_a_stake: 9000, sb_bundesliga_stake: 6000, sb_afcon_stake: 3500,
        sb_kpl_stake: 2500, sb_nba_stake: 6000, sb_atp_stake: 3500, sb_rugby_stake: 2500,
        casino_rounds: 560, casino_stake: 70000, casino_ggr: 4900,
        casino_slots_stake: 21000, casino_live_stake: 38000, casino_crash_stake: 11000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 7000,
        total_ggr: 16660
      },
      {
        month: "Dec 25",
        players: 5, active_players: 5, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 134000, withdrawals: 62000,
        deposit_count: 70, withdrawal_count: 30,
        avg_deposit: 1914, failed_deposits: 3,
        sb_bets: 430, sb_stake: 125000, sb_ggr: 15000,
        sb_win_count: 172, sb_avg_odds: 2.25, sb_parlay_pct: 26, sb_cashout_count: 28,
        sb_epl_stake: 38000, sb_laliga_stake: 24000, sb_ucl_stake: 20000,
        sb_serie_a_stake: 11000, sb_bundesliga_stake: 8000, sb_afcon_stake: 5000,
        sb_kpl_stake: 3000, sb_nba_stake: 8000, sb_atp_stake: 4500, sb_rugby_stake: 3500,
        casino_rounds: 720, casino_stake: 80000, casino_ggr: 5600,
        casino_slots_stake: 24000, casino_live_stake: 44000, casino_crash_stake: 12000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 9000,
        total_ggr: 20600
      },
      {
        month: "Jan 26",
        players: 5, active_players: 4, dormant_players: 1,
        new_players: 0, churned_players: 1, reactivated_players: 0,
        deposits: 148000, withdrawals: 71000,
        deposit_count: 78, withdrawal_count: 35,
        avg_deposit: 1897, failed_deposits: 2,
        sb_bets: 490, sb_stake: 140000, sb_ggr: 16800,
        sb_win_count: 192, sb_avg_odds: 2.28, sb_parlay_pct: 27, sb_cashout_count: 32,
        sb_epl_stake: 42000, sb_laliga_stake: 27000, sb_ucl_stake: 22000,
        sb_serie_a_stake: 13000, sb_bundesliga_stake: 9000, sb_afcon_stake: 7000,
        sb_kpl_stake: 3500, sb_nba_stake: 8500, sb_atp_stake: 4500, sb_rugby_stake: 3500,
        casino_rounds: 820, casino_stake: 85000, casino_ggr: 5950,
        casino_slots_stake: 25000, casino_live_stake: 47000, casino_crash_stake: 13000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 10000,
        total_ggr: 22750
      }
    ],
    casino_stats: [
      { game: "Lightning Roulette", bets: 520000 },
      { game: "Sweet Bonanza",      bets: 480000 },
      { game: "Crazy Time",         bets: 350000 },
      { game: "Aviator",            bets: 200000 },
      { game: "Live Blackjack",     bets: 103000 }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG2: CASUAL PLAYERS
  // ───────────────────────────────────────────────────────────
  {
    id: "seg2",
    name: "Casual Players",
    description: "Regular players with moderate activity. Lifetime deposits between KES 5,000–80,000. Respond well to reload bonuses.",
    color: "#6366f1",
    is_favorite: true,
    total_players: 7,
    active_players: 5,
    dormant_players: 2,
    total_deposits: 142300,
    total_withdrawals: 51300,
    total_bets: 195500,
    avg_deposit_per_player: 20328,
    avg_bet_per_player: 27928,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 5, active_players: 5, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 15000, withdrawals: 5500,
        deposit_count: 28, withdrawal_count: 12,
        avg_deposit: 536, failed_deposits: 1,
        sb_bets: 68, sb_stake: 12000, sb_ggr: 1440,
        sb_win_count: 28, sb_avg_odds: 1.90, sb_parlay_pct: 10, sb_cashout_count: 4,
        sb_epl_stake: 4500, sb_laliga_stake: 2500, sb_ucl_stake: 1500,
        sb_serie_a_stake: 800, sb_bundesliga_stake: 700, sb_afcon_stake: 500,
        sb_kpl_stake: 400, sb_nba_stake: 600, sb_atp_stake: 300, sb_rugby_stake: 200,
        casino_rounds: 280, casino_stake: 9000, casino_ggr: 630,
        casino_slots_stake: 4500, casino_live_stake: 2800, casino_crash_stake: 1700,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 800,
        total_ggr: 2070
      },
      {
        month: "Sep 25",
        players: 6, active_players: 6, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 18500, withdrawals: 6800,
        deposit_count: 34, withdrawal_count: 14,
        avg_deposit: 544, failed_deposits: 1,
        sb_bets: 82, sb_stake: 14500, sb_ggr: 1740,
        sb_win_count: 33, sb_avg_odds: 1.92, sb_parlay_pct: 11, sb_cashout_count: 5,
        sb_epl_stake: 5500, sb_laliga_stake: 3000, sb_ucl_stake: 2000,
        sb_serie_a_stake: 1000, sb_bundesliga_stake: 800, sb_afcon_stake: 600,
        sb_kpl_stake: 500, sb_nba_stake: 700, sb_atp_stake: 200, sb_rugby_stake: 200,
        casino_rounds: 340, casino_stake: 11500, casino_ggr: 805,
        casino_slots_stake: 5500, casino_live_stake: 3500, casino_crash_stake: 2500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 1000,
        total_ggr: 2545
      },
      {
        month: "Oct 25",
        players: 6, active_players: 6, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 21000, withdrawals: 7900,
        deposit_count: 40, withdrawal_count: 17,
        avg_deposit: 525, failed_deposits: 2,
        sb_bets: 95, sb_stake: 17000, sb_ggr: 2040,
        sb_win_count: 38, sb_avg_odds: 1.95, sb_parlay_pct: 12, sb_cashout_count: 6,
        sb_epl_stake: 6500, sb_laliga_stake: 3500, sb_ucl_stake: 2500,
        sb_serie_a_stake: 1200, sb_bundesliga_stake: 900, sb_afcon_stake: 700,
        sb_kpl_stake: 500, sb_nba_stake: 800, sb_atp_stake: 200, sb_rugby_stake: 200,
        casino_rounds: 390, casino_stake: 13000, casino_ggr: 910,
        casino_slots_stake: 6000, casino_live_stake: 4200, casino_crash_stake: 2800,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 1200,
        total_ggr: 2950
      },
      {
        month: "Nov 25",
        players: 7, active_players: 7, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 25000, withdrawals: 9200,
        deposit_count: 46, withdrawal_count: 20,
        avg_deposit: 543, failed_deposits: 2,
        sb_bets: 110, sb_stake: 20000, sb_ggr: 2400,
        sb_win_count: 44, sb_avg_odds: 1.95, sb_parlay_pct: 13, sb_cashout_count: 7,
        sb_epl_stake: 7500, sb_laliga_stake: 4000, sb_ucl_stake: 3000,
        sb_serie_a_stake: 1500, sb_bundesliga_stake: 1100, sb_afcon_stake: 900,
        sb_kpl_stake: 700, sb_nba_stake: 900, sb_atp_stake: 200, sb_rugby_stake: 200,
        casino_rounds: 460, casino_stake: 15500, casino_ggr: 1085,
        casino_slots_stake: 7500, casino_live_stake: 4800, casino_crash_stake: 3200,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1500,
        total_ggr: 3485
      },
      {
        month: "Dec 25",
        players: 7, active_players: 7, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 28000, withdrawals: 10500,
        deposit_count: 52, withdrawal_count: 23,
        avg_deposit: 538, failed_deposits: 3,
        sb_bets: 125, sb_stake: 23000, sb_ggr: 2760,
        sb_win_count: 49, sb_avg_odds: 1.97, sb_parlay_pct: 14, sb_cashout_count: 8,
        sb_epl_stake: 8500, sb_laliga_stake: 4500, sb_ucl_stake: 3500,
        sb_serie_a_stake: 1800, sb_bundesliga_stake: 1300, sb_afcon_stake: 1000,
        sb_kpl_stake: 800, sb_nba_stake: 1100, sb_atp_stake: 300, sb_rugby_stake: 200,
        casino_rounds: 540, casino_stake: 17000, casino_ggr: 1190,
        casino_slots_stake: 8000, casino_live_stake: 5500, casino_crash_stake: 3500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1800,
        total_ggr: 3950
      },
      {
        month: "Jan 26",
        players: 7, active_players: 5, dormant_players: 2,
        new_players: 0, churned_players: 2, reactivated_players: 0,
        deposits: 32000, withdrawals: 12000,
        deposit_count: 59, withdrawal_count: 26,
        avg_deposit: 542, failed_deposits: 2,
        sb_bets: 140, sb_stake: 26000, sb_ggr: 3120,
        sb_win_count: 55, sb_avg_odds: 1.98, sb_parlay_pct: 15, sb_cashout_count: 9,
        sb_epl_stake: 9500, sb_laliga_stake: 5000, sb_ucl_stake: 4000,
        sb_serie_a_stake: 2200, sb_bundesliga_stake: 1500, sb_afcon_stake: 1200,
        sb_kpl_stake: 900, sb_nba_stake: 1200, sb_atp_stake: 300, sb_rugby_stake: 200,
        casino_rounds: 610, casino_stake: 19500, casino_ggr: 1365,
        casino_slots_stake: 9000, casino_live_stake: 6500, casino_crash_stake: 4000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 2000,
        total_ggr: 4485
      }
    ],
    casino_stats: [
      { game: "Aviator",           bets: 85000 },
      { game: "Sweet Bonanza",     bets: 55000 },
      { game: "Gates of Olympus",  bets: 35000 },
      { game: "Crazy Time",        bets: 20500 },
      { game: "Aviatrix",           bets: 85000 },
      { game: "Jetx",               bets: 70000 },
      { game: "Unicraft",           bets: 45000 },
      { game: "EuroLeague",        bets: 25000 }
    ],
   casino_stats1: [
      { game: "Aviator",           bets: 120 },
      { game: "Sweet Bonanza",     bets: 300 },
      { game: "Gates of Olympus",  bets: 97 },
      { game: "Crazy Time",        bets: 105 },
      { game: "Aviatrix",           bets: 190 },
      { game: "Jetx",              bets: 130 },
      { game: "unicraft",           bets: 75 },
      { game: "EuroLeague",        bets: 145 }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG3: NEW & AT-RISK
  // ───────────────────────────────────────────────────────────
  {
    id: "seg3",
    name: "New & At-Risk",
    description: "Players registered within 12 months OR dormant with < 5 sessions. Targeted with reactivation campaigns and first-deposit match offers.",
    color: "#10b981",
    is_favorite: false,
    total_players: 6,
    active_players: 3,
    dormant_players: 3,
    total_deposits: 26400,
    total_withdrawals: 6100,
    total_bets: 35600,
    avg_deposit_per_player: 4400,
    avg_bet_per_player: 5933,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 2, active_players: 2, dormant_players: 0,
        new_players: 2, churned_players: 0, reactivated_players: 0,
        deposits: 1800, withdrawals: 400,
        deposit_count: 6, withdrawal_count: 2,
        avg_deposit: 300, failed_deposits: 1,
        sb_bets: 22, sb_stake: 1400, sb_ggr: 168,
        sb_win_count: 8, sb_avg_odds: 1.75, sb_parlay_pct: 5, sb_cashout_count: 1,
        sb_epl_stake: 500, sb_laliga_stake: 200, sb_ucl_stake: 150,
        sb_serie_a_stake: 100, sb_bundesliga_stake: 100, sb_afcon_stake: 100,
        sb_kpl_stake: 80, sb_nba_stake: 100, sb_atp_stake: 50, sb_rugby_stake: 20,
        casino_rounds: 55, casino_stake: 1100, casino_ggr: 77,
        casino_slots_stake: 500, casino_live_stake: 200, casino_crash_stake: 400,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200,
        total_ggr: 245
      },
      {
        month: "Sep 25",
        players: 3, active_players: 3, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 2400, withdrawals: 520,
        deposit_count: 8, withdrawal_count: 3,
        avg_deposit: 300, failed_deposits: 1,
        sb_bets: 28, sb_stake: 1900, sb_ggr: 228,
        sb_win_count: 10, sb_avg_odds: 1.78, sb_parlay_pct: 6, sb_cashout_count: 1,
        sb_epl_stake: 700, sb_laliga_stake: 300, sb_ucl_stake: 200,
        sb_serie_a_stake: 150, sb_bundesliga_stake: 120, sb_afcon_stake: 120,
        sb_kpl_stake: 100, sb_nba_stake: 120, sb_atp_stake: 60, sb_rugby_stake: 30,
        casino_rounds: 68, casino_stake: 1400, casino_ggr: 98,
        casino_slots_stake: 600, casino_live_stake: 300, casino_crash_stake: 500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300,
        total_ggr: 326
      },
      {
        month: "Oct 25",
        players: 4, active_players: 4, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 3100, withdrawals: 680,
        deposit_count: 10, withdrawal_count: 4,
        avg_deposit: 310, failed_deposits: 1,
        sb_bets: 36, sb_stake: 2500, sb_ggr: 300,
        sb_win_count: 13, sb_avg_odds: 1.80, sb_parlay_pct: 7, sb_cashout_count: 2,
        sb_epl_stake: 900, sb_laliga_stake: 400, sb_ucl_stake: 300,
        sb_serie_a_stake: 200, sb_bundesliga_stake: 150, sb_afcon_stake: 150,
        sb_kpl_stake: 120, sb_nba_stake: 150, sb_atp_stake: 80, sb_rugby_stake: 50,
        casino_rounds: 88, casino_stake: 1900, casino_ggr: 133,
        casino_slots_stake: 800, casino_live_stake: 500, casino_crash_stake: 600,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 400,
        total_ggr: 433
      },
      {
        month: "Nov 25",
        players: 5, active_players: 5, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 4200, withdrawals: 900,
        deposit_count: 14, withdrawal_count: 5,
        avg_deposit: 300, failed_deposits: 2,
        sb_bets: 46, sb_stake: 3400, sb_ggr: 408,
        sb_win_count: 17, sb_avg_odds: 1.82, sb_parlay_pct: 8, sb_cashout_count: 2,
        sb_epl_stake: 1200, sb_laliga_stake: 600, sb_ucl_stake: 450,
        sb_serie_a_stake: 300, sb_bundesliga_stake: 200, sb_afcon_stake: 200,
        sb_kpl_stake: 150, sb_nba_stake: 200, sb_atp_stake: 100, sb_rugby_stake: 0,
        casino_rounds: 112, casino_stake: 2500, casino_ggr: 175,
        casino_slots_stake: 1000, casino_live_stake: 700, casino_crash_stake: 800,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600,
        total_ggr: 583
      },
      {
        month: "Dec 25",
        players: 6, active_players: 6, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 5800, withdrawals: 1300,
        deposit_count: 18, withdrawal_count: 7,
        avg_deposit: 322, failed_deposits: 2,
        sb_bets: 56, sb_stake: 4800, sb_ggr: 576,
        sb_win_count: 21, sb_avg_odds: 1.85, sb_parlay_pct: 9, sb_cashout_count: 3,
        sb_epl_stake: 1800, sb_laliga_stake: 800, sb_ucl_stake: 600,
        sb_serie_a_stake: 400, sb_bundesliga_stake: 300, sb_afcon_stake: 250,
        sb_kpl_stake: 200, sb_nba_stake: 250, sb_atp_stake: 100, sb_rugby_stake: 100,
        casino_rounds: 148, casino_stake: 3300, casino_ggr: 231,
        casino_slots_stake: 1400, casino_live_stake: 900, casino_crash_stake: 1000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 800,
        total_ggr: 807
      },
      {
        month: "Jan 26",
        players: 6, active_players: 3, dormant_players: 3,
        new_players: 0, churned_players: 3, reactivated_players: 0,
        deposits: 7200, withdrawals: 1600,
        deposit_count: 22, withdrawal_count: 8,
        avg_deposit: 327, failed_deposits: 2,
        sb_bets: 68, sb_stake: 6000, sb_ggr: 720,
        sb_win_count: 26, sb_avg_odds: 1.88, sb_parlay_pct: 10, sb_cashout_count: 4,
        sb_epl_stake: 2200, sb_laliga_stake: 1000, sb_ucl_stake: 800,
        sb_serie_a_stake: 500, sb_bundesliga_stake: 380, sb_afcon_stake: 300,
        sb_kpl_stake: 250, sb_nba_stake: 300, sb_atp_stake: 150, sb_rugby_stake: 120,
        casino_rounds: 182, casino_stake: 4100, casino_ggr: 287,
        casino_slots_stake: 1800, casino_live_stake: 1100, casino_crash_stake: 1200,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 900,
        total_ggr: 1007
      }
    ],
    casino_stats: [
      { game: "Aviator",      bets: 15000 },
      { game: "Sweet Bonanza",bets: 8000  },
      { game: "Crash Games",  bets: 7600  },
      { game: "Slots",        bets: 5000  }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG4: WEEKEND WARRIORS
  // ───────────────────────────────────────────────────────────
  {
    id: "seg4",
    name: "Weekend Warriors",
    description: "Players most active on Saturdays and Sundays.",
    color: "#ec4899",
    is_favorite: false,
    total_players: 12,
    total_deposits: 45000,
    total_withdrawals: 15000,
    total_bets: 62000,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 8, active_players: 8, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 5000, withdrawals: 1000,
        deposit_count: 20, withdrawal_count: 6,
        avg_deposit: 250, failed_deposits: 1,
        sb_bets: 24, sb_stake: 5200, sb_ggr: 624,
        sb_win_count: 9, sb_avg_odds: 1.88, sb_parlay_pct: 30, sb_cashout_count: 2,
        sb_epl_stake: 2000, sb_laliga_stake: 900, sb_ucl_stake: 700,
        sb_serie_a_stake: 400, sb_bundesliga_stake: 300, sb_afcon_stake: 200,
        sb_kpl_stake: 200, sb_nba_stake: 200, sb_atp_stake: 100, sb_rugby_stake: 200,
        casino_rounds: 120, casino_stake: 2800, casino_ggr: 196,
        casino_slots_stake: 1200, casino_live_stake: 900, casino_crash_stake: 700,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300,
        total_ggr: 820
      },
      {
        month: "Sep 25",
        players: 9, active_players: 9, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 6500, withdrawals: 1500,
        deposit_count: 25, withdrawal_count: 8,
        avg_deposit: 260, failed_deposits: 1,
        sb_bets: 32, sb_stake: 6500, sb_ggr: 780,
        sb_win_count: 12, sb_avg_odds: 1.90, sb_parlay_pct: 32, sb_cashout_count: 3,
        sb_epl_stake: 2500, sb_laliga_stake: 1200, sb_ucl_stake: 900,
        sb_serie_a_stake: 500, sb_bundesliga_stake: 400, sb_afcon_stake: 250,
        sb_kpl_stake: 250, sb_nba_stake: 250, sb_atp_stake: 150, sb_rugby_stake: 100,
        casino_rounds: 148, casino_stake: 3000, casino_ggr: 210,
        casino_slots_stake: 1300, casino_live_stake: 1000, casino_crash_stake: 700,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 350,
        total_ggr: 990
      },
      {
        month: "Oct 25",
        players: 10, active_players: 10, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 7200, withdrawals: 2000,
        deposit_count: 28, withdrawal_count: 10,
        avg_deposit: 257, failed_deposits: 2,
        sb_bets: 38, sb_stake: 7500, sb_ggr: 900,
        sb_win_count: 14, sb_avg_odds: 1.92, sb_parlay_pct: 33, sb_cashout_count: 4,
        sb_epl_stake: 2900, sb_laliga_stake: 1400, sb_ucl_stake: 1100,
        sb_serie_a_stake: 600, sb_bundesliga_stake: 450, sb_afcon_stake: 300,
        sb_kpl_stake: 250, sb_nba_stake: 300, sb_atp_stake: 100, sb_rugby_stake: 100,
        casino_rounds: 165, casino_stake: 3500, casino_ggr: 245,
        casino_slots_stake: 1500, casino_live_stake: 1200, casino_crash_stake: 800,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 400,
        total_ggr: 1145
      },
      {
        month: "Nov 25",
        players: 11, active_players: 11, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 8100, withdrawals: 3200,
        deposit_count: 32, withdrawal_count: 14,
        avg_deposit: 253, failed_deposits: 2,
        sb_bets: 45, sb_stake: 8500, sb_ggr: 1020,
        sb_win_count: 17, sb_avg_odds: 1.93, sb_parlay_pct: 34, sb_cashout_count: 5,
        sb_epl_stake: 3200, sb_laliga_stake: 1600, sb_ucl_stake: 1300,
        sb_serie_a_stake: 700, sb_bundesliga_stake: 500, sb_afcon_stake: 350,
        sb_kpl_stake: 300, sb_nba_stake: 350, sb_atp_stake: 100, sb_rugby_stake: 100,
        casino_rounds: 188, casino_stake: 4000, casino_ggr: 280,
        casino_slots_stake: 1700, casino_live_stake: 1400, casino_crash_stake: 900,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 500,
        total_ggr: 1300
      },
      {
        month: "Dec 25",
        players: 12, active_players: 12, dormant_players: 0,
        new_players: 1, churned_players: 0, reactivated_players: 0,
        deposits: 9200, withdrawals: 4000,
        deposit_count: 36, withdrawal_count: 16,
        avg_deposit: 256, failed_deposits: 3,
        sb_bets: 52, sb_stake: 10000, sb_ggr: 1200,
        sb_win_count: 19, sb_avg_odds: 1.95, sb_parlay_pct: 35, sb_cashout_count: 6,
        sb_epl_stake: 3800, sb_laliga_stake: 1900, sb_ucl_stake: 1600,
        sb_serie_a_stake: 900, sb_bundesliga_stake: 600, sb_afcon_stake: 400,
        sb_kpl_stake: 350, sb_nba_stake: 450, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 218, casino_stake: 5000, casino_ggr: 350,
        casino_slots_stake: 2000, casino_live_stake: 1700, casino_crash_stake: 1300,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 700,
        total_ggr: 1550
      },
      {
        month: "Jan 26",
        players: 12, active_players: 10, dormant_players: 2,
        new_players: 0, churned_players: 2, reactivated_players: 0,
        deposits: 9000, withdrawals: 3300,
        deposit_count: 35, withdrawal_count: 14,
        avg_deposit: 257, failed_deposits: 2,
        sb_bets: 50, sb_stake: 3600, sb_ggr: 432,
        sb_win_count: 18, sb_avg_odds: 1.90, sb_parlay_pct: 32, sb_cashout_count: 5,
        sb_epl_stake: 1400, sb_laliga_stake: 700, sb_ucl_stake: 550,
        sb_serie_a_stake: 300, sb_bundesliga_stake: 200, sb_afcon_stake: 150,
        sb_kpl_stake: 100, sb_nba_stake: 200, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 198, casino_stake: 2400, casino_ggr: 168,
        casino_slots_stake: 1000, casino_live_stake: 800, casino_crash_stake: 600,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300,
        total_ggr: 600
      }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG5: MOBILE APP USERS
  // ───────────────────────────────────────────────────────────
  {
    id: "seg5",
    name: "Mobile App Users",
    description: "Primary usage via iOS/Android apps.",
    color: "#8b5cf6",
    is_favorite: false,
    total_players: 45,
    total_deposits: 120000,
    total_withdrawals: 40000,
    total_bets: 180000,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 30, active_players: 28, dormant_players: 2,
        new_players: 4, churned_players: 1, reactivated_players: 1,
        deposits: 15000, withdrawals: 5000,
        deposit_count: 65, withdrawal_count: 22,
        avg_deposit: 231, failed_deposits: 4,
        sb_bets: 62, sb_stake: 9000, sb_ggr: 1080,
        sb_win_count: 24, sb_avg_odds: 1.85, sb_parlay_pct: 20, sb_cashout_count: 6,
        sb_epl_stake: 3000, sb_laliga_stake: 1500, sb_ucl_stake: 1200,
        sb_serie_a_stake: 700, sb_bundesliga_stake: 500, sb_afcon_stake: 500,
        sb_kpl_stake: 500, sb_nba_stake: 700, sb_atp_stake: 200, sb_rugby_stake: 200,
        casino_rounds: 680, casino_stake: 13000, casino_ggr: 910,
        casino_slots_stake: 5500, casino_live_stake: 4000, casino_crash_stake: 3500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1200,
        total_ggr: 1990
      },
      {
        month: "Sep 25",
        players: 35, active_players: 32, dormant_players: 3,
        new_players: 6, churned_players: 1, reactivated_players: 1,
        deposits: 18000, withdrawals: 6000,
        deposit_count: 76, withdrawal_count: 26,
        avg_deposit: 237, failed_deposits: 5,
        sb_bets: 75, sb_stake: 11000, sb_ggr: 1320,
        sb_win_count: 29, sb_avg_odds: 1.87, sb_parlay_pct: 21, sb_cashout_count: 7,
        sb_epl_stake: 3500, sb_laliga_stake: 1800, sb_ucl_stake: 1500,
        sb_serie_a_stake: 900, sb_bundesliga_stake: 700, sb_afcon_stake: 600,
        sb_kpl_stake: 600, sb_nba_stake: 800, sb_atp_stake: 300, sb_rugby_stake: 300,
        casino_rounds: 820, casino_stake: 14000, casino_ggr: 980,
        casino_slots_stake: 6000, casino_live_stake: 4500, casino_crash_stake: 3500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1400,
        total_ggr: 2300
      },
      {
        month: "Oct 25",
        players: 40, active_players: 37, dormant_players: 3,
        new_players: 6, churned_players: 1, reactivated_players: 1,
        deposits: 20000, withdrawals: 6500,
        deposit_count: 85, withdrawal_count: 28,
        avg_deposit: 235, failed_deposits: 5,
        sb_bets: 88, sb_stake: 13000, sb_ggr: 1560,
        sb_win_count: 34, sb_avg_odds: 1.88, sb_parlay_pct: 22, sb_cashout_count: 8,
        sb_epl_stake: 4200, sb_laliga_stake: 2100, sb_ucl_stake: 1800,
        sb_serie_a_stake: 1000, sb_bundesliga_stake: 800, sb_afcon_stake: 700,
        sb_kpl_stake: 700, sb_nba_stake: 900, sb_atp_stake: 400, sb_rugby_stake: 400,
        casino_rounds: 960, casino_stake: 15000, casino_ggr: 1050,
        casino_slots_stake: 6500, casino_live_stake: 5000, casino_crash_stake: 3500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1600,
        total_ggr: 2610
      },
      {
        month: "Nov 25",
        players: 42, active_players: 39, dormant_players: 3,
        new_players: 3, churned_players: 1, reactivated_players: 0,
        deposits: 22000, withdrawals: 7500,
        deposit_count: 92, withdrawal_count: 32,
        avg_deposit: 239, failed_deposits: 6,
        sb_bets: 102, sb_stake: 15000, sb_ggr: 1800,
        sb_win_count: 39, sb_avg_odds: 1.90, sb_parlay_pct: 23, sb_cashout_count: 9,
        sb_epl_stake: 4800, sb_laliga_stake: 2400, sb_ucl_stake: 2000,
        sb_serie_a_stake: 1200, sb_bundesliga_stake: 900, sb_afcon_stake: 800,
        sb_kpl_stake: 800, sb_nba_stake: 1100, sb_atp_stake: 500, sb_rugby_stake: 500,
        casino_rounds: 1100, casino_stake: 17000, casino_ggr: 1190,
        casino_slots_stake: 7500, casino_live_stake: 5500, casino_crash_stake: 4000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 2000,
        total_ggr: 2990
      },
      {
        month: "Dec 25",
        players: 45, active_players: 43, dormant_players: 2,
        new_players: 3, churned_players: 0, reactivated_players: 1,
        deposits: 25000, withdrawals: 8000,
        deposit_count: 108, withdrawal_count: 36,
        avg_deposit: 231, failed_deposits: 7,
        sb_bets: 118, sb_stake: 18000, sb_ggr: 2160,
        sb_win_count: 45, sb_avg_odds: 1.92, sb_parlay_pct: 24, sb_cashout_count: 11,
        sb_epl_stake: 5800, sb_laliga_stake: 2900, sb_ucl_stake: 2400,
        sb_serie_a_stake: 1500, sb_bundesliga_stake: 1100, sb_afcon_stake: 1000,
        sb_kpl_stake: 1000, sb_nba_stake: 1400, sb_atp_stake: 500, sb_rugby_stake: 400,
        casino_rounds: 1340, casino_stake: 20000, casino_ggr: 1400,
        casino_slots_stake: 8500, casino_live_stake: 6500, casino_crash_stake: 5000,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 2500,
        total_ggr: 3560
      },
      {
        month: "Jan 26",
        players: 45, active_players: 40, dormant_players: 5,
        new_players: 0, churned_players: 3, reactivated_players: 2,
        deposits: 20000, withdrawals: 7000,
        deposit_count: 88, withdrawal_count: 30,
        avg_deposit: 227, failed_deposits: 5,
        sb_bets: 108, sb_stake: 16000, sb_ggr: 1920,
        sb_win_count: 41, sb_avg_odds: 1.91, sb_parlay_pct: 22, sb_cashout_count: 10,
        sb_epl_stake: 5200, sb_laliga_stake: 2600, sb_ucl_stake: 2200,
        sb_serie_a_stake: 1300, sb_bundesliga_stake: 1000, sb_afcon_stake: 900,
        sb_kpl_stake: 900, sb_nba_stake: 1200, sb_atp_stake: 400, sb_rugby_stake: 300,
        casino_rounds: 1200, casino_stake: 19000, casino_ggr: 1330,
        casino_slots_stake: 8000, casino_live_stake: 6200, casino_crash_stake: 4800,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 2200,
        total_ggr: 3250
      }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG6: FOOTBALL FANS
  // ───────────────────────────────────────────────────────────
  {
    id: "seg6",
    name: "Football Fans",
    description: "90% of betting volume on Football markets.",
    color: "#3b82f6",
    is_favorite: false,
    total_players: 30,
    total_deposits: 85000,
    total_withdrawals: 32000,
    total_bets: 110000,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 20, active_players: 19, dormant_players: 1,
        new_players: 2, churned_players: 0, reactivated_players: 1,
        deposits: 10000, withdrawals: 3000,
        deposit_count: 42, withdrawal_count: 14,
        avg_deposit: 238, failed_deposits: 2,
        sb_bets: 72, sb_stake: 13500, sb_ggr: 1620,
        sb_win_count: 28, sb_avg_odds: 1.88, sb_parlay_pct: 35, sb_cashout_count: 8,
        sb_epl_stake: 5500, sb_laliga_stake: 2500, sb_ucl_stake: 2000,
        sb_serie_a_stake: 1000, sb_bundesliga_stake: 800, sb_afcon_stake: 700,
        sb_kpl_stake: 600, sb_nba_stake: 200, sb_atp_stake: 100, sb_rugby_stake: 100,
        casino_rounds: 145, casino_stake: 1500, casino_ggr: 105,
        casino_slots_stake: 600, casino_live_stake: 500, casino_crash_stake: 400,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200,
        total_ggr: 1725
      },
      {
        month: "Sep 25",
        players: 22, active_players: 21, dormant_players: 1,
        new_players: 2, churned_players: 0, reactivated_players: 0,
        deposits: 12000, withdrawals: 4500,
        deposit_count: 50, withdrawal_count: 18,
        avg_deposit: 240, failed_deposits: 2,
        sb_bets: 86, sb_stake: 16200, sb_ggr: 1944,
        sb_win_count: 33, sb_avg_odds: 1.90, sb_parlay_pct: 36, sb_cashout_count: 9,
        sb_epl_stake: 6500, sb_laliga_stake: 3000, sb_ucl_stake: 2500,
        sb_serie_a_stake: 1300, sb_bundesliga_stake: 1000, sb_afcon_stake: 800,
        sb_kpl_stake: 700, sb_nba_stake: 200, sb_atp_stake: 100, sb_rugby_stake: 100,
        casino_rounds: 170, casino_stake: 1800, casino_ggr: 126,
        casino_slots_stake: 700, casino_live_stake: 600, casino_crash_stake: 500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 250,
        total_ggr: 2070
      },
      {
        month: "Oct 25",
        players: 25, active_players: 24, dormant_players: 1,
        new_players: 3, churned_players: 0, reactivated_players: 0,
        deposits: 14000, withdrawals: 5000,
        deposit_count: 58, withdrawal_count: 20,
        avg_deposit: 241, failed_deposits: 3,
        sb_bets: 99, sb_stake: 18000, sb_ggr: 2160,
        sb_win_count: 37, sb_avg_odds: 1.92, sb_parlay_pct: 37, sb_cashout_count: 10,
        sb_epl_stake: 7200, sb_laliga_stake: 3400, sb_ucl_stake: 2900,
        sb_serie_a_stake: 1500, sb_bundesliga_stake: 1200, sb_afcon_stake: 900,
        sb_kpl_stake: 800, sb_nba_stake: 0, sb_atp_stake: 100, sb_rugby_stake: 0,
        casino_rounds: 192, casino_stake: 2000, casino_ggr: 140,
        casino_slots_stake: 800, casino_live_stake: 700, casino_crash_stake: 500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300,
        total_ggr: 2300
      },
      {
        month: "Nov 25",
        players: 28, active_players: 27, dormant_players: 1,
        new_players: 3, churned_players: 0, reactivated_players: 0,
        deposits: 16000, withdrawals: 6000,
        deposit_count: 66, withdrawal_count: 24,
        avg_deposit: 242, failed_deposits: 3,
        sb_bets: 117, sb_stake: 19800, sb_ggr: 2376,
        sb_win_count: 44, sb_avg_odds: 1.93, sb_parlay_pct: 38, sb_cashout_count: 12,
        sb_epl_stake: 8000, sb_laliga_stake: 3800, sb_ucl_stake: 3200,
        sb_serie_a_stake: 1800, sb_bundesliga_stake: 1400, sb_afcon_stake: 1000,
        sb_kpl_stake: 900, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 700,
        casino_rounds: 218, casino_stake: 2200, casino_ggr: 154,
        casino_slots_stake: 900, casino_live_stake: 800, casino_crash_stake: 500,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 350,
        total_ggr: 2530
      },
      {
        month: "Dec 25",
        players: 30, active_players: 29, dormant_players: 1,
        new_players: 2, churned_players: 0, reactivated_players: 0,
        deposits: 18000, withdrawals: 8000,
        deposit_count: 74, withdrawal_count: 30,
        avg_deposit: 243, failed_deposits: 4,
        sb_bets: 144, sb_stake: 22500, sb_ggr: 2700,
        sb_win_count: 54, sb_avg_odds: 1.95, sb_parlay_pct: 40, sb_cashout_count: 15,
        sb_epl_stake: 9000, sb_laliga_stake: 4200, sb_ucl_stake: 3600,
        sb_serie_a_stake: 2100, sb_bundesliga_stake: 1600, sb_afcon_stake: 1200,
        sb_kpl_stake: 1000, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 800,
        casino_rounds: 242, casino_stake: 2500, casino_ggr: 175,
        casino_slots_stake: 1000, casino_live_stake: 900, casino_crash_stake: 600,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 400,
        total_ggr: 2875
      },
      {
        month: "Jan 26",
        players: 30, active_players: 26, dormant_players: 4,
        new_players: 0, churned_players: 3, reactivated_players: 2,
        deposits: 15000, withdrawals: 5500,
        deposit_count: 62, withdrawal_count: 22,
        avg_deposit: 242, failed_deposits: 3,
        sb_bets: 126, sb_stake: 9000, sb_ggr: 1080,
        sb_win_count: 47, sb_avg_odds: 1.92, sb_parlay_pct: 38, sb_cashout_count: 12,
        sb_epl_stake: 3600, sb_laliga_stake: 1700, sb_ucl_stake: 1400,
        sb_serie_a_stake: 800, sb_bundesliga_stake: 600, sb_afcon_stake: 500,
        sb_kpl_stake: 400, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 210, casino_stake: 1000, casino_ggr: 70,
        casino_slots_stake: 400, casino_live_stake: 350, casino_crash_stake: 250,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 150,
        total_ggr: 1150
      }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG7: HIGH CHURN RISK
  // ───────────────────────────────────────────────────────────
  {
    id: "seg7",
    name: "High Churn Risk",
    description: "Previously active players with no activity in 14 days.",
    color: "#ef4444",
    is_favorite: false,
    total_players: 15,
    total_deposits: 12000,
    total_withdrawals: 4500,
    total_bets: 18000,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 15, active_players: 10, dormant_players: 5,
        new_players: 0, churned_players: 3, reactivated_players: 0,
        deposits: 3000, withdrawals: 1000,
        deposit_count: 16, withdrawal_count: 6,
        avg_deposit: 188, failed_deposits: 2,
        sb_bets: 16, sb_stake: 2700, sb_ggr: 324,
        sb_win_count: 6, sb_avg_odds: 1.82, sb_parlay_pct: 12, sb_cashout_count: 1,
        sb_epl_stake: 1000, sb_laliga_stake: 500, sb_ucl_stake: 400,
        sb_serie_a_stake: 200, sb_bundesliga_stake: 200, sb_afcon_stake: 150,
        sb_kpl_stake: 100, sb_nba_stake: 100, sb_atp_stake: 50, sb_rugby_stake: 0,
        casino_rounds: 78, casino_stake: 1800, casino_ggr: 126,
        casino_slots_stake: 800, casino_live_stake: 600, casino_crash_stake: 400,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200,
        total_ggr: 450
      },
      {
        month: "Sep 25",
        players: 14, active_players: 9, dormant_players: 5,
        new_players: 0, churned_players: 2, reactivated_players: 1,
        deposits: 2500, withdrawals: 800,
        deposit_count: 14, withdrawal_count: 5,
        avg_deposit: 179, failed_deposits: 2,
        sb_bets: 13, sb_stake: 2300, sb_ggr: 276,
        sb_win_count: 5, sb_avg_odds: 1.80, sb_parlay_pct: 11, sb_cashout_count: 1,
        sb_epl_stake: 900, sb_laliga_stake: 450, sb_ucl_stake: 350,
        sb_serie_a_stake: 180, sb_bundesliga_stake: 150, sb_afcon_stake: 120,
        sb_kpl_stake: 80, sb_nba_stake: 80, sb_atp_stake: 20, sb_rugby_stake: 0,
        casino_rounds: 65, casino_stake: 1500, casino_ggr: 105,
        casino_slots_stake: 700, casino_live_stake: 500, casino_crash_stake: 300,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 150,
        total_ggr: 381
      },
      {
        month: "Oct 25",
        players: 12, active_players: 7, dormant_players: 5,
        new_players: 0, churned_players: 2, reactivated_players: 0,
        deposits: 2000, withdrawals: 700,
        deposit_count: 12, withdrawal_count: 4,
        avg_deposit: 167, failed_deposits: 2,
        sb_bets: 10, sb_stake: 1800, sb_ggr: 216,
        sb_win_count: 4, sb_avg_odds: 1.78, sb_parlay_pct: 10, sb_cashout_count: 1,
        sb_epl_stake: 700, sb_laliga_stake: 350, sb_ucl_stake: 280,
        sb_serie_a_stake: 150, sb_bundesliga_stake: 120, sb_afcon_stake: 100,
        sb_kpl_stake: 60, sb_nba_stake: 60, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 52, casino_stake: 1200, casino_ggr: 84,
        casino_slots_stake: 550, casino_live_stake: 400, casino_crash_stake: 250,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 100,
        total_ggr: 300
      },
      {
        month: "Nov 25",
        players: 10, active_players: 5, dormant_players: 5,
        new_players: 0, churned_players: 2, reactivated_players: 0,
        deposits: 1800, withdrawals: 600,
        deposit_count: 10, withdrawal_count: 4,
        avg_deposit: 180, failed_deposits: 1,
        sb_bets: 8, sb_stake: 1500, sb_ggr: 180,
        sb_win_count: 3, sb_avg_odds: 1.76, sb_parlay_pct: 9, sb_cashout_count: 0,
        sb_epl_stake: 600, sb_laliga_stake: 300, sb_ucl_stake: 240,
        sb_serie_a_stake: 120, sb_bundesliga_stake: 100, sb_afcon_stake: 80,
        sb_kpl_stake: 40, sb_nba_stake: 40, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 42, casino_stake: 1000, casino_ggr: 70,
        casino_slots_stake: 450, casino_live_stake: 350, casino_crash_stake: 200,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 80,
        total_ggr: 250
      },
      {
        month: "Dec 25",
        players: 8, active_players: 4, dormant_players: 4,
        new_players: 0, churned_players: 2, reactivated_players: 0,
        deposits: 1500, withdrawals: 900,
        deposit_count: 8, withdrawal_count: 5,
        avg_deposit: 188, failed_deposits: 1,
        sb_bets: 6, sb_stake: 1300, sb_ggr: 156,
        sb_win_count: 2, sb_avg_odds: 1.74, sb_parlay_pct: 8, sb_cashout_count: 0,
        sb_epl_stake: 500, sb_laliga_stake: 250, sb_ucl_stake: 200,
        sb_serie_a_stake: 100, sb_bundesliga_stake: 80, sb_afcon_stake: 80,
        sb_kpl_stake: 40, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 50,
        casino_rounds: 32, casino_stake: 900, casino_ggr: 63,
        casino_slots_stake: 400, casino_live_stake: 300, casino_crash_stake: 200,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 60,
        total_ggr: 219
      },
      {
        month: "Jan 26",
        players: 7, active_players: 3, dormant_players: 4,
        new_players: 0, churned_players: 1, reactivated_players: 0,
        deposits: 1200, withdrawals: 500,
        deposit_count: 7, withdrawal_count: 3,
        avg_deposit: 171, failed_deposits: 1,
        sb_bets: 5, sb_stake: 1200, sb_ggr: 144,
        sb_win_count: 2, sb_avg_odds: 1.72, sb_parlay_pct: 8, sb_cashout_count: 0,
        sb_epl_stake: 500, sb_laliga_stake: 240, sb_ucl_stake: 190,
        sb_serie_a_stake: 100, sb_bundesliga_stake: 80, sb_afcon_stake: 60,
        sb_kpl_stake: 30, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 25, casino_stake: 800, casino_ggr: 56,
        casino_slots_stake: 360, casino_live_stake: 280, casino_crash_stake: 160,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 50,
        total_ggr: 200
      }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG8: RECENTLY REACTIVATED
  // ───────────────────────────────────────────────────────────
  {
    id: "seg8",
    name: "Recently Reactivated",
    description: "Returned after > 30 days of inactivity.",
    color: "#10b981",
    is_favorite: false,
    total_players: 8,
    total_deposits: 22000,
    total_withdrawals: 8000,
    total_bets: 35000,
    monthly_trend: [
      {
        month: "Aug 25",
        players: 0, active_players: 0, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 0,
        deposits: 0, withdrawals: 0,
        deposit_count: 0, withdrawal_count: 0,
        avg_deposit: 0, failed_deposits: 0,
        sb_bets: 0, sb_stake: 0, sb_ggr: 0,
        sb_win_count: 0, sb_avg_odds: 0, sb_parlay_pct: 0, sb_cashout_count: 0,
        sb_epl_stake: 0, sb_laliga_stake: 0, sb_ucl_stake: 0,
        sb_serie_a_stake: 0, sb_bundesliga_stake: 0, sb_afcon_stake: 0,
        sb_kpl_stake: 0, sb_nba_stake: 0, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 0, casino_stake: 0, casino_ggr: 0,
        casino_slots_stake: 0, casino_live_stake: 0, casino_crash_stake: 0,
        casino_avg_rtp_pct: 0, casino_jackpot_wins: 0, casino_bonus_used: 0,
        total_ggr: 0
      },
      {
        month: "Sep 25",
        players: 2, active_players: 2, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 2,
        deposits: 2000, withdrawals: 500,
        deposit_count: 8, withdrawal_count: 3,
        avg_deposit: 250, failed_deposits: 1,
        sb_bets: 7, sb_stake: 1800, sb_ggr: 216,
        sb_win_count: 3, sb_avg_odds: 1.82, sb_parlay_pct: 15, sb_cashout_count: 1,
        sb_epl_stake: 700, sb_laliga_stake: 350, sb_ucl_stake: 280,
        sb_serie_a_stake: 150, sb_bundesliga_stake: 120, sb_afcon_stake: 100,
        sb_kpl_stake: 60, sb_nba_stake: 40, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 48, casino_stake: 1200, casino_ggr: 84,
        casino_slots_stake: 500, casino_live_stake: 400, casino_crash_stake: 300,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300,
        total_ggr: 300
      },
      {
        month: "Oct 25",
        players: 4, active_players: 4, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 2,
        deposits: 4000, withdrawals: 1200,
        deposit_count: 15, withdrawal_count: 6,
        avg_deposit: 267, failed_deposits: 1,
        sb_bets: 14, sb_stake: 3800, sb_ggr: 456,
        sb_win_count: 5, sb_avg_odds: 1.84, sb_parlay_pct: 16, sb_cashout_count: 1,
        sb_epl_stake: 1500, sb_laliga_stake: 750, sb_ucl_stake: 600,
        sb_serie_a_stake: 300, sb_bundesliga_stake: 250, sb_afcon_stake: 200,
        sb_kpl_stake: 100, sb_nba_stake: 100, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 90, casino_stake: 2700, casino_ggr: 189,
        casino_slots_stake: 1200, casino_live_stake: 900, casino_crash_stake: 600,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600,
        total_ggr: 645
      },
      {
        month: "Nov 25",
        players: 6, active_players: 6, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 2,
        deposits: 5000, withdrawals: 1800,
        deposit_count: 20, withdrawal_count: 8,
        avg_deposit: 250, failed_deposits: 1,
        sb_bets: 20, sb_stake: 5000, sb_ggr: 600,
        sb_win_count: 8, sb_avg_odds: 1.86, sb_parlay_pct: 18, sb_cashout_count: 2,
        sb_epl_stake: 2000, sb_laliga_stake: 1000, sb_ucl_stake: 800,
        sb_serie_a_stake: 400, sb_bundesliga_stake: 300, sb_afcon_stake: 250,
        sb_kpl_stake: 130, sb_nba_stake: 80, sb_atp_stake: 40, sb_rugby_stake: 0,
        casino_rounds: 128, casino_stake: 3000, casino_ggr: 210,
        casino_slots_stake: 1300, casino_live_stake: 1000, casino_crash_stake: 700,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 700,
        total_ggr: 810
      },
      {
        month: "Dec 25",
        players: 8, active_players: 8, dormant_players: 0,
        new_players: 0, churned_players: 0, reactivated_players: 2,
        deposits: 6000, withdrawals: 2500,
        deposit_count: 24, withdrawal_count: 10,
        avg_deposit: 250, failed_deposits: 2,
        sb_bets: 25, sb_stake: 6000, sb_ggr: 720,
        sb_win_count: 9, sb_avg_odds: 1.88, sb_parlay_pct: 20, sb_cashout_count: 3,
        sb_epl_stake: 2400, sb_laliga_stake: 1200, sb_ucl_stake: 1000,
        sb_serie_a_stake: 500, sb_bundesliga_stake: 350, sb_afcon_stake: 300,
        sb_kpl_stake: 150, sb_nba_stake: 100, sb_atp_stake: 0, sb_rugby_stake: 0,
        casino_rounds: 158, casino_stake: 3500, casino_ggr: 245,
        casino_slots_stake: 1500, casino_live_stake: 1200, casino_crash_stake: 800,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 800,
        total_ggr: 965
      },
      {
        month: "Jan 26",
        players: 8, active_players: 7, dormant_players: 1,
        new_players: 0, churned_players: 1, reactivated_players: 0,
        deposits: 5000, withdrawals: 2000,
        deposit_count: 20, withdrawal_count: 9,
        avg_deposit: 250, failed_deposits: 1,
        sb_bets: 22, sb_stake: 5000, sb_ggr: 600,
        sb_win_count: 8, sb_avg_odds: 1.87, sb_parlay_pct: 18, sb_cashout_count: 2,
        sb_epl_stake: 2000, sb_laliga_stake: 1000, sb_ucl_stake: 800,
        sb_serie_a_stake: 400, sb_bundesliga_stake: 300, sb_afcon_stake: 250,
        sb_kpl_stake: 130, sb_nba_stake: 80, sb_atp_stake: 40, sb_rugby_stake: 0,
        casino_rounds: 140, casino_stake: 3000, casino_ggr: 210,
        casino_slots_stake: 1300, casino_live_stake: 1000, casino_crash_stake: 700,
        casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600,
        total_ggr: 810
      }
    ]
  },

  // ───────────────────────────────────────────────────────────
  // SEG9 – SEG18: REMAINING SEGMENTS
  // Same structure applied; values scaled to match totals
  // ───────────────────────────────────────────────────────────
  {
    id: "seg9",
    name: "Big Winners",
    description: "Players with net profit > KES 50,000.",
    color: "#f59e0b",
    is_favorite: false,
    total_players: 4,
    total_deposits: 30000,
    total_withdrawals: 95000,
    total_bets: 150000,
    monthly_trend: [
      { month: "Aug 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 5000, withdrawals: 12000, deposit_count: 12, withdrawal_count: 8, avg_deposit: 417, failed_deposits: 0, sb_bets: 22, sb_stake: 12000, sb_ggr: -3600, sb_win_count: 14, sb_avg_odds: 2.50, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 4500, sb_laliga_stake: 2000, sb_ucl_stake: 1800, sb_serie_a_stake: 1200, sb_bundesliga_stake: 800, sb_afcon_stake: 700, sb_kpl_stake: 400, sb_nba_stake: 400, sb_atp_stake: 200, sb_rugby_stake: 0, casino_rounds: 125, casino_stake: 8000, casino_ggr: -2400, casino_slots_stake: 3000, casino_live_stake: 3500, casino_crash_stake: 1500, casino_avg_rtp_pct: 130, casino_jackpot_wins: 2, casino_bonus_used: 500, total_ggr: -6000 },
      { month: "Sep 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 6000, withdrawals: 15000, deposit_count: 14, withdrawal_count: 9, avg_deposit: 429, failed_deposits: 0, sb_bets: 28, sb_stake: 15000, sb_ggr: -4500, sb_win_count: 17, sb_avg_odds: 2.52, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 5600, sb_laliga_stake: 2500, sb_ucl_stake: 2200, sb_serie_a_stake: 1500, sb_bundesliga_stake: 1000, sb_afcon_stake: 800, sb_kpl_stake: 500, sb_nba_stake: 500, sb_atp_stake: 200, sb_rugby_stake: 200, casino_rounds: 155, casino_stake: 10000, casino_ggr: -3000, casino_slots_stake: 3800, casino_live_stake: 4200, casino_crash_stake: 2000, casino_avg_rtp_pct: 130, casino_jackpot_wins: 2, casino_bonus_used: 600, total_ggr: -7500 },
      { month: "Oct 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 5500, withdrawals: 18000, deposit_count: 13, withdrawal_count: 10, avg_deposit: 423, failed_deposits: 0, sb_bets: 25, sb_stake: 13000, sb_ggr: -3900, sb_win_count: 15, sb_avg_odds: 2.48, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 4800, sb_laliga_stake: 2200, sb_ucl_stake: 1900, sb_serie_a_stake: 1300, sb_bundesliga_stake: 900, sb_afcon_stake: 700, sb_kpl_stake: 400, sb_nba_stake: 500, sb_atp_stake: 200, sb_rugby_stake: 100, casino_rounds: 138, casino_stake: 9000, casino_ggr: -2700, casino_slots_stake: 3400, casino_live_stake: 3600, casino_crash_stake: 2000, casino_avg_rtp_pct: 130, casino_jackpot_wins: 2, casino_bonus_used: 550, total_ggr: -6600 },
      { month: "Nov 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 4500, withdrawals: 16000, deposit_count: 11, withdrawal_count: 9, avg_deposit: 409, failed_deposits: 0, sb_bets: 32, sb_stake: 16000, sb_ggr: -4800, sb_win_count: 19, sb_avg_odds: 2.55, sb_parlay_pct: 5, sb_cashout_count: 3, sb_epl_stake: 6000, sb_laliga_stake: 2700, sb_ucl_stake: 2300, sb_serie_a_stake: 1600, sb_bundesliga_stake: 1100, sb_afcon_stake: 900, sb_kpl_stake: 600, sb_nba_stake: 500, sb_atp_stake: 300, sb_rugby_stake: 0, casino_rounds: 165, casino_stake: 12000, casino_ggr: -3600, casino_slots_stake: 4500, casino_live_stake: 5000, casino_crash_stake: 2500, casino_avg_rtp_pct: 130, casino_jackpot_wins: 3, casino_bonus_used: 600, total_ggr: -8400 },
      { month: "Dec 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 5000, withdrawals: 20000, deposit_count: 12, withdrawal_count: 11, avg_deposit: 417, failed_deposits: 0, sb_bets: 38, sb_stake: 20000, sb_ggr: -6000, sb_win_count: 23, sb_avg_odds: 2.58, sb_parlay_pct: 6, sb_cashout_count: 3, sb_epl_stake: 7500, sb_laliga_stake: 3400, sb_ucl_stake: 2800, sb_serie_a_stake: 2000, sb_bundesliga_stake: 1400, sb_afcon_stake: 1100, sb_kpl_stake: 700, sb_nba_stake: 600, sb_atp_stake: 300, sb_rugby_stake: 200, casino_rounds: 195, casino_stake: 15000, casino_ggr: -4500, casino_slots_stake: 5500, casino_live_stake: 6000, casino_crash_stake: 3500, casino_avg_rtp_pct: 130, casino_jackpot_wins: 3, casino_bonus_used: 700, total_ggr: -10500 },
      { month: "Jan 26",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 4000, withdrawals: 14000, deposit_count: 10, withdrawal_count: 8, avg_deposit: 400, failed_deposits: 0, sb_bets: 30, sb_stake: 12000, sb_ggr: -3600, sb_win_count: 18, sb_avg_odds: 2.52, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 4500, sb_laliga_stake: 2000, sb_ucl_stake: 1700, sb_serie_a_stake: 1200, sb_bundesliga_stake: 850, sb_afcon_stake: 700, sb_kpl_stake: 450, sb_nba_stake: 400, sb_atp_stake: 200, sb_rugby_stake: 0, casino_rounds: 148, casino_stake: 8000, casino_ggr: -2400, casino_slots_stake: 3000, casino_live_stake: 3200, casino_crash_stake: 1800, casino_avg_rtp_pct: 130, casino_jackpot_wins: 2, casino_bonus_used: 500, total_ggr: -6000 }
    ]
  },

  {
    id: "seg10",
    name: "Slot Enthusiasts",
    description: "Focus on Casino Slots.",
    color: "#d946ef",
    is_favorite: false,
    total_players: 20,
    total_deposits: 65000,
    total_withdrawals: 25000,
    total_bets: 120000,
    monthly_trend: [
      { month: "Aug 25",  players: 15, active_players: 14, dormant_players: 1, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 8000, withdrawals: 3000, deposit_count: 32, withdrawal_count: 14, avg_deposit: 250, failed_deposits: 2, sb_bets: 14, sb_stake: 1500, sb_ggr: 180, sb_win_count: 5, sb_avg_odds: 1.80, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 600, sb_laliga_stake: 300, sb_ucl_stake: 240, sb_serie_a_stake: 120, sb_bundesliga_stake: 100, sb_afcon_stake: 60, sb_kpl_stake: 40, sb_nba_stake: 40, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 800, casino_stake: 13500, casino_ggr: 945, casino_slots_stake: 12000, casino_live_stake: 1000, casino_crash_stake: 500, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1200, total_ggr: 1125 },
      { month: "Sep 25",  players: 16, active_players: 15, dormant_players: 1, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 9500, withdrawals: 3500, deposit_count: 38, withdrawal_count: 16, avg_deposit: 250, failed_deposits: 2, sb_bets: 17, sb_stake: 1800, sb_ggr: 216, sb_win_count: 6, sb_avg_odds: 1.82, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 700, sb_laliga_stake: 360, sb_ucl_stake: 288, sb_serie_a_stake: 144, sb_bundesliga_stake: 120, sb_afcon_stake: 72, sb_kpl_stake: 48, sb_nba_stake: 48, sb_atp_stake: 0, sb_rugby_stake: 20, casino_rounds: 980, casino_stake: 16200, casino_ggr: 1134, casino_slots_stake: 14500, casino_live_stake: 1100, casino_crash_stake: 600, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1400, total_ggr: 1350 },
      { month: "Oct 25",  players: 18, active_players: 17, dormant_players: 1, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 11000, withdrawals: 4200, deposit_count: 44, withdrawal_count: 18, avg_deposit: 250, failed_deposits: 2, sb_bets: 20, sb_stake: 2000, sb_ggr: 240, sb_win_count: 7, sb_avg_odds: 1.83, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 800, sb_laliga_stake: 400, sb_ucl_stake: 320, sb_serie_a_stake: 160, sb_bundesliga_stake: 140, sb_afcon_stake: 80, sb_kpl_stake: 50, sb_nba_stake: 50, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 1150, casino_stake: 18000, casino_ggr: 1260, casino_slots_stake: 16000, casino_live_stake: 1200, casino_crash_stake: 800, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 1600, total_ggr: 1500 },
      { month: "Nov 25",  players: 20, active_players: 19, dormant_players: 1, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 12500, withdrawals: 4800, deposit_count: 50, withdrawal_count: 20, avg_deposit: 250, failed_deposits: 3, sb_bets: 22, sb_stake: 2200, sb_ggr: 264, sb_win_count: 8, sb_avg_odds: 1.84, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 880, sb_laliga_stake: 440, sb_ucl_stake: 352, sb_serie_a_stake: 176, sb_bundesliga_stake: 154, sb_afcon_stake: 88, sb_kpl_stake: 55, sb_nba_stake: 55, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 1340, casino_stake: 19800, casino_ggr: 1386, casino_slots_stake: 17600, casino_live_stake: 1300, casino_crash_stake: 900, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 1800, total_ggr: 1650 },
      { month: "Dec 25",  players: 20, active_players: 20, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 14000, withdrawals: 5500, deposit_count: 56, withdrawal_count: 22, avg_deposit: 250, failed_deposits: 3, sb_bets: 25, sb_stake: 2500, sb_ggr: 300, sb_win_count: 9, sb_avg_odds: 1.85, sb_parlay_pct: 5, sb_cashout_count: 2, sb_epl_stake: 1000, sb_laliga_stake: 500, sb_ucl_stake: 400, sb_serie_a_stake: 200, sb_bundesliga_stake: 175, sb_afcon_stake: 100, sb_kpl_stake: 60, sb_nba_stake: 65, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 1580, casino_stake: 22500, casino_ggr: 1575, casino_slots_stake: 20000, casino_live_stake: 1500, casino_crash_stake: 1000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 2200, total_ggr: 1875 },
      { month: "Jan 26",  players: 20, active_players: 17, dormant_players: 3, new_players: 0, churned_players: 3, reactivated_players: 0, deposits: 10000, withdrawals: 4000, deposit_count: 40, withdrawal_count: 17, avg_deposit: 250, failed_deposits: 2, sb_bets: 20, sb_stake: 2000, sb_ggr: 240, sb_win_count: 7, sb_avg_odds: 1.82, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 800, sb_laliga_stake: 400, sb_ucl_stake: 320, sb_serie_a_stake: 160, sb_bundesliga_stake: 140, sb_afcon_stake: 80, sb_kpl_stake: 50, sb_nba_stake: 50, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 1200, casino_stake: 18000, casino_ggr: 1260, casino_slots_stake: 16000, casino_live_stake: 1200, casino_crash_stake: 800, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1500, total_ggr: 1500 }
    ]
  },

  {
    id: "seg11",
    name: "Live Casino Lovers",
    description: "High volume on Live Dealer games.",
    color: "#6366f1",
    is_favorite: false,
    total_players: 10,
    total_deposits: 90000,
    total_withdrawals: 42000,
    total_bets: 145000,
    monthly_trend: [
      { month: "Aug 25",  players: 8, active_players: 8, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 12000, withdrawals: 6000, deposit_count: 30, withdrawal_count: 14, avg_deposit: 400, failed_deposits: 1, sb_bets: 8, sb_stake: 2000, sb_ggr: 240, sb_win_count: 3, sb_avg_odds: 1.88, sb_parlay_pct: 5, sb_cashout_count: 0, sb_epl_stake: 800, sb_laliga_stake: 400, sb_ucl_stake: 320, sb_serie_a_stake: 160, sb_bundesliga_stake: 140, sb_afcon_stake: 80, sb_kpl_stake: 50, sb_nba_stake: 50, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 580, casino_stake: 18000, casino_ggr: 1260, casino_slots_stake: 2000, casino_live_stake: 15000, casino_crash_stake: 1000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1200, total_ggr: 1500 },
      { month: "Sep 25",  players: 9, active_players: 9, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 14000, withdrawals: 7000, deposit_count: 34, withdrawal_count: 16, avg_deposit: 412, failed_deposits: 1, sb_bets: 10, sb_stake: 2400, sb_ggr: 288, sb_win_count: 4, sb_avg_odds: 1.90, sb_parlay_pct: 5, sb_cashout_count: 0, sb_epl_stake: 960, sb_laliga_stake: 480, sb_ucl_stake: 384, sb_serie_a_stake: 192, sb_bundesliga_stake: 168, sb_afcon_stake: 96, sb_kpl_stake: 60, sb_nba_stake: 60, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 700, casino_stake: 21600, casino_ggr: 1512, casino_slots_stake: 2400, casino_live_stake: 18000, casino_crash_stake: 1200, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1400, total_ggr: 1800 },
      { month: "Oct 25",  players: 10, active_players: 10, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 15500, withdrawals: 7500, deposit_count: 38, withdrawal_count: 18, avg_deposit: 408, failed_deposits: 2, sb_bets: 11, sb_stake: 2500, sb_ggr: 300, sb_win_count: 4, sb_avg_odds: 1.90, sb_parlay_pct: 5, sb_cashout_count: 0, sb_epl_stake: 1000, sb_laliga_stake: 500, sb_ucl_stake: 400, sb_serie_a_stake: 200, sb_bundesliga_stake: 175, sb_afcon_stake: 100, sb_kpl_stake: 60, sb_nba_stake: 65, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 770, casino_stake: 22500, casino_ggr: 1575, casino_slots_stake: 2500, casino_live_stake: 18800, casino_crash_stake: 1200, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1600, total_ggr: 1875 },
      { month: "Nov 25",  players: 10, active_players: 10, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 16500, withdrawals: 8000, deposit_count: 40, withdrawal_count: 19, avg_deposit: 413, failed_deposits: 2, sb_bets: 12, sb_stake: 2800, sb_ggr: 336, sb_win_count: 4, sb_avg_odds: 1.91, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 1120, sb_laliga_stake: 560, sb_ucl_stake: 448, sb_serie_a_stake: 224, sb_bundesliga_stake: 196, sb_afcon_stake: 112, sb_kpl_stake: 70, sb_nba_stake: 70, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 840, casino_stake: 25200, casino_ggr: 1764, casino_slots_stake: 2800, casino_live_stake: 21000, casino_crash_stake: 1400, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 1800, total_ggr: 2100 },
      { month: "Dec 25",  players: 10, active_players: 10, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 18000, withdrawals: 8500, deposit_count: 44, withdrawal_count: 20, avg_deposit: 409, failed_deposits: 2, sb_bets: 14, sb_stake: 3000, sb_ggr: 360, sb_win_count: 5, sb_avg_odds: 1.92, sb_parlay_pct: 5, sb_cashout_count: 1, sb_epl_stake: 1200, sb_laliga_stake: 600, sb_ucl_stake: 480, sb_serie_a_stake: 240, sb_bundesliga_stake: 210, sb_afcon_stake: 120, sb_kpl_stake: 75, sb_nba_stake: 75, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 970, casino_stake: 27000, casino_ggr: 1890, casino_slots_stake: 3000, casino_live_stake: 22500, casino_crash_stake: 1500, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 2000, total_ggr: 2250 },
      { month: "Jan 26",  players: 10, active_players: 9, dormant_players: 1, new_players: 0, churned_players: 1, reactivated_players: 0, deposits: 14000, withdrawals: 5000, deposit_count: 34, withdrawal_count: 12, avg_deposit: 412, failed_deposits: 1, sb_bets: 10, sb_stake: 1800, sb_ggr: 216, sb_win_count: 3, sb_avg_odds: 1.88, sb_parlay_pct: 5, sb_cashout_count: 0, sb_epl_stake: 720, sb_laliga_stake: 360, sb_ucl_stake: 288, sb_serie_a_stake: 144, sb_bundesliga_stake: 126, sb_afcon_stake: 72, sb_kpl_stake: 45, sb_nba_stake: 45, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 780, casino_stake: 16200, casino_ggr: 1134, casino_slots_stake: 1800, casino_live_stake: 13500, casino_crash_stake: 900, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1400, total_ggr: 1350 }
    ]
  },

  {
    id: "seg12",
    name: "Late Night Bettors",
    description: "Active between 11 PM and 5 AM.",
    color: "#1e293b",
    is_favorite: false,
    total_players: 12,
    total_deposits: 28000,
    total_withdrawals: 10000,
    total_bets: 42000,
    monthly_trend: [
      { month: "Aug 25",  players: 8, active_players: 8, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 4000, withdrawals: 1200, deposit_count: 18, withdrawal_count: 7, avg_deposit: 222, failed_deposits: 1, sb_bets: 22, sb_stake: 3000, sb_ggr: 360, sb_win_count: 8, sb_avg_odds: 1.85, sb_parlay_pct: 25, sb_cashout_count: 2, sb_epl_stake: 1100, sb_laliga_stake: 550, sb_ucl_stake: 440, sb_serie_a_stake: 220, sb_bundesliga_stake: 200, sb_afcon_stake: 140, sb_kpl_stake: 100, sb_nba_stake: 150, sb_atp_stake: 100, sb_rugby_stake: 0, casino_rounds: 248, casino_stake: 3000, casino_ggr: 210, casino_slots_stake: 1200, casino_live_stake: 900, casino_crash_stake: 900, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300, total_ggr: 570 },
      { month: "Sep 25",  players: 9, active_players: 9, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 4500, withdrawals: 1500, deposit_count: 20, withdrawal_count: 8, avg_deposit: 225, failed_deposits: 1, sb_bets: 25, sb_stake: 3500, sb_ggr: 420, sb_win_count: 9, sb_avg_odds: 1.87, sb_parlay_pct: 26, sb_cashout_count: 2, sb_epl_stake: 1280, sb_laliga_stake: 640, sb_ucl_stake: 512, sb_serie_a_stake: 256, sb_bundesliga_stake: 233, sb_afcon_stake: 163, sb_kpl_stake: 117, sb_nba_stake: 175, sb_atp_stake: 124, sb_rugby_stake: 0, casino_rounds: 290, casino_stake: 3500, casino_ggr: 245, casino_slots_stake: 1400, casino_live_stake: 1050, casino_crash_stake: 1050, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 350, total_ggr: 665 },
      { month: "Oct 25",  players: 10, active_players: 10, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 4800, withdrawals: 1800, deposit_count: 22, withdrawal_count: 9, avg_deposit: 218, failed_deposits: 1, sb_bets: 29, sb_stake: 3800, sb_ggr: 456, sb_win_count: 10, sb_avg_odds: 1.88, sb_parlay_pct: 27, sb_cashout_count: 3, sb_epl_stake: 1390, sb_laliga_stake: 695, sb_ucl_stake: 556, sb_serie_a_stake: 278, sb_bundesliga_stake: 253, sb_afcon_stake: 177, sb_kpl_stake: 127, sb_nba_stake: 190, sb_atp_stake: 134, sb_rugby_stake: 0, casino_rounds: 320, casino_stake: 3700, casino_ggr: 259, casino_slots_stake: 1480, casino_live_stake: 1110, casino_crash_stake: 1110, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 380, total_ggr: 715 },
      { month: "Nov 25",  players: 12, active_players: 12, dormant_players: 0, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 5000, withdrawals: 2000, deposit_count: 24, withdrawal_count: 10, avg_deposit: 208, failed_deposits: 2, sb_bets: 33, sb_stake: 4000, sb_ggr: 480, sb_win_count: 11, sb_avg_odds: 1.89, sb_parlay_pct: 28, sb_cashout_count: 3, sb_epl_stake: 1464, sb_laliga_stake: 732, sb_ucl_stake: 586, sb_serie_a_stake: 293, sb_bundesliga_stake: 266, sb_afcon_stake: 186, sb_kpl_stake: 133, sb_nba_stake: 200, sb_atp_stake: 140, sb_rugby_stake: 0, casino_rounds: 368, casino_stake: 4000, casino_ggr: 280, casino_slots_stake: 1600, casino_live_stake: 1200, casino_crash_stake: 1200, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 420, total_ggr: 760 },
      { month: "Dec 25",  players: 12, active_players: 12, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 5500, withdrawals: 2500, deposit_count: 26, withdrawal_count: 11, avg_deposit: 212, failed_deposits: 2, sb_bets: 36, sb_stake: 4500, sb_ggr: 540, sb_win_count: 12, sb_avg_odds: 1.90, sb_parlay_pct: 29, sb_cashout_count: 3, sb_epl_stake: 1647, sb_laliga_stake: 824, sb_ucl_stake: 659, sb_serie_a_stake: 330, sb_bundesliga_stake: 300, sb_afcon_stake: 210, sb_kpl_stake: 150, sb_nba_stake: 225, sb_atp_stake: 155, sb_rugby_stake: 0, casino_rounds: 408, casino_stake: 4000, casino_ggr: 280, casino_slots_stake: 1600, casino_live_stake: 1200, casino_crash_stake: 1200, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 450, total_ggr: 820 },
      { month: "Jan 26",  players: 12, active_players: 10, dormant_players: 2, new_players: 0, churned_players: 2, reactivated_players: 0, deposits: 4200, withdrawals: 1000, deposit_count: 20, withdrawal_count: 6, avg_deposit: 210, failed_deposits: 1, sb_bets: 30, sb_stake: 3000, sb_ggr: 360, sb_win_count: 10, sb_avg_odds: 1.87, sb_parlay_pct: 26, sb_cashout_count: 2, sb_epl_stake: 1098, sb_laliga_stake: 549, sb_ucl_stake: 439, sb_serie_a_stake: 220, sb_bundesliga_stake: 200, sb_afcon_stake: 140, sb_kpl_stake: 100, sb_nba_stake: 150, sb_atp_stake: 104, sb_rugby_stake: 0, casino_rounds: 330, casino_stake: 2000, casino_ggr: 140, casino_slots_stake: 800, casino_live_stake: 600, casino_crash_stake: 600, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200, total_ggr: 500 }
    ]
  },

  {
    id: "seg13",
    name: "Early Birds",
    description: "Active between 6 AM and 10 AM.",
    color: "#facc15",
    is_favorite: false,
    total_players: 6,
    total_deposits: 15000,
    total_withdrawals: 5000,
    total_bets: 22000,
    monthly_trend: [
      { month: "Aug 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 2000, withdrawals: 600, deposit_count: 10, withdrawal_count: 4, avg_deposit: 200, failed_deposits: 0, sb_bets: 12, sb_stake: 1800, sb_ggr: 216, sb_win_count: 4, sb_avg_odds: 1.82, sb_parlay_pct: 8, sb_cashout_count: 1, sb_epl_stake: 700, sb_laliga_stake: 350, sb_ucl_stake: 280, sb_serie_a_stake: 140, sb_bundesliga_stake: 120, sb_afcon_stake: 80, sb_kpl_stake: 50, sb_nba_stake: 80, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 105, casino_stake: 1200, casino_ggr: 84, casino_slots_stake: 500, casino_live_stake: 400, casino_crash_stake: 300, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 100, total_ggr: 300 },
      { month: "Sep 25",  players: 5, active_players: 5, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 2500, withdrawals: 800, deposit_count: 12, withdrawal_count: 5, avg_deposit: 208, failed_deposits: 0, sb_bets: 14, sb_stake: 2100, sb_ggr: 252, sb_win_count: 5, sb_avg_odds: 1.83, sb_parlay_pct: 9, sb_cashout_count: 1, sb_epl_stake: 815, sb_laliga_stake: 407, sb_ucl_stake: 326, sb_serie_a_stake: 163, sb_bundesliga_stake: 140, sb_afcon_stake: 93, sb_kpl_stake: 58, sb_nba_stake: 93, sb_atp_stake: 5, sb_rugby_stake: 0, casino_rounds: 122, casino_stake: 1400, casino_ggr: 98, casino_slots_stake: 583, casino_live_stake: 467, casino_crash_stake: 350, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 120, total_ggr: 350 },
      { month: "Oct 25",  players: 6, active_players: 6, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 2800, withdrawals: 900, deposit_count: 14, withdrawal_count: 5, avg_deposit: 200, failed_deposits: 0, sb_bets: 16, sb_stake: 2520, sb_ggr: 302, sb_win_count: 6, sb_avg_odds: 1.84, sb_parlay_pct: 9, sb_cashout_count: 1, sb_epl_stake: 978, sb_laliga_stake: 489, sb_ucl_stake: 391, sb_serie_a_stake: 196, sb_bundesliga_stake: 168, sb_afcon_stake: 112, sb_kpl_stake: 70, sb_nba_stake: 112, sb_atp_stake: 4, sb_rugby_stake: 0, casino_rounds: 138, casino_stake: 1680, casino_ggr: 118, casino_slots_stake: 700, casino_live_stake: 560, casino_crash_stake: 420, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 140, total_ggr: 420 },
      { month: "Nov 25",  players: 6, active_players: 6, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 3000, withdrawals: 1000, deposit_count: 15, withdrawal_count: 6, avg_deposit: 200, failed_deposits: 1, sb_bets: 18, sb_stake: 2700, sb_ggr: 324, sb_win_count: 6, sb_avg_odds: 1.85, sb_parlay_pct: 10, sb_cashout_count: 1, sb_epl_stake: 1047, sb_laliga_stake: 524, sb_ucl_stake: 419, sb_serie_a_stake: 210, sb_bundesliga_stake: 180, sb_afcon_stake: 120, sb_kpl_stake: 75, sb_nba_stake: 120, sb_atp_stake: 5, sb_rugby_stake: 0, casino_rounds: 150, casino_stake: 1800, casino_ggr: 126, casino_slots_stake: 750, casino_live_stake: 600, casino_crash_stake: 450, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 160, total_ggr: 450 },
      { month: "Dec 25",  players: 6, active_players: 6, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 3200, withdrawals: 1200, deposit_count: 16, withdrawal_count: 7, avg_deposit: 200, failed_deposits: 1, sb_bets: 20, sb_stake: 3000, sb_ggr: 360, sb_win_count: 7, sb_avg_odds: 1.86, sb_parlay_pct: 10, sb_cashout_count: 2, sb_epl_stake: 1164, sb_laliga_stake: 582, sb_ucl_stake: 466, sb_serie_a_stake: 233, sb_bundesliga_stake: 200, sb_afcon_stake: 133, sb_kpl_stake: 83, sb_nba_stake: 133, sb_atp_stake: 6, sb_rugby_stake: 0, casino_rounds: 164, casino_stake: 2000, casino_ggr: 140, casino_slots_stake: 833, casino_live_stake: 667, casino_crash_stake: 500, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 180, total_ggr: 500 },
      { month: "Jan 26",  players: 6, active_players: 5, dormant_players: 1, new_players: 0, churned_players: 1, reactivated_players: 0, deposits: 1500, withdrawals: 500, deposit_count: 8, withdrawal_count: 3, avg_deposit: 188, failed_deposits: 0, sb_bets: 15, sb_stake: 1080, sb_ggr: 130, sb_win_count: 5, sb_avg_odds: 1.82, sb_parlay_pct: 8, sb_cashout_count: 1, sb_epl_stake: 419, sb_laliga_stake: 210, sb_ucl_stake: 168, sb_serie_a_stake: 84, sb_bundesliga_stake: 72, sb_afcon_stake: 48, sb_kpl_stake: 30, sb_nba_stake: 48, sb_atp_stake: 1, sb_rugby_stake: 0, casino_rounds: 98, casino_stake: 720, casino_ggr: 50, casino_slots_stake: 300, casino_live_stake: 240, casino_crash_stake: 180, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 60, total_ggr: 180 }
    ]
  },

  {
    id: "seg14",
    name: "Bonus Hunters",
    description: "Usually bet only when bonuses are active.",
    color: "#f97316",
    is_favorite: false,
    total_players: 25,
    total_deposits: 35000,
    total_withdrawals: 12000,
    total_bets: 55000,
    monthly_trend: [
      { month: "Aug 25",  players: 18, active_players: 16, dormant_players: 2, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 5000, withdrawals: 1500, deposit_count: 22, withdrawal_count: 8, avg_deposit: 227, failed_deposits: 2, sb_bets: 32, sb_stake: 4800, sb_ggr: 576, sb_win_count: 12, sb_avg_odds: 1.85, sb_parlay_pct: 12, sb_cashout_count: 3, sb_epl_stake: 1800, sb_laliga_stake: 900, sb_ucl_stake: 720, sb_serie_a_stake: 360, sb_bundesliga_stake: 320, sb_afcon_stake: 200, sb_kpl_stake: 160, sb_nba_stake: 200, sb_atp_stake: 140, sb_rugby_stake: 0, casino_rounds: 420, casino_stake: 3200, casino_ggr: 224, casino_slots_stake: 1500, casino_live_stake: 1000, casino_crash_stake: 700, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 1800, total_ggr: 800 },
      { month: "Sep 25",  players: 20, active_players: 18, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 6000, withdrawals: 2000, deposit_count: 26, withdrawal_count: 10, avg_deposit: 231, failed_deposits: 2, sb_bets: 38, sb_stake: 5700, sb_ggr: 684, sb_win_count: 14, sb_avg_odds: 1.87, sb_parlay_pct: 13, sb_cashout_count: 3, sb_epl_stake: 2147, sb_laliga_stake: 1073, sb_ucl_stake: 858, sb_serie_a_stake: 429, sb_bundesliga_stake: 381, sb_afcon_stake: 238, sb_kpl_stake: 191, sb_nba_stake: 238, sb_atp_stake: 167, sb_rugby_stake: 0, casino_rounds: 492, casino_stake: 3800, casino_ggr: 266, casino_slots_stake: 1786, casino_live_stake: 1191, casino_crash_stake: 823, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 2100, total_ggr: 950 },
      { month: "Oct 25",  players: 22, active_players: 20, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 6500, withdrawals: 2200, deposit_count: 28, withdrawal_count: 11, avg_deposit: 232, failed_deposits: 2, sb_bets: 42, sb_stake: 6000, sb_ggr: 720, sb_win_count: 16, sb_avg_odds: 1.88, sb_parlay_pct: 13, sb_cashout_count: 4, sb_epl_stake: 2263, sb_laliga_stake: 1131, sb_ucl_stake: 905, sb_serie_a_stake: 453, sb_bundesliga_stake: 402, sb_afcon_stake: 251, sb_kpl_stake: 201, sb_nba_stake: 251, sb_atp_stake: 143, sb_rugby_stake: 0, casino_rounds: 548, casino_stake: 4000, casino_ggr: 280, casino_slots_stake: 1880, casino_live_stake: 1253, casino_crash_stake: 867, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 2200, total_ggr: 1000 },
      { month: "Nov 25",  players: 24, active_players: 22, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 7000, withdrawals: 2500, deposit_count: 30, withdrawal_count: 12, avg_deposit: 233, failed_deposits: 3, sb_bets: 48, sb_stake: 6600, sb_ggr: 792, sb_win_count: 18, sb_avg_odds: 1.89, sb_parlay_pct: 14, sb_cashout_count: 4, sb_epl_stake: 2489, sb_laliga_stake: 1244, sb_ucl_stake: 996, sb_serie_a_stake: 498, sb_bundesliga_stake: 442, sb_afcon_stake: 276, sb_kpl_stake: 221, sb_nba_stake: 276, sb_atp_stake: 158, sb_rugby_stake: 0, casino_rounds: 600, casino_stake: 4400, casino_ggr: 308, casino_slots_stake: 2069, casino_live_stake: 1379, casino_crash_stake: 952, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 2400, total_ggr: 1100 },
      { month: "Dec 25",  players: 25, active_players: 23, dormant_players: 2, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 8000, withdrawals: 3000, deposit_count: 34, withdrawal_count: 13, avg_deposit: 235, failed_deposits: 3, sb_bets: 56, sb_stake: 7500, sb_ggr: 900, sb_win_count: 21, sb_avg_odds: 1.90, sb_parlay_pct: 15, sb_cashout_count: 5, sb_epl_stake: 2828, sb_laliga_stake: 1414, sb_ucl_stake: 1131, sb_serie_a_stake: 566, sb_bundesliga_stake: 503, sb_afcon_stake: 314, sb_kpl_stake: 251, sb_nba_stake: 314, sb_atp_stake: 179, sb_rugby_stake: 0, casino_rounds: 680, casino_stake: 5000, casino_ggr: 350, casino_slots_stake: 2350, casino_live_stake: 1567, casino_crash_stake: 1083, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 3000, total_ggr: 1250 },
      { month: "Jan 26",  players: 15, active_players: 10, dormant_players: 5, new_players: 0, churned_players: 10, reactivated_players: 0, deposits: 2500, withdrawals: 800, deposit_count: 12, withdrawal_count: 5, avg_deposit: 208, failed_deposits: 1, sb_bets: 25, sb_stake: 2400, sb_ggr: 288, sb_win_count: 9, sb_avg_odds: 1.83, sb_parlay_pct: 10, sb_cashout_count: 1, sb_epl_stake: 905, sb_laliga_stake: 452, sb_ucl_stake: 362, sb_serie_a_stake: 181, sb_bundesliga_stake: 161, sb_afcon_stake: 100, sb_kpl_stake: 80, sb_nba_stake: 100, sb_atp_stake: 59, sb_rugby_stake: 0, casino_rounds: 240, casino_stake: 1600, casino_ggr: 112, casino_slots_stake: 752, casino_live_stake: 501, casino_crash_stake: 347, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600, total_ggr: 400 }
    ]
  },

  {
    id: "seg15",
    name: "Low Stakes Steadies",
    description: "Frequent small bets (< KES 50).",
    color: "#14b8a6",
    is_favorite: false,
    total_players: 50,
    total_deposits: 25000,
    total_withdrawals: 8000,
    total_bets: 45000,
    monthly_trend: [
      { month: "Aug 25",  players: 40, active_players: 38, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 3500, withdrawals: 1000, deposit_count: 88, withdrawal_count: 28, avg_deposit: 40, failed_deposits: 3, sb_bets: 95, sb_stake: 3250, sb_ggr: 390, sb_win_count: 38, sb_avg_odds: 1.68, sb_parlay_pct: 30, sb_cashout_count: 5, sb_epl_stake: 1200, sb_laliga_stake: 600, sb_ucl_stake: 480, sb_serie_a_stake: 240, sb_bundesliga_stake: 215, sb_afcon_stake: 180, sb_kpl_stake: 130, sb_nba_stake: 205, sb_atp_stake: 0, sb_rugby_stake: 0, casino_rounds: 2480, casino_stake: 3250, casino_ggr: 228, casino_slots_stake: 1300, casino_live_stake: 975, casino_crash_stake: 975, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200, total_ggr: 618 },
      { month: "Sep 25",  players: 42, active_players: 40, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 4000, withdrawals: 1200, deposit_count: 100, withdrawal_count: 32, avg_deposit: 40, failed_deposits: 3, sb_bets: 110, sb_stake: 3750, sb_ggr: 450, sb_win_count: 44, sb_avg_odds: 1.69, sb_parlay_pct: 31, sb_cashout_count: 5, sb_epl_stake: 1383, sb_laliga_stake: 691, sb_ucl_stake: 553, sb_serie_a_stake: 277, sb_bundesliga_stake: 248, sb_afcon_stake: 207, sb_kpl_stake: 150, sb_nba_stake: 236, sb_atp_stake: 5, sb_rugby_stake: 0, casino_rounds: 2860, casino_stake: 3750, casino_ggr: 263, casino_slots_stake: 1500, casino_live_stake: 1125, casino_crash_stake: 1125, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 240, total_ggr: 713 },
      { month: "Oct 25",  players: 45, active_players: 43, dormant_players: 2, new_players: 3, churned_players: 0, reactivated_players: 0, deposits: 4500, withdrawals: 1400, deposit_count: 113, withdrawal_count: 36, avg_deposit: 40, failed_deposits: 4, sb_bets: 122, sb_stake: 4100, sb_ggr: 492, sb_win_count: 49, sb_avg_odds: 1.70, sb_parlay_pct: 32, sb_cashout_count: 6, sb_epl_stake: 1512, sb_laliga_stake: 756, sb_ucl_stake: 605, sb_serie_a_stake: 302, sb_bundesliga_stake: 271, sb_afcon_stake: 226, sb_kpl_stake: 164, sb_nba_stake: 259, sb_atp_stake: 5, sb_rugby_stake: 0, casino_rounds: 3185, casino_stake: 4100, casino_ggr: 287, casino_slots_stake: 1640, casino_live_stake: 1230, casino_crash_stake: 1230, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 260, total_ggr: 779 },
      { month: "Nov 25",  players: 48, active_players: 46, dormant_players: 2, new_players: 3, churned_players: 0, reactivated_players: 0, deposits: 5000, withdrawals: 1600, deposit_count: 125, withdrawal_count: 40, avg_deposit: 40, failed_deposits: 4, sb_bets: 138, sb_stake: 4500, sb_ggr: 540, sb_win_count: 55, sb_avg_odds: 1.71, sb_parlay_pct: 33, sb_cashout_count: 7, sb_epl_stake: 1659, sb_laliga_stake: 829, sb_ucl_stake: 663, sb_serie_a_stake: 332, sb_bundesliga_stake: 298, sb_afcon_stake: 248, sb_kpl_stake: 180, sb_nba_stake: 284, sb_atp_stake: 7, sb_rugby_stake: 0, casino_rounds: 3588, casino_stake: 4500, casino_ggr: 315, casino_slots_stake: 1800, casino_live_stake: 1350, casino_crash_stake: 1350, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 280, total_ggr: 855 },
      { month: "Dec 25",  players: 50, active_players: 48, dormant_players: 2, new_players: 2, churned_players: 0, reactivated_players: 0, deposits: 6000, withdrawals: 2000, deposit_count: 150, withdrawal_count: 48, avg_deposit: 40, failed_deposits: 5, sb_bets: 158, sb_stake: 5000, sb_ggr: 600, sb_win_count: 63, sb_avg_odds: 1.72, sb_parlay_pct: 34, sb_cashout_count: 7, sb_epl_stake: 1845, sb_laliga_stake: 922, sb_ucl_stake: 738, sb_serie_a_stake: 369, sb_bundesliga_stake: 331, sb_afcon_stake: 276, sb_kpl_stake: 200, sb_nba_stake: 316, sb_atp_stake: 3, sb_rugby_stake: 0, casino_rounds: 3990, casino_stake: 5000, casino_ggr: 350, casino_slots_stake: 2000, casino_live_stake: 1500, casino_crash_stake: 1500, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 320, total_ggr: 950 },
      { month: "Jan 26",  players: 30, active_players: 27, dormant_players: 3, new_players: 0, churned_players: 20, reactivated_players: 0, deposits: 2000, withdrawals: 800, deposit_count: 50, withdrawal_count: 20, avg_deposit: 40, failed_deposits: 2, sb_bets: 63, sb_stake: 1900, sb_ggr: 228, sb_win_count: 25, sb_avg_odds: 1.68, sb_parlay_pct: 28, sb_cashout_count: 2, sb_epl_stake: 700, sb_laliga_stake: 350, sb_ucl_stake: 280, sb_serie_a_stake: 140, sb_bundesliga_stake: 126, sb_afcon_stake: 105, sb_kpl_stake: 76, sb_nba_stake: 120, sb_atp_stake: 3, sb_rugby_stake: 0, casino_rounds: 1470, casino_stake: 1900, casino_ggr: 133, casino_slots_stake: 760, casino_live_stake: 570, casino_crash_stake: 570, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 100, total_ggr: 361 }
    ]
  },

  {
    id: "seg16",
    name: "Crypto Deposits",
    description: "Players using USDT/BTC for funding.",
    color: "#f7931a",
    is_favorite: false,
    total_players: 5,
    total_deposits: 75000,
    total_withdrawals: 30000,
    total_bets: 105000,
    monthly_trend: [
      { month: "Aug 25",  players: 4, active_players: 4, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 10000, withdrawals: 4000, deposit_count: 8, withdrawal_count: 4, avg_deposit: 1250, failed_deposits: 0, sb_bets: 16, sb_stake: 8100, sb_ggr: 972, sb_win_count: 6, sb_avg_odds: 2.20, sb_parlay_pct: 15, sb_cashout_count: 1, sb_epl_stake: 3000, sb_laliga_stake: 1500, sb_ucl_stake: 1200, sb_serie_a_stake: 600, sb_bundesliga_stake: 540, sb_afcon_stake: 360, sb_kpl_stake: 240, sb_nba_stake: 360, sb_atp_stake: 300, sb_rugby_stake: 0, casino_rounds: 185, casino_stake: 6900, casino_ggr: 483, casino_slots_stake: 2760, casino_live_stake: 2760, casino_crash_stake: 1380, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 500, total_ggr: 1455 },
      { month: "Sep 25",  players: 5, active_players: 5, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 12000, withdrawals: 5000, deposit_count: 10, withdrawal_count: 5, avg_deposit: 1200, failed_deposits: 0, sb_bets: 19, sb_stake: 9720, sb_ggr: 1166, sb_win_count: 7, sb_avg_odds: 2.22, sb_parlay_pct: 16, sb_cashout_count: 1, sb_epl_stake: 3600, sb_laliga_stake: 1800, sb_ucl_stake: 1440, sb_serie_a_stake: 720, sb_bundesliga_stake: 648, sb_afcon_stake: 432, sb_kpl_stake: 288, sb_nba_stake: 432, sb_atp_stake: 360, sb_rugby_stake: 0, casino_rounds: 222, casino_stake: 8280, casino_ggr: 580, casino_slots_stake: 3312, casino_live_stake: 3312, casino_crash_stake: 1656, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600, total_ggr: 1746 },
      { month: "Oct 25",  players: 5, active_players: 5, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 13000, withdrawals: 5500, deposit_count: 10, withdrawal_count: 5, avg_deposit: 1300, failed_deposits: 0, sb_bets: 21, sb_stake: 10260, sb_ggr: 1231, sb_win_count: 8, sb_avg_odds: 2.24, sb_parlay_pct: 16, sb_cashout_count: 2, sb_epl_stake: 3800, sb_laliga_stake: 1900, sb_ucl_stake: 1520, sb_serie_a_stake: 760, sb_bundesliga_stake: 684, sb_afcon_stake: 456, sb_kpl_stake: 304, sb_nba_stake: 456, sb_atp_stake: 380, sb_rugby_stake: 0, casino_rounds: 234, casino_stake: 9740, casino_ggr: 682, casino_slots_stake: 3896, casino_live_stake: 3896, casino_crash_stake: 1948, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 650, total_ggr: 1913 },
      { month: "Nov 25",  players: 5, active_players: 5, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 14000, withdrawals: 6000, deposit_count: 12, withdrawal_count: 6, avg_deposit: 1167, failed_deposits: 0, sb_bets: 24, sb_stake: 11340, sb_ggr: 1361, sb_win_count: 9, sb_avg_odds: 2.26, sb_parlay_pct: 17, sb_cashout_count: 2, sb_epl_stake: 4200, sb_laliga_stake: 2100, sb_ucl_stake: 1680, sb_serie_a_stake: 840, sb_bundesliga_stake: 756, sb_afcon_stake: 504, sb_kpl_stake: 336, sb_nba_stake: 504, sb_atp_stake: 420, sb_rugby_stake: 0, casino_rounds: 258, casino_stake: 10660, casino_ggr: 746, casino_slots_stake: 4264, casino_live_stake: 4264, casino_crash_stake: 2132, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 700, total_ggr: 2107 },
      { month: "Dec 25",  players: 5, active_players: 5, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 16000, withdrawals: 7000, deposit_count: 14, withdrawal_count: 7, avg_deposit: 1143, failed_deposits: 0, sb_bets: 27, sb_stake: 12960, sb_ggr: 1555, sb_win_count: 10, sb_avg_odds: 2.28, sb_parlay_pct: 18, sb_cashout_count: 2, sb_epl_stake: 4800, sb_laliga_stake: 2400, sb_ucl_stake: 1920, sb_serie_a_stake: 960, sb_bundesliga_stake: 864, sb_afcon_stake: 576, sb_kpl_stake: 384, sb_nba_stake: 576, sb_atp_stake: 480, sb_rugby_stake: 0, casino_rounds: 292, casino_stake: 12040, casino_ggr: 843, casino_slots_stake: 4816, casino_live_stake: 4816, casino_crash_stake: 2408, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 800, total_ggr: 2398 },
      { month: "Jan 26",  players: 5, active_players: 4, dormant_players: 1, new_players: 0, churned_players: 1, reactivated_players: 0, deposits: 10000, withdrawals: 2500, deposit_count: 8, withdrawal_count: 3, avg_deposit: 1250, failed_deposits: 0, sb_bets: 10, sb_stake: 3240, sb_ggr: 389, sb_win_count: 4, sb_avg_odds: 2.20, sb_parlay_pct: 14, sb_cashout_count: 1, sb_epl_stake: 1200, sb_laliga_stake: 600, sb_ucl_stake: 480, sb_serie_a_stake: 240, sb_bundesliga_stake: 216, sb_afcon_stake: 144, sb_kpl_stake: 96, sb_nba_stake: 144, sb_atp_stake: 120, sb_rugby_stake: 0, casino_rounds: 118, casino_stake: 1760, casino_ggr: 123, casino_slots_stake: 704, casino_live_stake: 704, casino_crash_stake: 352, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 200, total_ggr: 512 }
    ]
  },

  {
    id: "seg17",
    name: "Referral Kings",
    description: "Users who have referred > 5 friends.",
    color: "#a855f7",
    is_favorite: false,
    total_players: 3,
    total_deposits: 15000,
    total_withdrawals: 5000,
    total_bets: 28000,
    monthly_trend: [
      { month: "Aug 25",  players: 2, active_players: 2, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 2000, withdrawals: 500, deposit_count: 6, withdrawal_count: 2, avg_deposit: 333, failed_deposits: 0, sb_bets: 7, sb_stake: 2100, sb_ggr: 252, sb_win_count: 3, sb_avg_odds: 1.95, sb_parlay_pct: 20, sb_cashout_count: 0, sb_epl_stake: 780, sb_laliga_stake: 390, sb_ucl_stake: 312, sb_serie_a_stake: 156, sb_bundesliga_stake: 140, sb_afcon_stake: 94, sb_kpl_stake: 62, sb_nba_stake: 94, sb_atp_stake: 72, sb_rugby_stake: 0, casino_rounds: 95, casino_stake: 1400, casino_ggr: 98, casino_slots_stake: 560, casino_live_stake: 560, casino_crash_stake: 280, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 500, total_ggr: 350 },
      { month: "Sep 25",  players: 2, active_players: 2, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 2500, withdrawals: 800, deposit_count: 7, withdrawal_count: 3, avg_deposit: 357, failed_deposits: 0, sb_bets: 8, sb_stake: 2700, sb_ggr: 324, sb_win_count: 3, sb_avg_odds: 1.97, sb_parlay_pct: 21, sb_cashout_count: 1, sb_epl_stake: 1002, sb_laliga_stake: 501, sb_ucl_stake: 401, sb_serie_a_stake: 200, sb_bundesliga_stake: 180, sb_afcon_stake: 120, sb_kpl_stake: 80, sb_nba_stake: 120, sb_atp_stake: 96, sb_rugby_stake: 0, casino_rounds: 112, casino_stake: 1800, casino_ggr: 126, casino_slots_stake: 720, casino_live_stake: 720, casino_crash_stake: 360, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 600, total_ggr: 450 },
      { month: "Oct 25",  players: 3, active_players: 3, dormant_players: 0, new_players: 1, churned_players: 0, reactivated_players: 0, deposits: 2800, withdrawals: 1000, deposit_count: 8, withdrawal_count: 4, avg_deposit: 350, failed_deposits: 0, sb_bets: 9, sb_stake: 3120, sb_ggr: 374, sb_win_count: 4, sb_avg_odds: 1.98, sb_parlay_pct: 22, sb_cashout_count: 1, sb_epl_stake: 1158, sb_laliga_stake: 579, sb_ucl_stake: 463, sb_serie_a_stake: 232, sb_bundesliga_stake: 208, sb_afcon_stake: 139, sb_kpl_stake: 92, sb_nba_stake: 139, sb_atp_stake: 110, sb_rugby_stake: 0, casino_rounds: 128, casino_stake: 2080, casino_ggr: 146, casino_slots_stake: 832, casino_live_stake: 832, casino_crash_stake: 416, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 650, total_ggr: 520 },
      { month: "Nov 25",  players: 3, active_players: 3, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 3200, withdrawals: 1200, deposit_count: 9, withdrawal_count: 4, avg_deposit: 356, failed_deposits: 0, sb_bets: 11, sb_stake: 3600, sb_ggr: 432, sb_win_count: 4, sb_avg_odds: 2.00, sb_parlay_pct: 22, sb_cashout_count: 1, sb_epl_stake: 1336, sb_laliga_stake: 668, sb_ucl_stake: 534, sb_serie_a_stake: 267, sb_bundesliga_stake: 240, sb_afcon_stake: 160, sb_kpl_stake: 107, sb_nba_stake: 160, sb_atp_stake: 128, sb_rugby_stake: 0, casino_rounds: 148, casino_stake: 2400, casino_ggr: 168, casino_slots_stake: 960, casino_live_stake: 960, casino_crash_stake: 480, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 750, total_ggr: 600 },
      { month: "Dec 25",  players: 3, active_players: 3, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 3500, withdrawals: 1500, deposit_count: 10, withdrawal_count: 5, avg_deposit: 350, failed_deposits: 0, sb_bets: 12, sb_stake: 4080, sb_ggr: 490, sb_win_count: 5, sb_avg_odds: 2.02, sb_parlay_pct: 23, sb_cashout_count: 1, sb_epl_stake: 1514, sb_laliga_stake: 757, sb_ucl_stake: 606, sb_serie_a_stake: 303, sb_bundesliga_stake: 272, sb_afcon_stake: 182, sb_kpl_stake: 121, sb_nba_stake: 182, sb_atp_stake: 143, sb_rugby_stake: 0, casino_rounds: 165, casino_stake: 2720, casino_ggr: 190, casino_slots_stake: 1088, casino_live_stake: 1088, casino_crash_stake: 544, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 800, total_ggr: 680 },
      { month: "Jan 26",  players: 3, active_players: 3, dormant_players: 0, new_players: 0, churned_players: 0, reactivated_players: 0, deposits: 1000, withdrawals: 0, deposit_count: 4, withdrawal_count: 0, avg_deposit: 250, failed_deposits: 0, sb_bets: 5, sb_stake: 1200, sb_ggr: 144, sb_win_count: 2, sb_avg_odds: 1.93, sb_parlay_pct: 19, sb_cashout_count: 0, sb_epl_stake: 445, sb_laliga_stake: 223, sb_ucl_stake: 178, sb_serie_a_stake: 89, sb_bundesliga_stake: 80, sb_afcon_stake: 53, sb_kpl_stake: 36, sb_nba_stake: 53, sb_atp_stake: 43, sb_rugby_stake: 0, casino_rounds: 75, casino_stake: 800, casino_ggr: 56, casino_slots_stake: 320, casino_live_stake: 320, casino_crash_stake: 160, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 0, casino_bonus_used: 300, total_ggr: 200 }
    ]
  },

  {
    id: "seg18",
    name: "Top 1% Volume",
    description: "Extreme volume players.",
    color: "#000000",
    is_favorite: false,
    total_players: 2,
    total_deposits: 1500000,
    total_withdrawals: 600000,
    total_bets: 2500000,
    monthly_trend: [
      { month: "Aug 25",  players: 55, active_players: 30, dormant_players: 5, new_players: 15,  blocked_players: 5, deposits: 200000, withdrawals: 80000, deposit_count: 18, withdrawal_count: 8, avg_deposit: 11111, failed_deposits: 10, sports_bets: 210, casino_bets:290,sb_stake: 210000, sb_ggr: 25200, sb_win_count: 82, sb_avg_odds: 2.40, sb_parlay_pct: 10, sb_cashout_count: 15, sb_epl_stake: 80000, sb_laliga_stake: 40000, sb_ucl_stake: 32000, sb_serie_a_stake: 16000, sb_bundesliga_stake: 14400, sb_afcon_stake: 9600, sb_kpl_stake: 6400, sb_nba_stake: 6400, sb_atp_stake: 3200, sb_rugby_stake: 2000, casino_rounds: 1850, casino_stake: 140000, casino_ggr: 9800, casino_slots_stake: 42000, casino_live_stake: 77000, casino_crash_stake: 21000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 12000, total_ggr: 35000 },
      { month: "Sep 25",  players: 90, active_players: 60, dormant_players: 10, new_players: 20, blocked_players: 0,  deposits: 250000, withdrawals: 100000, deposit_count: 22, withdrawal_count: 10, avg_deposit: 11364, failed_deposits: 2, sports_bets: 235,casino_bets:400, sb_stake: 252000, sb_ggr: 30240, sb_win_count: 92, sb_avg_odds: 2.42, sb_parlay_pct: 10, sb_cashout_count: 17, sb_epl_stake: 96000, sb_laliga_stake: 48000, sb_ucl_stake: 38400, sb_serie_a_stake: 19200, sb_bundesliga_stake: 17280, sb_afcon_stake: 11520, sb_kpl_stake: 7680, sb_nba_stake: 7680, sb_atp_stake: 3840, sb_rugby_stake: 2400, casino_rounds: 2220, casino_stake: 168000, casino_ggr: 11760, casino_slots_stake: 50400, casino_live_stake: 92400, casino_crash_stake: 25200, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 2, casino_bonus_used: 15000, total_ggr: 42000 },
      { month: "Oct 25",  players: 118, active_players: 40, dormant_players: 2, new_players: 63, blocked_players: 3,  deposits: 280000, withdrawals: 120000, deposit_count: 24, withdrawal_count: 12, avg_deposit: 11667, failed_deposits: 1, sports_bets: 272,casino_bets:367, sb_stake: 288000, sb_ggr: 34560, sb_win_count: 106, sb_avg_odds: 2.44, sb_parlay_pct: 11, sb_cashout_count: 19, sb_epl_stake: 109800, sb_laliga_stake: 54900, sb_ucl_stake: 43920, sb_serie_a_stake: 21960, sb_bundesliga_stake: 19764, sb_afcon_stake: 13176, sb_kpl_stake: 8784, sb_nba_stake: 8784, sb_atp_stake: 4392, sb_rugby_stake: 2520, casino_rounds: 2538, casino_stake: 192000, casino_ggr: 13440, casino_slots_stake: 57600, casino_live_stake: 105600, casino_crash_stake: 28800, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 3, casino_bonus_used: 17000, total_ggr: 48000 },
      { month: "Nov 25",  players: 215, active_players: 100, dormant_players: 35, new_players: 65, blocked_players: 15, deposits: 320000, withdrawals: 150000, deposit_count: 28, withdrawal_count: 14, avg_deposit: 11429, failed_deposits: 5, sports_bets: 314,casino_bets:250, sb_stake: 330000, sb_ggr: 39600, sb_win_count: 122, sb_avg_odds: 2.46, sb_parlay_pct: 11, sb_cashout_count: 22, sb_epl_stake: 125800, sb_laliga_stake: 62900, sb_ucl_stake: 50320, sb_serie_a_stake: 25160, sb_bundesliga_stake: 22644, sb_afcon_stake: 15096, sb_kpl_stake: 10064, sb_nba_stake: 10064, sb_atp_stake: 5032, sb_rugby_stake: 2920, casino_rounds: 2940, casino_stake: 220000, casino_ggr: 15400, casino_slots_stake: 66000, casino_live_stake: 121000, casino_crash_stake: 33000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 3, casino_bonus_used: 20000, total_ggr: 55000 },
      { month: "Dec 25",  players: 202, active_players: 120, dormant_players: 80, new_players: 2, blocked_players: 0, deposits: 400000, withdrawals: 200000, deposit_count: 36, withdrawal_count: 18, avg_deposit: 11111, failed_deposits: 7, sports_bets: 418,casinoBets:303, sb_stake: 420000, sb_ggr: 50400, sb_win_count: 163, sb_avg_odds: 2.50, sb_parlay_pct: 12, sb_cashout_count: 28, sb_epl_stake: 160000, sb_laliga_stake: 80000, sb_ucl_stake: 64000, sb_serie_a_stake: 32000, sb_bundesliga_stake: 28800, sb_afcon_stake: 19200, sb_kpl_stake: 12800, sb_nba_stake: 12800, sb_atp_stake: 6400, sb_rugby_stake: 4000, casino_rounds: 3738, casino_stake: 280000, casino_ggr: 19600, casino_slots_stake: 84000, casino_live_stake: 154000, casino_crash_stake: 42000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 4, casino_bonus_used: 25000, total_ggr: 70000 },
      { month: "Jan 26",  players: 401, active_players: 370, dormant_players: 5, new_players: 25, blocked_players: 1,  deposits: 50000, withdrawals: 0, deposit_count: 6, withdrawal_count: 0, avg_deposit: 8333, failed_deposits: 9, sports_bets: 60, casino_bets:100, sb_ports_stake: 60000, sb_ggr: 7200, sb_win_count: 23, sb_avg_odds: 2.40, sb_parlay_pct: 9, sb_cashout_count: 4, sb_epl_stake: 22860, sb_laliga_stake: 11430, sb_ucl_stake: 9144, sb_serie_a_stake: 4572, sb_bundesliga_stake: 4115, sb_afcon_stake: 2743, sb_kpl_stake: 1829, sb_nba_stake: 1829, sb_atp_stake: 914, sb_rugby_stake: 564, casino_rounds: 535, casino_stake: 40000, casino_ggr: 2800, casino_slots_stake: 12000, casino_live_stake: 22000, casino_crash_stake: 6000, casino_avg_rtp_pct: 93.0, casino_jackpot_wins: 1, casino_bonus_used: 3500, total_ggr: 10000 }
    ]
  }
];

// ─── SPORTSBOOK BETS ────────────────────────────────────────

window.sportsbookBets = [
  { id: "sb001", player_id: "p01", sport: "Football",   market: "Match Winner",     odds: 1.85, stake: 2500,  potential_win: 4625,  outcome: "win",  settled_at: "2026-01-28" },
  { id: "sb002", player_id: "p03", sport: "Football",   market: "Over/Under 2.5",   odds: 1.95, stake: 5000,  potential_win: 9750,  outcome: "loss", settled_at: "2026-01-27" },
  { id: "sb003", player_id: "p05", sport: "Football",   market: "Match Winner",     odds: 3.40, stake: 10000, potential_win: 34000, outcome: "win",  settled_at: "2026-01-26" },
  { id: "sb004", player_id: "p02", sport: "Basketball", market: "Point Spread",     odds: 1.90, stake: 1500,  potential_win: 2850,  outcome: "loss", settled_at: "2026-01-25" },
  { id: "sb005", player_id: "p10", sport: "Football",   market: "Both Teams Score",  odds: 1.75, stake: 8000,  potential_win: 14000, outcome: "win",  settled_at: "2026-01-28" },
  { id: "sb006", player_id: "p04", sport: "Tennis",     market: "Match Winner",     odds: 2.10, stake: 3000,  potential_win: 6300,  outcome: "win",  settled_at: "2026-01-24" },
  { id: "sb007", player_id: "p07", sport: "Football",   market: "Correct Score",    odds: 8.50, stake: 500,   potential_win: 4250,  outcome: "loss", settled_at: "2026-01-29" },
  { id: "sb008", player_id: "p05", sport: "Rugby",      market: "Match Winner",     odds: 2.25, stake: 12000, potential_win: 27000, outcome: "win",  settled_at: "2026-01-30" },
  { id: "sb009", player_id: "p03", sport: "Basketball", market: "Total Points",     odds: 1.88, stake: 4000,  potential_win: 7520,  outcome: "win",  settled_at: "2026-01-22" },
  { id: "sb010", player_id: "p01", sport: "Cricket",    market: "Match Winner",     odds: 1.65, stake: 3500,  potential_win: 5775,  outcome: "loss", settled_at: "2026-01-20" },
  { id: "sb011", player_id: "p11", sport: "Football",   market: "Match Winner",     odds: 2.05, stake: 2000,  potential_win: 4100,  outcome: "win",  settled_at: "2026-01-18" },
  { id: "sb012", player_id: "p12", sport: "Tennis",     market: "Set Betting",      odds: 3.20, stake: 2500,  potential_win: 8000,  outcome: "loss", settled_at: "2026-01-17" },
  { id: "sb013", player_id: "p05", sport: "Football",   market: "Accumulator",      odds: 12.5, stake: 5000,  potential_win: 62500, outcome: "loss", settled_at: "2026-01-15" },
  { id: "sb014", player_id: "p10", sport: "Football",   market: "Asian Handicap",   odds: 1.92, stake: 6000,  potential_win: 11520, outcome: "win",  settled_at: "2026-01-14" },
  { id: "sb015", player_id: "p08", sport: "Basketball", market: "Match Winner",     odds: 1.72, stake: 800,   potential_win: 1376,  outcome: "win",  settled_at: "2026-01-12" },
  { id: "sb016", player_id: "p06", sport: "Football",   market: "Over/Under 2.5",   odds: 1.80, stake: 1200,  potential_win: 2160,  outcome: "win",  settled_at: "2026-01-10" },
  { id: "sb017", player_id: "p09", sport: "Rugby",      market: "Match Winner",     odds: 2.60, stake: 600,   potential_win: 1560,  outcome: "loss", settled_at: "2026-01-08" },
  { id: "sb018", player_id: "p03", sport: "Football",   market: "Match Winner",     odds: 1.55, stake: 9000,  potential_win: 13950, outcome: "win",  settled_at: "2026-01-06" },
  { id: "sb019", player_id: "p05", sport: "Cricket",    market: "Top Batsman",      odds: 4.50, stake: 3000,  potential_win: 13500, outcome: "win",  settled_at: "2026-01-04" },
  { id: "sb020", player_id: "p01", sport: "Football",   market: "Both Teams Score",  odds: 1.70, stake: 4500,  potential_win: 7650,  outcome: "loss", settled_at: "2026-01-02" },
];

window.sportsbookBySport = [
  { sport: "Football",   total_bets: 11, total_staked: 65200, total_won_by_players: 41800, ggr: 23400 },
  { sport: "Basketball", total_bets: 4,  total_staked: 7800,  total_won_by_players: 4226,  ggr: 3574  },
  { sport: "Tennis",     total_bets: 3,  total_staked: 5500,  total_won_by_players: 3150,  ggr: 2350  },
  { sport: "Rugby",      total_bets: 2,  total_staked: 12600, total_won_by_players: 9000,  ggr: 3600  },
  { sport: "Cricket",    total_bets: 2,  total_staked: 6500,  total_won_by_players: 3375,  ggr: 3125  },
];

// Sportsbook performance by tournament
window.sportsbookByTournament = [
  { tournament: "EPL",         sport: "Football",   total_bets: 312, total_staked: 184000, ggr: 22080 },
  { tournament: "La Liga",     sport: "Football",   total_bets: 198, total_staked: 96000,  ggr: 11520 },
  { tournament: "UCL",         sport: "Football",   total_bets: 165, total_staked: 78000,  ggr: 9360  },
  { tournament: "Serie A",     sport: "Football",   total_bets: 112, total_staked: 42000,  ggr: 5040  },
  { tournament: "Bundesliga",  sport: "Football",   total_bets: 98,  total_staked: 36000,  ggr: 4320  },
  { tournament: "AFCON",       sport: "Football",   total_bets: 84,  total_staked: 28000,  ggr: 3360  },
  { tournament: "KPL",         sport: "Football",   total_bets: 72,  total_staked: 18000,  ggr: 2160  },
  { tournament: "NBA",         sport: "Basketball", total_bets: 95,  total_staked: 22000,  ggr: 2640  },
  { tournament: "ATP",         sport: "Tennis",     total_bets: 58,  total_staked: 14000,  ggr: 1680  },
  { tournament: "Rugby Union", sport: "Rugby",      total_bets: 40,  total_staked: 12600,  ggr: 1512  },
];

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
  { id: "cb001", player_id: "p05", game: "Sweet Bonanza",      game_type: "slots",      stake: 500,  win: 1200, net: -700,  played_at: "2026-01-31" },
  { id: "cb002", player_id: "p03", game: "Lightning Roulette", game_type: "live_table", stake: 2000, win: 0,    net: 2000,  played_at: "2026-01-30" },
  { id: "cb003", player_id: "p10", game: "Book of Dead",       game_type: "slots",      stake: 1000, win: 4500, net: -3500, played_at: "2026-01-30" },
  { id: "cb004", player_id: "p05", game: "Live Blackjack",     game_type: "live_table", stake: 5000, win: 9500, net: -4500, played_at: "2026-01-29" },
  { id: "cb005", player_id: "p01", game: "Gates of Olympus",   game_type: "slots",      stake: 800,  win: 0,    net: 800,   played_at: "2026-01-29" },
  { id: "cb006", player_id: "p03", game: "Crazy Time",         game_type: "live_game",  stake: 3000, win: 7500, net: -4500, played_at: "2026-01-28" },
  { id: "cb007", player_id: "p12", game: "Aviator",            game_type: "crash",      stake: 1500, win: 2700, net: -1200, played_at: "2026-01-28" },
  { id: "cb008", player_id: "p07", game: "Aviator",            game_type: "crash",      stake: 600,  win: 0,    net: 600,   played_at: "2026-01-27" },
  { id: "cb009", player_id: "p05", game: "Monopoly Live",      game_type: "live_game",  stake: 4000, win: 8000, net: -4000, played_at: "2026-01-27" },
  { id: "cb010", player_id: "p10", game: "Sweet Bonanza",      game_type: "slots",      stake: 1200, win: 600,  net: 600,   played_at: "2026-01-26" },
  { id: "cb011", player_id: "p02", game: "Aviator",            game_type: "crash",      stake: 400,  win: 880,  net: -480,  played_at: "2026-01-26" },
  { id: "cb012", player_id: "p04", game: "Live Baccarat",      game_type: "live_table", stake: 2500, win: 2400, net: 100,   played_at: "2026-01-25" },
  { id: "cb013", player_id: "p03", game: "Book of Dead",       game_type: "slots",      stake: 2000, win: 0,    net: 2000,  played_at: "2026-01-25" },
  { id: "cb014", player_id: "p05", game: "Sweet Bonanza",      game_type: "slots",      stake: 700,  win: 2800, net: -2100, played_at: "2026-01-24" },
  { id: "cb015", player_id: "p11", game: "Lightning Roulette", game_type: "live_table", stake: 1800, win: 0,    net: 1800,  played_at: "2026-01-23" },
  { id: "cb016", player_id: "p08", game: "Aviator",            game_type: "crash",      stake: 300,  win: 510,  net: -210,  played_at: "2026-01-22" },
  { id: "cb017", player_id: "p06", game: "Gates of Olympus",   game_type: "slots",      stake: 500,  win: 1250, net: -750,  played_at: "2026-01-22" },
  { id: "cb018", player_id: "p01", game: "Crazy Time",         game_type: "live_game",  stake: 2500, win: 0,    net: 2500,  played_at: "2026-01-20" },
  { id: "cb019", player_id: "p09", game: "Aviator",            game_type: "crash",      stake: 250,  win: 375,  net: -125,  played_at: "2026-01-19" },
  { id: "cb020", player_id: "p10", game: "Live Blackjack",     game_type: "live_table", stake: 4000, win: 3800, net: 200,   played_at: "2026-01-18" },
];

window.casinoByGame = [
  { game: "Aviator",            game_type: "crash",      total_rounds: 6,  total_staked: 3050,  total_paid_out: 4465,  ggr: -1415, rtp_pct: 146.4 },
  { game: "Sweet Bonanza",      game_type: "slots",      total_rounds: 4,  total_staked: 3200,  total_paid_out: 4600,  ggr: -1400, rtp_pct: 143.8 },
  { game: "Book of Dead",       game_type: "slots",      total_rounds: 2,  total_staked: 3000,  total_paid_out: 4500,  ggr: -1500, rtp_pct: 150.0 },
  { game: "Crazy Time",         game_type: "live_game",  total_rounds: 2,  total_staked: 5500,  total_paid_out: 7500,  ggr: -2000, rtp_pct: 136.4 },
  { game: "Lightning Roulette", game_type: "live_table", total_rounds: 2,  total_staked: 3800,  total_paid_out: 0,     ggr: 3800,  rtp_pct: 0     },
  { game: "Live Blackjack",     game_type: "live_table", total_rounds: 2,  total_staked: 9000,  total_paid_out: 13300, ggr: -4300, rtp_pct: 147.8 },
  { game: "Monopoly Live",      game_type: "live_game",  total_rounds: 1,  total_staked: 4000,  total_paid_out: 8000,  ggr: -4000, rtp_pct: 200.0 },
  { game: "Gates of Olympus",   game_type: "slots",      total_rounds: 2,  total_staked: 1300,  total_paid_out: 1250,  ggr: 50,    rtp_pct: 96.2  },
  { game: "Live Baccarat",      game_type: "live_table", total_rounds: 1,  total_staked: 2500,  total_paid_out: 2400,  ggr: 100,   rtp_pct: 96.0  },
];

window.casinoByGameType = [
  { game_type: "slots",      total_rounds: 8,  total_staked: 7500,  ggr: -2850 },
  { game_type: "crash",      total_rounds: 6,  total_staked: 3050,  ggr: -1415 },
  { game_type: "live_table", total_rounds: 5,  total_staked: 15300, ggr: -400  },
  { game_type: "live_game",  total_rounds: 3,  total_staked: 9500,  ggr: -6000 },
];

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
  { id: "d001", player_id: "p05", amount: 50000, method: "M-Pesa",  status: "completed", created_at: "2026-01-31" },
  { id: "d002", player_id: "p03", amount: 20000, method: "Bank",    status: "completed", created_at: "2026-01-30" },
  { id: "d003", player_id: "p10", amount: 15000, method: "M-Pesa",  status: "completed", created_at: "2026-01-29" },
  { id: "d004", player_id: "p01", amount: 8000,  method: "Card",    status: "completed", created_at: "2026-01-28" },
  { id: "d005", player_id: "p05", amount: 30000, method: "M-Pesa",  status: "completed", created_at: "2026-01-27" },
  { id: "d006", player_id: "p04", amount: 5000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-26" },
  { id: "d007", player_id: "p02", amount: 2000,  method: "Card",    status: "completed", created_at: "2026-01-25" },
  { id: "d008", player_id: "p11", amount: 3500,  method: "M-Pesa",  status: "completed", created_at: "2026-01-24" },
  { id: "d009", player_id: "p07", amount: 4000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-23" },
  { id: "d010", player_id: "p08", amount: 1500,  method: "Card",    status: "completed", created_at: "2026-01-22" },
  { id: "d011", player_id: "p03", amount: 25000, method: "Bank",    status: "completed", created_at: "2026-01-21" },
  { id: "d012", player_id: "p12", amount: 6000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-20" },
  { id: "d013", player_id: "p06", amount: 1800,  method: "Card",    status: "completed", created_at: "2026-01-18" },
  { id: "d014", player_id: "p09", amount: 1200,  method: "M-Pesa",  status: "completed", created_at: "2026-01-15" },
  { id: "d015", player_id: "p05", amount: 40000, method: "Bank",    status: "completed", created_at: "2026-01-10" },
  { id: "d016", player_id: "p10", amount: 20000, method: "M-Pesa",  status: "completed", created_at: "2026-01-08" },
  { id: "d017", player_id: "p01", amount: 10000, method: "M-Pesa",  status: "completed", created_at: "2026-01-05" },
  { id: "d018", player_id: "p02", amount: 1500,  method: "Card",    status: "failed",    created_at: "2026-01-04" },
  { id: "d019", player_id: "p07", amount: 5000,  method: "M-Pesa",  status: "completed", created_at: "2026-01-02" },
  { id: "d020", player_id: "p04", amount: 8000,  method: "Bank",    status: "pending",   created_at: "2026-01-01" },
];

window.depositsMonthly = [
  { month: "Aug 25", total: 124000, count: 210, avg_deposit: 590, mpesa_pct: 68, bank_pct: 18, card_pct: 14 },
  { month: "Sep 25", total: 151000, count: 248, avg_deposit: 609, mpesa_pct: 70, bank_pct: 16, card_pct: 14 },
  { month: "Oct 25", total: 178000, count: 290, avg_deposit: 614, mpesa_pct: 71, bank_pct: 15, card_pct: 14 },
  { month: "Nov 25", total: 215000, count: 340, avg_deposit: 632, mpesa_pct: 72, bank_pct: 15, card_pct: 13 },
  { month: "Dec 25", total: 268000, count: 415, avg_deposit: 646, mpesa_pct: 73, bank_pct: 14, card_pct: 13 },
  { month: "Jan 26", total: 307000, count: 471, avg_deposit: 651, mpesa_pct: 74, bank_pct: 14, card_pct: 12 },
];

window.depositsByMethod = [
  { method: "M-Pesa",        total_amount: 724000, count: 1042, pct: 72.4 },
  { method: "Bank Transfer", total_amount: 148000, count: 156,  pct: 14.8 },
  { method: "Card",          total_amount: 128000, count: 210,  pct: 12.8 },
];

// ─── WITHDRAWALS ────────────────────────────────────────────

window.withdrawals = [
  { id: "w001", player_id: "p05", amount: 25000, method: "M-Pesa", status: "completed", created_at: "2026-01-30" },
  { id: "w002", player_id: "p03", amount: 12000, method: "Bank",   status: "completed", created_at: "2026-01-29" },
  { id: "w003", player_id: "p10", amount: 8000,  method: "M-Pesa", status: "completed", created_at: "2026-01-28" },
  { id: "w004", player_id: "p05", amount: 18000, method: "M-Pesa", status: "completed", created_at: "2026-01-27" },
  { id: "w005", player_id: "p01", amount: 5000,  method: "M-Pesa", status: "completed", created_at: "2026-01-25" },
  { id: "w006", player_id: "p03", amount: 9000,  method: "Bank",   status: "completed", created_at: "2026-01-23" },
  { id: "w007", player_id: "p04", amount: 3000,  method: "M-Pesa", status: "completed", created_at: "2026-01-22" },
  { id: "w008", player_id: "p10", amount: 11000, method: "Bank",   status: "pending",   created_at: "2026-01-21" },
  { id: "w009", player_id: "p07", amount: 2500,  method: "M-Pesa", status: "completed", created_at: "2026-01-19" },
  { id: "w010", player_id: "p12", amount: 4000,  method: "M-Pesa", status: "completed", created_at: "2026-01-17" },
  { id: "w011", player_id: "p05", amount: 30000, method: "Bank",   status: "completed", created_at: "2026-01-15" },
  { id: "w012", player_id: "p11", amount: 1800,  method: "M-Pesa", status: "completed", created_at: "2026-01-12" },
  { id: "w013", player_id: "p02", amount: 800,   method: "M-Pesa", status: "completed", created_at: "2026-01-10" },
  { id: "w014", player_id: "p06", amount: 700,   method: "Card",   status: "failed",    created_at: "2026-01-08" },
  { id: "w015", player_id: "p08", amount: 500,   method: "M-Pesa", status: "completed", created_at: "2026-01-05" },
];

window.withdrawalsMonthly = [
  { month: "Aug 25", total: 42000,  count: 88,  avg_withdrawal: 477 },
  { month: "Sep 25", total: 53000,  count: 108, avg_withdrawal: 491 },
  { month: "Oct 25", total: 68000,  count: 135, avg_withdrawal: 504 },
  { month: "Nov 25", total: 84000,  count: 162, avg_withdrawal: 519 },
  { month: "Dec 25", total: 112000, count: 208, avg_withdrawal: 538 },
  { month: "Jan 26", total: 131000, count: 241, avg_withdrawal: 544 },
];

// ─── PLAYER ACTIVITY ────────────────────────────────────────

window.playerStatusSummary = {
  active:  { count: 12, pct: 66.7, avg_monthly_deposit: 28400, avg_monthly_bets: 41800 },
  dormant: { count: 6,  pct: 33.3, avg_monthly_deposit: 0,     avg_monthly_bets: 0     },
};

window.playerActivityMonthly = [
  { month: "Aug 25", new_registrations: 8,  churned: 2, active_eom: 38, dormant_eom: 12 },
  { month: "Sep 25", new_registrations: 11, churned: 3, active_eom: 44, dormant_eom: 14 },
  { month: "Oct 25", new_registrations: 14, churned: 4, active_eom: 51, dormant_eom: 15 },
  { month: "Nov 25", new_registrations: 18, churned: 5, active_eom: 60, dormant_eom: 16 },
  { month: "Dec 25", new_registrations: 22, churned: 6, active_eom: 71, dormant_eom: 17 },
  { month: "Jan 26", new_registrations: 28, churned: 8, active_eom: 84, dormant_eom: 18 },
];

// ─── PLATFORM KPIs ──────────────────────────────────────────

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
  top_tournament: "EPL",
};