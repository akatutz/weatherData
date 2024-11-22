import React, { useState, useEffect } from "react";
import RadiationCard from "./components/RadiationCard";
import RadiationChart from "./components/RealtimeChart";
import RealtimeChart from "./components/RealtimeChart";

const App = () => {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wfbeh93zxl.execute-api.ap-southeast-1.amazonaws.com/getdata"
        );
        const jsonData = await response.json();
        setData(jsonData[0]);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const interval = setInterval(fetchData, 5000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) =>
    date.toLocaleString("en-GB", { hour12: false }).replace(",", "");

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-gray-500 text-lg mb-4">
        Current Time: {formatDateTime(currentTime)}
      </p>
      {data ? (
        <>
          <RadiationCard
            data={data}
            lastUpdated={lastUpdated?.toLocaleString()}
          />
          <div className="mt-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <RealtimeChart
              title="Temperature"
              color="rgba(75, 192, 192, 1)"
              label="Temperature"
              data={data}
              tension={0.4}
              yMin={25}
              yMax={28}
              yTitle="°C"
              yStepSize={0.1}
              lastUpdated={lastUpdated}
            />
            <RealtimeChart
              title="Humidity"
              color="rgba(255, 159, 64, 1)"
              label="Humidity"
              data={data}
              tension={0.3}
              yMin={0}
              yMax={100}
              yTitle="%"
              yStepSize={5}
              lastUpdated={lastUpdated}
            />
            <RealtimeChart
              title="Cps"
              color="rgba(0, 169, 255, 1)"
              label="Cps"
              data={data}
              tension={0.3}
              yMin={0}
              yMax={2}
              yTitle="CPS"
              yStepSize={0.1}
              lastUpdated={lastUpdated}
            />
            <RealtimeChart
              title="uSv"
              color="rgba(153, 102, 255, 1)"
              label="uSv"
              data={data}
              tension={0.3}
              yMin={0}
              yMax={0.5}
              yTitle="µSv/h"
              yStepSize={0.01}
              lastUpdated={lastUpdated}
            />
            <div>Last updated: {lastUpdated?.toLocaleTimeString()}</div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;

