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
    return ['#34c38f', '#556ee6'];
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("devices_chart")) {
        var options = {
            series: [78, 22],
            labels: ['Mobile', 'Desktop'],
            chart: {
                type: 'donut',
                height: 350
            },
            colors: getChartColorsArray("devices_chart"),
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#devices_chart"), options);
        chart.render();
    }
});
