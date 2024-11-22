import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const RealtimeChart = ({
  title,
  color,
  label,
  data,
  tension,
  yMin,
  yMax,
  yTitle,
  yStepSize,
  lastUpdated
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: title,
      data: [],
      borderColor: color,
    }]
  });
  const [yAxisMin, setYAxisMin] = useState(yMin);
  const [yAxisMax, setYAxisMax] = useState(yMax);

  const chartRef = useRef(null);

  function addData(label, newData) {
    setChartData(prevData => {
      const newLabels = [...prevData.labels, label];
      const newTemperatureData = [...prevData.datasets[0].data, newData.Temperature = label === "Humidity" ? newData.Humidity : newData.Temperature];

      return {
        labels: newLabels,
        datasets: [
          { ...prevData.datasets[0], data: newTemperatureData }
        ]
      };
    });
  }

  function removeData() {
    setChartData(prevData => {
      const newLabels = prevData.labels.slice(1);
      const newTemperatureData = prevData.datasets[0].data.slice(1);

      return {
        labels: newLabels,
        datasets: [
          { ...prevData.datasets[0], data: newTemperatureData },
        ]
      };
    });
  }

  useEffect(() => {
    if (data && lastUpdated) {
      const label = formatTime(lastUpdated);
      const temperature = title === "Humidity" ? data.Humidity : title === "Cps" ? data.Cps : title === "uSv" ? data.uSv : data.Temperature;
      addData(label, { Temperature: temperature });
      if (chartData.labels.length > 20) {
        removeData();
      }
    }
  }, [lastUpdated]);

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels,
      },
      y: {
        min: yAxisMin,
        max: yAxisMax,
        title: {
          display: true,
          text: yTitle || 'Value',
        },
        ticks: {
          stepSize: yStepSize || 0.1,
        },
      }
    }
  };


  return (
    <div>
      <h2>Realtime Data Chart</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default RealtimeChart;
