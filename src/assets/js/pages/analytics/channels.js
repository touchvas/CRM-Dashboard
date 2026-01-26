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
    return ['#556ee6'];
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("channels_chart")) {
        var options = {
            series: [{
                data: [4.5, 12.1, 8.3]
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
            dataLabels: { enabled: true },
            xaxis: {
                categories: ['Web Push', 'In-App', 'Onsite'],
            },
            colors: getChartColorsArray("channels_chart"),
            title: {
                text: 'Click Through Rate (%)',
                style: { fontWeight: 500 }
            }
        };

        var chart = new ApexCharts(document.querySelector("#channels_chart"), options);
        chart.render();
    }
});
