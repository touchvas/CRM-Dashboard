/**
 * Professional Betting Dashboard Data Store & Logic
 * Optimized for diverse visuals and tabular presentation
 */

const DashboardData = {
    "May 2026": {
        kpis: { deposits: "KES 8.42M", ggr: "KES 3.22M", withdrawals: "KES 5.20M", signups: "1,420", stakes: "KES 14.2M", wins: "KES 10.98M" },
        liquidity: { stakes: [450, 520, 480, 610, 580, 850, 920], payouts: [380, 440, 510, 420, 500, 680, 710] },
        cashflow: { deposits: [320, 410, 380, 550, 490, 842, 750], withdrawals: [180, 250, 220, 380, 310, 520, 440] },
        failed: { deposits: [12, 18, 15, 8, 22, 14, 10], withdrawals: [5, 8, 4, 12, 6, 9, 7] },
        activity: { active: [65, 68, 72, 70, 75, 82, 85], dormant: [12, 11, 10, 13, 12, 14, 13] },
        product: [65, 25, 10],
        wagering_mix: [72, 18, 6, 4],
        product_volume: [62, 38],
        sports: [
            { name: 'Football', vol: '8.2M', trend: '+12%', color: 'success' },
            { name: 'Basketball', vol: '2.4M', trend: '+5%', color: 'success' },
            { name: 'Tennis', vol: '1.8M', trend: '-2%', color: 'danger' },
            { name: 'Cricket', vol: '920K', trend: '+8%', color: 'success' },
            { name: 'Boxing', vol: '450K', trend: '+15%', color: 'success' }
        ],
        games: [
            { name: 'Aviator', rev: 'KES 2.4M', players: '4.2k' },
            { name: 'JetX', rev: 'KES 1.8M', players: '2.1k' },
            { name: 'Spaceman', rev: 'KES 1.2M', players: '1.8k' },
            { name: 'Poker', rev: 'KES 950K', players: '840' },
            { name: 'Slots', rev: 'KES 640K', players: '1.2k' }
        ]
    },
    "April 2026": {
        kpis: { deposits: "KES 7.15M", ggr: "KES 2.85M", withdrawals: "KES 4.30M", signups: "1,180", stakes: "KES 12.1M", wins: "KES 9.25M" },
        liquidity: { stakes: [410, 480, 450, 580, 520, 790, 880], payouts: [350, 410, 480, 390, 460, 620, 680] },
        cashflow: { deposits: [280, 350, 320, 480, 410, 715, 620], withdrawals: [150, 210, 180, 320, 260, 430, 380] },
        failed: { deposits: [10, 15, 12, 6, 18, 12, 8], withdrawals: [4, 6, 3, 10, 5, 8, 6] },
        activity: { active: [60, 62, 65, 63, 68, 74, 78], dormant: [15, 14, 12, 15, 14, 16, 15] },
        product: [60, 30, 10],
        wagering_mix: [70, 20, 5, 5],
        product_volume: [58, 42],
        sports: [
            { name: 'Football', vol: '6.8M', trend: '+8%', color: 'success' },
            { name: 'Basketball', vol: '1.9M', trend: '+2%', color: 'success' },
            { name: 'Tennis', vol: '1.4M', trend: '+1%', color: 'success' },
            { name: 'Cricket', vol: '850K', trend: '-4%', color: 'danger' },
            { name: 'Boxing', vol: '320K', trend: '+5%', color: 'success' }
        ],
        games: [
            { name: 'Aviator', rev: 'KES 1.9M', players: '3.8k' },
            { name: 'JetX', rev: 'KES 1.4M', players: '1.9k' },
            { name: 'Spaceman', rev: 'KES 980K', players: '1.5k' },
            { name: 'Poker', rev: 'KES 750K', players: '720' },
            { name: 'Slots', rev: 'KES 520K', players: '1.1k' }
        ]
    },
    "March 2026": {
        kpis: { deposits: "KES 6.90M", ggr: "KES 2.45M", withdrawals: "KES 4.45M", signups: "1,050", stakes: "KES 11.5M", wins: "KES 9.05M" },
        liquidity: { stakes: [390, 450, 420, 550, 500, 750, 820], payouts: [330, 390, 450, 370, 440, 600, 650] },
        cashflow: { deposits: [250, 320, 290, 450, 380, 690, 580], withdrawals: [140, 190, 160, 300, 240, 445, 350] },
        failed: { deposits: [14, 20, 18, 10, 25, 16, 12], withdrawals: [6, 10, 5, 14, 8, 12, 9] },
        activity: { active: [58, 60, 62, 60, 64, 70, 75], dormant: [18, 17, 15, 18, 17, 20, 18] },
        product: [55, 35, 10],
        wagering_mix: [68, 22, 5, 5],
        product_volume: [55, 45],
        sports: [
            { name: 'Football', vol: '6.2M', trend: '+4%', color: 'success' },
            { name: 'Basketball', vol: '1.7M', trend: '-2%', color: 'danger' },
            { name: 'Tennis', vol: '1.2M', trend: '+3%', color: 'success' },
            { name: 'Cricket', vol: '720K', trend: '+1%', color: 'success' },
            { name: 'Boxing', vol: '280K', trend: '+12%', color: 'success' }
        ],
        games: [
            { name: 'Aviator', rev: 'KES 1.7M', players: '3.2k' },
            { name: 'JetX', rev: 'KES 1.2M', players: '1.6k' },
            { name: 'Spaceman', rev: 'KES 850K', players: '1.2k' },
            { name: 'Poker', rev: 'KES 680K', players: '650' },
            { name: 'Slots', rev: 'KES 480K', players: '1k' }
        ]
    }
};

