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
    return ['#556ee6', '#f1b44c', '#34c38f']; // Default
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("comparison_chart")) {
        // Top 8 Campaigns Comparison Chart
        var options = {
            series: [{
                name: 'Sent',
                data: [44, 55, 41, 67, 22, 43, 21, 49]
            }, {
                name: 'Delivered',
                data: [40, 50, 38, 60, 20, 40, 19, 45]
            }, {
                name: 'Clicked',
                data: [11, 14, 8, 12, 5, 8, 3, 10]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: { enabled: false },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Camp A', 'Camp B', 'Camp C', 'Camp D', 'Camp E', 'Camp F', 'Camp G', 'Camp H'],
            },
            yaxis: {
                title: { text: 'Count' }
            },
            fill: { opacity: 1 },
            colors: getChartColorsArray("comparison_chart"),
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " thousands"
                    }
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#comparison_chart"), options);
        chart.render();
    }
});
