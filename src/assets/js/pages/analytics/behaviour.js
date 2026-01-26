// TODO: Replace with real analytics API

function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        if (colors) {
            colors = JSON.parse(colors);
            return colors.map(function (value) {
                var newValue = value.replace(" ", "");
                if (newValue.indexOf(",") === -1) {
                    var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                    if (color) return color;
                    else return newValue;;
                } else {
                    var val = value.split(',');
                    if (val.length == 2) {
                        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                        return rgbaColor;
                    } else {
                        return newValue;
                    }
                }
            });
        }
    }
    return ['#556ee6', '#34c38f', '#f1b44c', '#f46a6a', '#50a5f1'];
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("behaviour_chart")) {
        var options = {
            series: [{
                name: "Funnel Series",
                data: [100000, 12000, 11500, 5000, 3200]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                },
                dropShadow: { enabled: true },
            },
            title: {
                text: 'Campaign Funnel',
                align: 'left',
                style: { fontWeight: 500 }
            },
            xaxis: {
                categories: [
                    'Delivered',
                    'Clicked',
                    'App Opened',
                    'Deposit Viewed',
                    'Bet Placed'
                ],
            },
            legend: {
                show: false,
            },
            colors: getChartColorsArray("behaviour_chart")
        };

        var chart = new ApexCharts(document.querySelector("#behaviour_chart"), options);
        chart.render();
    }
});
