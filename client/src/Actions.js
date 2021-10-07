import React, { Component } from 'react';
import './Actions.css'

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {timeToRetreive:"24"}
    }
    render() { 
        return (
            <div className="actions">
            <h3 >Data Settings:</h3>
            <p> Time to retreive data(Hours):
           
            <form  onSubmit={(event)=>{
                this.props.updateGraphData(this.state.timeToRetreive)
                event.preventDefault()
                }}>
            <input className="input" type="text" value={this.state.timeToRetreive} onChange={(event)=>{this.setState({timeToRetreive:event.target.value})}}/>
            <input className="submit" type="submit"/>
            
            </form>
            </p>
           
            
            <p className='buttons'>
            <button className='button' onClick={()=>{this.props.updateKeyData("UV")}}>UV </button>     
            <button className='button' onClick={()=>{this.props.updateKeyData("temp")}}>Temperature </button>
            <button className='button' onClick={()=>{this.props.updateKeyData("soil_moist")}}>Soil Moisture </button> 
            <button className='button' onClick={()=>{this.props.updateKeyData("humid")}}>Humidity </button>
            </p>
            </div>
          );
    }
}
 
export default Actions;