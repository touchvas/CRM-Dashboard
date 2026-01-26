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
    // Custom defaults for delivery page
    if (chartId === "delivery_chart") return ['#34c38f', '#f46a6a'];
    if (chartId === "engagement_chart") return ['#556ee6', '#f1f1f1'];
    return ['#556ee6'];
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("delivery_chart")) {
        // Delivered vs Failed Donut
        var options1 = {
            series: [98, 2],
            labels: ['Delivered', 'Failed'],
            chart: { type: 'donut', height: 280 },
            colors: getChartColorsArray("delivery_chart"),
            legend: { position: 'bottom' }
        };
        var chart1 = new ApexCharts(document.querySelector("#delivery_chart"), options1);
        chart1.render();
    }

    if (document.getElementById("engagement_chart")) {
        // Clicked vs Ignored Donut
        var options2 = {
            series: [12, 88],
            labels: ['Clicked', 'Ignored'],
            chart: { type: 'donut', height: 280 },
            colors: getChartColorsArray("engagement_chart"),
            legend: { position: 'bottom' }
        };
        var chart2 = new ApexCharts(document.querySelector("#engagement_chart"), options2);
        chart2.render();
    }
});
