import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DynamicChart = (props) => {
  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    chart: {
      height: props.height,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 },
      },
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: { text: props.title, align: 'left' },
    markers: { size: 0 },
    xaxis: { type: 'datetime' },
    yaxis: { max: 100 },
    legend: { show: false },
  });

  useEffect(() => {
    let lastTimestamp = new Date().getTime();

    const interval = setInterval(() => {
      setSeries((prevSeries) => {
        const now = new Date().getTime(); // Current timestamp
        const newData = [...prevSeries[0].data];

        // Add a new point with a timestamp and random value
        const newPoint = [now, Math.floor(Math.random() * (90 - 10 + 1)) + 10];
        newData.push(newPoint);

        // Keep only the last 10 seconds of data
        const tenSecondsAgo = now - 10000;
        const filteredData = newData.filter(([timestamp]) => timestamp >= tenSecondsAgo);

        // Update the x-axis range dynamically
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            min: tenSecondsAgo,
            max: now,
          },
        }));

        lastTimestamp = now;
        return [{ data: filteredData }];
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={props.height} />
    </div>
  );
};

export default DynamicChart;
