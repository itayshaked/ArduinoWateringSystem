import React, { Component } from 'react';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
            <p>Data Settings:
            <br/>
            Time to retreive data:
            <br/>
            <button onClick={()=>{this.props.updateGraphData("1")}}>1 Hour </button> 
            <button onClick={()=>{this.props.updateGraphData("12")}}>12 Hours </button> 
            <button onClick={()=>{this.props.updateGraphData("24")}}>24 Hours </button>
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