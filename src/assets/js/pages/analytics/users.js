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
    if (document.getElementById("users_chart")) {
        var options = {
            series: [{
                name: 'New Users',
                data: [44, 55, 41, 67, 22, 43, 21]
            }, {
                name: 'Returning Users',
                data: [130, 150, 180, 200, 160, 190, 210]
            }],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            legend: {
                position: 'top',
            },
            fill: {
                opacity: 1
            },
            colors: getChartColorsArray("users_chart")
        };

        var chart = new ApexCharts(document.querySelector("#users_chart"), options);
        chart.render();
    }
});
