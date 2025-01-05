import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ columns, dataSource }) => {
  // Extracting categories (x-axis) and data (y-axis) from the props
  const categories = dataSource.map((data) => data[columns[0].dataIndex]); // Product names
  const seriesData = dataSource.map((data) => data[columns[1].dataIndex]); // Count values

  // State for chart options
  const [state, setState] = React.useState({
    series: [
      {
        name: columns[1].title, // Use the title of the "Count" column as the series name
        data: seriesData, // Data for the chart
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Count",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories, // Categories (Product names)
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
