import { LineChart, Line,CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import React from 'react';
import Layout from './Layout';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.formatXAxis=this.formatXAxis.bind(this) 
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
    render() { 
        return ( 
            <div style={{width:'100%',height:300}}>
            <ResponsiveContainer height='100%' width='100%'>
            <LineChart data={this.props.dataArray} >
            <XAxis dataKey="time" tickFormatter={this.formatXAxis}/>
            <YAxis dataKey={this.props.dataKey} interval="preserveEnd" />
            <Line type="monotone" dataKey={this.props.dataKey} stroke="#8884d8"/>
            <Tooltip />
            </LineChart>
            </ResponsiveContainer>
            </div>

        );
    }
}
 
export default Graph 