let charts = {};

document.addEventListener("DOMContentLoaded", function () {
    // Initial Load
    initDashboard();

    // Month Filter Listener
    const filter = document.getElementById('monthFilter');
    if (filter) {
        filter.addEventListener('change', function(e) {
            updateDashboard(e.target.value);
        });
    }
});

function initDashboard() {
    const data = DashboardData["May 2026"];
    if (!data) return;
    
    renderKPIs(data.kpis);
    renderTables(data);
    renderCharts(data);
}

function updateDashboard(month) {
    const data = DashboardData[month];
    if (!data) return;
    
    renderKPIs(data.kpis);
    renderTables(data);
    updateCharts(data);
}

function renderKPIs(kpis) {
    const elements = {
        'kpi_deposits': kpis.deposits,
        'kpi_ggr': kpis.ggr,
        'kpi_withdrawals': kpis.withdrawals,
        'kpi_signups': kpis.signups,
        'kpi_stakes': kpis.stakes,
        'kpi_wins': kpis.wins
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }
}

function renderTables(data) {
    const sportsBody = document.getElementById('table_sports');
    if (sportsBody) {
        sportsBody.innerHTML = data.sports.map(s => `
            <tr>
                <td class="fw-bold text-dark">${s.name}</td>
                <td class="fw-bold">${s.vol}</td>
                <td class="text-${s.color} fw-bold">${s.trend}</td>
            </tr>
        `).join('');
    }

    const gamesBody = document.getElementById('table_games');
    if (gamesBody) {
        gamesBody.innerHTML = data.games.map(g => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="game-icon-box me-2">${g.name.charAt(0)}</div>
                        <span class="fw-bold text-dark">${g.name}</span>
                    </div>
                </td>
                <td class="fw-bold">${g.rev}</td>
                <td class="text-muted small">${g.players}</td>
            </tr>
        `).join('');
    }
}

const palette = {
    primary: '#3b82f6', success: '#10b981', danger: '#ef4444',
    warning: '#f59e0b', info: '#06b6d4', purple: '#8b5cf6',
    slate: '#64748b', grid: '#f1f5f9'
};

const commonOptions = {
    chart: { fontFamily: 'Inter, sans-serif', toolbar: { show: false }, zoom: { enabled: false }, parentHeightOffset: 0 },
    grid: { borderColor: palette.grid, strokeDashArray: 4, padding: { top: 10, right: 10, bottom: 20, left: 10 } },
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth' },
    xaxis: { labels: { style: { colors: palette.slate, fontSize: '11px' } }, axisBorder: { show: false } },
    yaxis: { labels: { style: { colors: palette.slate, fontSize: '11px' } } },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '11px', fontWeight: 700 }
};

function renderCharts(data) {
    // Top Row
    const liqEl = document.querySelector("#liquidity_trend_chart");
    if (liqEl) {
        charts.liquidity = new ApexCharts(liqEl, {
        ...commonOptions,
        series: [{ name: 'Stakes', data: data.liquidity.stakes }, { name: 'Payouts', data: data.liquidity.payouts }],
        chart: { ...commonOptions.chart, type: 'area', height: 280 },
        colors: [palette.primary, palette.danger],
        fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
        xaxis: { ...commonOptions.xaxis, categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    });
    charts.liquidity.render();
    }

    const cashEl = document.querySelector("#cashflow_trend_chart");
    if (cashEl) {
        charts.cashflow = new ApexCharts(cashEl, {
        ...commonOptions,
        series: [{ name: 'Deposits', data: data.cashflow.deposits }, { name: 'Withdrawals', data: data.cashflow.withdrawals }],
        chart: { ...commonOptions.chart, type: 'line', height: 280 },
        stroke: { curve: 'stepline', width: 4 },
        colors: [palette.success, palette.warning],
        xaxis: { ...commonOptions.xaxis, categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    });
    charts.cashflow.render();
    }

    const actEl = document.querySelector("#player_activity_chart");
    if (actEl) {
        charts.activity = new ApexCharts(actEl, {
        ...commonOptions,
        series: [{ name: 'Active', data: data.activity.active }, { name: 'Dormant', data: data.activity.dormant }],
        chart: { ...commonOptions.chart, type: 'bar', height: 280 },
        plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
        colors: [palette.success, palette.slate],
        xaxis: { ...commonOptions.xaxis, categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    });
    charts.activity.render();
    }

    // Row 2 & 3
    const prodEl = document.querySelector("#product_split_chart");
    if (prodEl) {
        charts.product = new ApexCharts(prodEl, {
        series: data.product,
        chart: { type: 'donut', height: 320 },
        labels: ['Casino', 'Sportsbook', 'Virtuals'],
        colors: [palette.purple, palette.primary, palette.info],
        plotOptions: { pie: { donut: { size: '75%', labels: { show: true, total: { show: true, label: 'GGR' } } } } },
        legend: { position: 'top', horizontalAlign: 'right' }
    });
    charts.product.render();
    }

    const failEl = document.querySelector("#failed_tx_chart");
    if (failEl) {
        charts.failed = new ApexCharts(failEl, {
        ...commonOptions,
        series: [{ name: 'Failed Deposits', data: data.failed.deposits }, { name: 'Failed Withdrawals', data: data.failed.withdrawals }],
        chart: { ...commonOptions.chart, type: 'bar', height: 280, stacked: true },
        colors: [palette.warning, palette.danger],
        xaxis: { ...commonOptions.xaxis, categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    });
    charts.failed.render();
    }

    const wagEl = document.querySelector("#wagering_mix_chart");
    if (wagEl) {
        charts.wagering = new ApexCharts(wagEl, {
        series: data.wagering_mix,
        chart: { type: 'donut', height: 320 },
        labels: ['Cash', 'Bonus', 'Jackpot', 'CS'],
        colors: [palette.primary, palette.warning, palette.purple, palette.info],
        plotOptions: { pie: { donut: { size: '75%', labels: { show: true, total: { show: true, label: 'CASH' } } } } },
        legend: { position: 'top', horizontalAlign: 'right' }
    });
    charts.wagering.render();
    }

    const volEl = document.querySelector("#product_volume_chart");
    if (volEl) {
        charts.product_volume = new ApexCharts(volEl, {
        series: data.product_volume,
        chart: { type: 'pie', height: 320 },
        labels: ['Sportsbook Vol', 'Casino Vol'],
        colors: [palette.primary, palette.purple],
        legend: { position: 'top', horizontalAlign: 'right' }
    });
    charts.product_volume.render();
    }
}

function updateCharts(data) {
    if (charts.liquidity) charts.liquidity.updateSeries([{ name: 'Stakes', data: data.liquidity.stakes }, { name: 'Payouts', data: data.liquidity.payouts }]);
    if (charts.cashflow) charts.cashflow.updateSeries([{ name: 'Deposits', data: data.cashflow.deposits }, { name: 'Withdrawals', data: data.cashflow.withdrawals }]);
    if (charts.activity) charts.activity.updateSeries([{ name: 'Active', data: data.activity.active }, { name: 'Dormant', data: data.activity.dormant }]);
    if (charts.product) charts.product.updateSeries(data.product);
    if (charts.failed) charts.failed.updateSeries([{ name: 'Failed Deposits', data: data.failed.deposits }, { name: 'Failed Withdrawals', data: data.failed.withdrawals }]);
    if (charts.wagering) charts.wagering.updateSeries(data.wagering_mix);
    if (charts.product_volume) charts.product_volume.updateSeries(data.product_volume);
}
