import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Actions.css'
import {updateLive,updateHistory,updateTime,updateDataKey} from '../redux/actions'


class Actions extends Component {
    render() { 
        return (
            <div className="actions">
            <h3 >Data Settings:</h3>
             Time to retreive data(Hours):
           
            <form  onSubmit={(event)=>{
                this.props.updateHistory(this.props.data.timeToRetreive)
                event.preventDefault()
                }}>
            <input className="input" type="text" value={this.props.data.timeToRetreive} onChange={(event)=>{this.props.updateTime(event.target.value)}}/>
            <input className="submit" type="submit"/> 
            </form>
            <p className='buttons'>
            <button className='button' onClick={()=>{this.props.updateDataKey('UV')}}>UV </button>     
            <button className='button' onClick={()=>{this.props.updateDataKey('temp')}}>Temperature </button>
            <button className='button' onClick={()=>{this.props.updateDataKey('soil_moist')}}>Soil Moisture </button> 
            <button className='button' onClick={()=>{this.props.updateDataKey('humid')}}>Humidity </button>
            </p>
            </div>
          );
    }
}
const mapStateToProps=state=>({
    data:state
})
const mapDispatchtoProps=(dispatch)=>{
  return {
    updateLive:()=>{dispatch(updateLive())},
    updateHistory:()=>{dispatch(updateHistory())},
    updateTime:(timeToRetreive)=>{dispatch(updateTime(timeToRetreive))},
    updateDataKey:(dataKey)=>{dispatch(updateDataKey(dataKey))}
  }
}
 
export default connect(mapStateToProps,mapDispatchtoProps)(Actions);