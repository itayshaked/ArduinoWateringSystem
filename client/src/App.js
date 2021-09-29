
import './App.css';
import React from 'react';




function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://3emvmdwffh.us-east-2.awsapprunner.com/data")
      .then((res) => res.json())
      .then((data) => setData(data.Item));
  
  }, []);
  function rainToday(water_sensor){
    if(water_sensor==1)return "No"
    else return "Yes"
  }

  
  return (
    <div className="App">
    
      <p>Temperature: {!data ? "Loading..." : data.temp+"C"}</p>
      <p>Humidity: {!data ? "Loading..." : data.humid+"%"}</p>
      <p>Soil Moisture: {!data ? "Loading..." : data.soil_moist}</p>
      <p>Did it rain today? {!data ? "Loading..." :rainToday(data.water_sensor)}</p>
      <p>UV index: {!data ? "Loading..." : data.UV}</p>
      

  </div>
  
  );
}

export default App;
