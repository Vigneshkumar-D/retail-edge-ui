import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({
  chartTitle,
  chartData,
  chartCategories,
  height,
  type,
}) => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Desktops",
        data: chartData || [41, 35, 148, 69, 51, 49, 62, 91, 10], // Default data
      },
    ],
    options: {
      chart: {
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      title: {
        text: chartTitle || "Product Trends by Month", // Accepts title via props
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // Alternating row colors
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: chartCategories || [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ], // Default categories
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type={type || "line"}
          height={height || 350}
        />
      </div>
    </div>
  );
};

export default LineChart;
