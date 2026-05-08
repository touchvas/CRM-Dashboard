document.addEventListener("DOMContentLoaded", function () {
    // ── Global Chart Defaults ────────────────────────────────
    const chartColors = {
        primary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#06b6d4',
        purple: '#8b5cf6',
        pink: '#ec4899'
    };

    // ── Main Performance Trends Chart (Betting Volume) ─────────
    var performanceOptions = {
        series: [{
            name: 'Total Stakes',
            data: [45000, 52000, 48000, 72000, 85000, 142000, 128000]
        }, {
            name: 'Total Payouts',
            data: [38000, 41000, 52000, 61000, 72000, 98000, 105000]
        }],
        chart: {
            height: 400,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: [chartColors.primary, chartColors.purple],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.05)',
            strokeDashArray: 4
        },
        legend: { position: 'top', horizontalAlign: 'right', fontWeight: 600 }
    };
    new ApexCharts(document.querySelector("#main_performance_chart"), performanceOptions).render();

    // ── Market Sentiment Gauge ──────────────────────────────
    var sentimentOptions = {
        series: [74],
        chart: { height: 280, type: 'radialBar' },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: { size: '70%' },
                track: { background: '#f1f5f9', strokeWidth: '100%' },
                dataLabels: {
                    name: { fontSize: '13px', color: '#64748b', offsetY: 100, show: true, label: 'MARKET STABILITY' },
                    value: {
                        offsetY: 0,
                        fontSize: '34px',
                        color: '#1e293b',
                        fontWeight: 800,
                        formatter: function (val) { return val + "%"; }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: [chartColors.info],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: { dashArray: 4 },
        labels: ['Sentiment Index'],
    };
    new ApexCharts(document.querySelector("#sentiment_gauge_chart"), sentimentOptions).render();

    // ── Regional Wagering (Horizontal Bar) ─────────────────────
    var regionalOptions = {
        series: [{
            name: 'Bets Placed',
            data: [1204, 980, 850, 720, 610, 540, 480]
        }],
        chart: { type: 'bar', height: 300, toolbar: { show: false } },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: '55%',
                distributed: true
            }
        },
        dataLabels: { enabled: false },
        colors: [chartColors.primary, chartColors.info, chartColors.success, chartColors.warning, chartColors.danger, chartColors.purple, chartColors.pink],
        xaxis: {
            categories: ['English Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League'],
            axisBorder: { show: false }
        },
        grid: { borderColor: 'rgba(0,0,0,0.05)' },
        legend: { show: false }
    };
    new ApexCharts(document.querySelector("#regional_volume_chart"), regionalOptions).render();

    // ── Revenue Performance (GGR vs NGR) ───────────────────────
    var revenueOptions = {
        series: [{
            name: 'Gross Gaming Revenue (GGR)',
            data: [42, 52, 45, 61, 58, 85, 92]
        }, {
            name: 'Net Gaming Revenue (NGR)',
            data: [28, 35, 30, 42, 40, 62, 71]
        }],
        chart: { height: 320, type: 'area', toolbar: { show: false } },
        colors: [chartColors.success, chartColors.info],
        dataLabels: { enabled: false },
        stroke: { curve: 'stepline', width: 2 },
        fill: {
            type: 'gradient',
            gradient: { opacityFrom: 0.4, opacityTo: 0 }
        },
        yaxis: { labels: { formatter: (v) => v + "M" } },
        xaxis: { categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] },
        grid: { borderColor: 'rgba(0,0,0,0.05)' }
    };
    new ApexCharts(document.querySelector("#revenue_trend_chart"), revenueOptions).render();

    // ── Bet Type Distribution (Donut) ──────────────────────────
    var betTypeOptions = {
        series: [64, 36],
        chart: { height: 260, type: 'donut' },
        labels: ['Single Bets', 'Multi-Bets'],
        colors: [chartColors.success, chartColors.primary],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Bets',
                            formatter: () => '142K'
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        legend: { position: 'bottom' }
    };
    new ApexCharts(document.querySelector("#bet_type_distribution_chart"), betTypeOptions).render();
});
