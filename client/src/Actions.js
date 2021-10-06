import React, { Component } from 'react';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {timeToRetreive:"24"}
    }
    render() { 
        return (
            <div>
            <p>Data Settings:
            <br/>
            Time to retreive data(Hours):
            <br/>
            <form onSubmit={(event)=>{
                this.props.updateGraphData(this.state.timeToRetreive)
                event.preventDefault()
                }}>
            <input type="text" value={this.state.timeToRetreive} onChange={(event)=>{this.setState({timeToRetreive:event.target.value})}}/>
            <input type="submit"/>
            </form>
                   
            
            <br/>
            Data to retreive:
            <br/>
            <button onClick={()=>{this.props.updateKeyData("UV")}}>UV </button>     
            <button onClick={()=>{this.props.updateKeyData("temp")}}>Temperature </button>
            <button onClick={()=>{this.props.updateKeyData("soil_moist")}}>Soil Moisture </button> 
            <button onClick={()=>{this.props.updateKeyData("humid")}}>Humidity </button></p>
            </div>
          );
    }
}
 
export default Actions;