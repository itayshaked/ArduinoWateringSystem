import { LineChart, Line,CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import React from 'react';

class Graph  extends React.Component {
    
    constructor(props) {
        super(props);
        this.state ={dataArray:[],dataKey:"temp",timeToRetreive:"24"}
        this.formatXAxis=this.formatXAxis.bind(this)
        console.log("Fetching data...")
        fetch('https://3emvmdwffh.us-east-2.awsapprunner.com/history/'+this.state.timeToRetreive).then(res=>res.json()).then(data=>{
            
            data.Items.forEach(element => {
                this.state.dataArray.push(element)   
            })
            this.state.dataArray.sort(( a, b )=> {
                if ( a.time < b.time ){
                  return -1;
                }
                if ( a.time > b.time ){
                  return 1;
                }
                return 0;
              })
            console.log("Data Fetched : ", this.state.dataArray)
           })
           
    }
    formatXAxis = (tickItem) => { 
      let unix_timestamp = tickItem
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
    
     componentDidMount() {
         console.log("Fetching data...")
         fetch('https://3emvmdwffh.us-east-2.awsapprunner.com/history/'+this.state.timeToRetreive).then(res=>res.json()).then((data)=>{
             data.Items.sort(( a, b )=> {
                if ( a.time < b.time ){
                  return -1;
                }
                if ( a.time > b.time ){
                  return 1;
                }
                return 0;
              })
             this.setState({
                 dataArray:data.Items 
             })
             console.log("Data Fetched : ", this.state.dataArray)
            })
   
    }
     
   
    render() { 
        
        return ( 
            <div>
                Data Settings:
                <br/>
                Time to retreive data:
                <br/>
            <button onClick={()=>{this.setState({timeToRetreive:"1"})}}>1 Hour </button> 
            <button onClick={()=>{this.setState({timeToRetreive:"12"})}}>12 Hours </button> 
            <button onClick={()=>{this.setState({timeToRetreive:"24"})}}>24 Hours </button>
            <br/>
            Data to retreive:
            <br/>
            <button onClick={()=>{this.setState({dataKey:"UV"})}}>UV </button>     
            <button onClick={()=>{this.setState({dataKey:"temp"})}}>Temperature </button>
            <button onClick={()=>{this.setState({dataKey:"soil_moist"})}}>Soil Moisture </button> 
            <button onClick={()=>{this.setState({dataKey:"humid"})}}>Humidity </button>
            
            <LineChart width={600} height={300} data={this.state.dataArray} >
         
            <XAxis dataKey="time" tickFormatter={this.formatXAxis} padding={{ left: 30, right: 30 }}/>
            <YAxis dataKey={this.state.dataKey} interval="preserveEnd" />
            <Line type="monotone" dataKey={this.state.dataKey} stroke="#8884d8"/>
            <Tooltip />
            
            </LineChart>
            
           
            
            </div> 

        );
    }
}
 
export default Graph 
