import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MultiBarChart = ({ seriesData, categories, height }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: height || 350, // Default height if not provided
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories || [], // Categories passed as props
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return `$ ${val} thousands`;
    //     },
    //   },
    // },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartOptions} series={seriesData} type="bar" height={height || 350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MultiBarChart;
