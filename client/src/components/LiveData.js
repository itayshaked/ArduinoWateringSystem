 import React, { Component } from 'react';
 import './LiveData.css'
 import {connect} from 'react-redux'

 
 class liveData  extends Component {
    constructor(props) {
        super(props);
        this.rainToday=this.rainToday.bind(this)
        this.toDate=this.toDate.bind(this)
    }
    rainToday(water_sensor){
        if(water_sensor===1)return "No"
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
            <div className="liveData">
            <h3 className='header'>Live Data:</h3>
            <p className='temp'>Temperature: {!this.props.data ? "Loading..." : this.props.data.temp+"C"}</p>
            <p className='humid'>Humidity: {!this.props.data ? "Loading..." : this.props.data.humid+"%"}</p>
            <p className='soil'>Soil Moisture: {!this.props.data ? "Loading..." : this.props.data.soil_moist}</p>
            <p className='rain'>Did it rain today? {!this.props.data ? "Loading..." :this.rainToday(this.props.data.water_sensor)}</p>
            <p className='uv'>UV index: {!this.props.data ? "Loading..." : this.props.data.UV}</p>
            <p className='time'>Time: {!this.props.data ? "Loading..." : this.toDate(this.props.data.timestamp)}</p>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    data:state.liveData
})

export default connect(mapStateToProps)(liveData)

 