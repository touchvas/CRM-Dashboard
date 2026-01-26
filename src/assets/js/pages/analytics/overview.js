/*
Template Name: Clivax - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Analytics Overview Init Js
*/

// TODO: Replace with real analytics API

document.addEventListener("DOMContentLoaded", function () {

    // Check if chart element exists
    if (document.getElementById("overview_trends_chart")) {
        // Overview Trends Chart (Bets & Stake)
        var options = {
            series: [{
                name: 'Total Stake',
                data: [680000, 640000, 820000, 760000, 700000, 720000, 750000]
            }, {
                name: 'Total Bets',
                data: [3450, 3200, 4100, 3800, 3500, 3600, 3750]
            }],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            colors: getChartColorsArray("overview_trends_chart") || ['#34c38f', '#556ee6'],
            xaxis: {
                categories: ['Mar 10', 'Mar 09', 'Mar 08', 'Mar 07', 'Mar 06', 'Mar 05', 'Mar 04'],
            },
            yaxis: [{
                title: {
                    text: 'Stake (KES)',
                },
                labels: {
                    formatter: function (value) {
                        return (value / 1000).toFixed(0) + "K";
                    }
                }
            }, {
                opposite: true,
                title: {
                    text: 'Bets'
                }
            }],
            grid: {
                borderColor: '#f1f1f1',
            }
        };

        var chart = new ApexCharts(document.querySelector("#overview_trends_chart"), options);
        chart.render();
    }

    // Initialize DataTable
    if (document.getElementById("datatable")) {
        $('#datatable').DataTable({
            "order": [],
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
    }

});

// Helper function in case it's missing (though it should be in layout.js or app.js, 
// safely duplicated here or fallback used above)
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
        } else {
            return ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c']; // Default Colors
        }
    }
}
