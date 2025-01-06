// // import React, { useEffect, useRef } from "react";
// // import ApexCharts from "apexcharts";

// // const BarChart = (props) => {
// //   const chartRef = useRef(null);

// //   useEffect(() => {
// //     const options = {
// //       series: [
// //         {
// //           name: "Sales",
// //           data: [35000, 31000, 40000, 10100, 40000, 30600, 30200, 23000, 14000, 8000, 50000, 27000],
// //         },
// //       ],
// //       chart: {
// //         height: 150,
// //         type: props.type || "bar", // "line", "area", "bar"
// //       },
// //       plotOptions: {
// //         bar: {
// //           borderRadius: 2,
// //           dataLabels: {
// //             position: "top", // top, center, bottom
// //           },
// //           columnWidth:"15%"
// //         },
// //       },
// //       dataLabels: {
// //         enabled: props.dataLabels,
// //         formatter: function (val) {
// //           return val;
// //         },
// //         offsetY: -20,
// //         style: {
// //           fontSize: "12px",
// //           colors: ["#304758"],
// //         },
// //       },
// //       xaxis: {
// //         categories: [
// //           "Jan",
// //           "Feb",
// //           "Mar",
// //           "Apr",
// //           "May",
// //           "Jun",
// //           "Jul",
// //           "Aug",
// //           "Sep",
// //           "Oct",
// //           "Nov",
// //           "Dec",
// //         ],
// //         position: "bottom",
// //         axisBorder: {
// //           show: false,
// //         },
// //         axisTicks: {
// //           show: false,
// //         },
// //         crosshairs: {
// //           fill: {
// //             type: "gradient",
// //             gradient: {
// //               colorFrom: "#D8E3F0",
// //               colorTo: "#BED1E6",
// //               stops: [0, 100],
// //               opacityFrom: 0.4,
// //               opacityTo: 0.5,
// //             },
// //           },
// //         },
// //         tooltip: {
// //           enabled: true,
// //         },
// //       },
// //       yaxis: {
// //         axisBorder: {
// //           show: false,
// //         },
// //         axisTicks: {
// //           show: false,
// //         },
// //         labels: {
// //           show: false,
// //           formatter: function (val) {
// //             return val ;
// //           },
// //         },
// //       },
// //       title: {
// //         text: "Monthly Inflation in Argentina, 2002",
// //         floating: true,
// //         offsetY: 330,
// //         align: "center",
// //         style: {
// //           color: "#444",
// //         },
// //       },
// //     };

// //     const chart = new ApexCharts(chartRef.current, options);
// //     chart.render();

// //     return () => {
// //       chart.destroy(); // Clean up on component unmount
// //     };
// //   }, []);

// //   return (
// //     <div
// //       id="chart"
// //       ref={chartRef}
// //       style={{
// //         transform: props.scale ? `scale(${props.scale})` : "scale(1)", // Scale down to half size
// //         transformOrigin: "top left", // Keep the chart anchored to the top left
// //       }}
// //     ></div>
// //   );
// // };

// // export default BarChart;

// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const LinearChart = ({
//   dataLabels,
//   height,
//   type,
// }) => {
//   const [chartOptions, setChartOptions] = useState({
//     series: [
//       {
//         name: "Sales",
//         data: [
//           35000, 31000, 40000, 10100, 40000, 30600, 30200, 23000, 14000, 8000,
//           50000, 27000,
//         ],
//       },
//     ],
//     chart: {
//       height: 150,
//       type: type ? type : "bar", // "line", "area", "bar"
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 2,
//         dataLabels: {
//           position: "top", // top, center, bottom
//         },
//         columnWidth: "15%",
//       },
//     },
//     dataLabels: {
//       enabled: dataLabels, //true false
//       formatter: function (val) {
//         return val;
//       },
//       offsetY: -20,
//       style: {
//         fontSize: "12px",
//         colors: ["#304758"],
//       },
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       position: "bottom",
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//       crosshairs: {
//         fill: {
//           type: "gradient",
//           gradient: {
//             colorFrom: "#D8E3F0",
//             colorTo: "#BED1E6",
//             stops: [0, 100],
//             opacityFrom: 0.4,
//             opacityTo: 0.5,
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     yaxis: {
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//       labels: {
//         show: false,
//         formatter: function (val) {
//           return val;
//         },
//       },
//     },
//     title: {
//       text: "Monthly Inflation in Argentina, 2002",
//       floating: true,
//       offsetY: 330,
//       align: "center",
//       style: {
//         color: "#444",
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={chartOptions.options}
//           series={chartOptions.series}
//           type={type ? type : "bar"}
//           height={height || 350}
//         />
//       </div>
//     </div>
//   );
// };

// export default LinearChart;

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LinearChart = ({
  chartTitle,
  chartData,
  chartCategories,
  height = 350, // Default height
  type = "bar", // Default type
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
        height: height,
        type: type,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2, // Default line width
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
      plotOptions: {
        bar: {
          borderRadius: 2,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          columnWidth: "15%",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type={type || "bar"}
          height={height || 200}
        />
      </div>
    </div>
  );
};

export default LinearChart;
