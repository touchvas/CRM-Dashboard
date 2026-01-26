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
    return ['#556ee6']; // Default
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("performance_chart")) {
        // Clicks per day chart
        var options = {
            series: [{
                name: "Clicks",
                data: [450, 520, 380, 240, 330, 260, 210, 200, 180]
            }],
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false },
                toolbar: { show: false }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'straight' },
            title: {
                text: 'Daily Engagement',
                align: 'left',
                style: { fontWeight: 500 }
            },
            grid: {
                row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
            },
            xaxis: {
                categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9'],
            },
            colors: getChartColorsArray("performance_chart")
        };

        var chart = new ApexCharts(document.querySelector("#performance_chart"), options);
        chart.render();
    }
});
