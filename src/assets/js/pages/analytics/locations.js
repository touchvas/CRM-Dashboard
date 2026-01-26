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
    if (document.getElementById("locations_chart")) {
        var options = {
            series: [{
                data: [45000, 28000, 15000, 9000, 5000]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Kenya', 'Nigeria', 'Ghana', 'Uganda', 'Tanzania'],
            },
            colors: getChartColorsArray("locations_chart")
        };

        var chart = new ApexCharts(document.querySelector("#locations_chart"), options);
        chart.render();
    }
});
