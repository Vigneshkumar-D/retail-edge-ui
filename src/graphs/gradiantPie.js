import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const GradientDonutChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [44, 55, 41, 17, 15],
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      // legend: {
      //   formatter: function (val, opts) {
      //     return val + " - " + opts.w.globals.series[opts.seriesIndex];
      //   },
      // },
      title: {
        text: props.title,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy(); // Clean up on component unmount
    };
  }, []);

  return <div id="chart" ref={chartRef}></div>;
};

export default GradientDonutChart;
