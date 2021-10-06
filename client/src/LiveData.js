 import React, { Component } from 'react';
 
 export default class liveData  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.rainToday=this.rainToday.bind(this)
        this.toDate=this.toDate.bind(this)
    }
    rainToday(water_sensor){
        if(water_sensor==1)return "No"
        else return "Yes"
      }
      toDate(timestamp){
        let unix_timestamp = timestamp
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
      }
    render() { 
        return (  
            <div style={{width:'100%'}}>
            <p>Temperature: {!this.props.liveData ? "Loading..." : this.props.liveData.temp+"C"}</p>
            <p>Humidity: {!this.props.liveData ? "Loading..." : this.props.liveData.humid+"%"}</p>
            <p>Soil Moisture: {!this.props.liveData ? "Loading..." : this.props.liveData.soil_moist}</p>
            <p>Did it rain today? {!this.props.liveData ? "Loading..." :this.rainToday(this.props.liveData.water_sensor)}</p>
            <p>UV index: {!this.props.liveData ? "Loading..." : this.props.liveData.UV}</p>
            <p>Time: {!this.props.liveData ? "Loading..." : this.toDate(this.props.liveData.timestamp)}</p>
            </div>
        );
    }
}
 