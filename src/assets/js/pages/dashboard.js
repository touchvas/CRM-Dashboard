/*
Template Name: Clivax - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Dashboard Init Js
*/

document.addEventListener("DOMContentLoaded", function () {
    // ---------------------------------------------------------
    // Betting Activity Chart (Area + Line)
    // ---------------------------------------------------------

    // Generate hours 00:00 to 23:00
    var hours = [];
    for (var i = 0; i < 24; i++) {
        hours.push((i < 10 ? '0' + i : i) + ':00');
    }

    // Dummy data mimicking a rising trend with daily activity
    var stakeData = [
        25000, 32000, 35000, 30000, 34000, 38000,
        42000, 40000, 45000, 48000, 52000, 58000,
        62000, 59000, 68000, 72000, 75000, 80000,
        85000, 92000, 88000, 95000, 105000, 115000
    ];

    // Number of bets data
    var betsData = [
        80, 110, 130, 120, 140, 160,
        180, 175, 200, 220, 250, 290,
        310, 295, 340, 360, 380, 410,
        450, 480, 460, 500, 550, 610
    ];

    var options = {
        series: [{
            name: 'Total Stake (KES)',
            type: 'area',
            data: stakeData
        }, {
            name: 'Number of Bets',
            type: 'line',
            data: betsData
        }],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#34c38f', '#556ee6'], // Green, Blue
        stroke: {
            width: [0, 3],
            curve: 'smooth'
        },
        fill: {
            type: ['solid', 'solid'],
            opacity: [0.2, 1],
        },
        dataLabels: {
            enabled: false
        },
        labels: hours,
        xaxis: {
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: [{
            title: {
                text: 'Stake (KES)',
                style: {
                    color: '#34c38f',
                    fontWeight: 500,
                }
            },
            labels: {
                style: {
                    colors: '#34c38f',
                },
                formatter: function (value) {
                    if (value >= 1000) return "KES " + (value / 1000).toFixed(0) + "K";
                    return value;
                }
            }
        }, {
            opposite: true,
            title: {
                text: 'Number of Bets',
                style: {
                    color: '#556ee6',
                    fontWeight: 500,
                }
            },
            labels: {
                style: {
                    colors: '#556ee6',
                }
            }
        }],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -20,
            markers: {
                radius: 12
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            padding: {
                bottom: 10
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#betting_activity_chart"), options);
    chart.render();
});
