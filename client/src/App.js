
import './App.css';
import React from 'react';



function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://3emvmdwffh.us-east-2.awsapprunner.com/data")
      .then((res) => res.json())
      .then((data) => setData(data.Item));
  
  }, []);

  
  return (
    <div className="App">
    <header className="App-header">
      <p>Temperature: {!data ? "Loading..." : data.temp+"C"}</p>
      <p>Humidity: {!data ? "Loading..." : data.humid+"%"}</p>
      <p>Soil Moisture: {!data ? "Loading..." : data.soil_moist+"%"}</p>
      <p>Did it rain today? {!data ? "Loading..." :data.water_sensor}</p>
      <p>UV index: {!data ? "Loading..." : data.UV}</p>
    </header>
  </div>
  );
}

export default App;
