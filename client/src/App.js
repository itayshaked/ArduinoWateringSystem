
import './App.css';
import React from 'react';
import Graph from './Graph';



class App extends React.Component{
  constructor(props){
    super(props)
    this.state={}
    this.rainToday=this.rainToday.bind(this)
  }
  rainToday(water_sensor){
    if(water_sensor==1)return "No"
    else return "Yes"
  }
  componentDidMount(){
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((data) => this.setState(data.Item));
  }

  componentDidUpdate(){
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((data) => this.setState(data.Item));
  }
  

  render(){
  return (
    <div>
      <p>Temperature: {!this.state ? "Loading..." : this.state.temp+"C"}</p>
      <p>Humidity: {!this.state ? "Loading..." : this.state.humid+"%"}</p>
      <p>Soil Moisture: {!this.state ? "Loading..." : this.state.soil_moist}</p>
      <p>Did it rain today? {!this.state ? "Loading..." :this.rainToday(this.state.water_sensor)}</p>
      <p>UV index: {!this.state ? "Loading..." : this.state.UV}</p>
      <Graph/>
  </div>
  
  
  
  );
}
}
export default App


