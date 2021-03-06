import { LineChart, Line,CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer  } from 'recharts';
import React from 'react';
import './Graph.css'
import { connect } from 'react-redux';



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
var formattedTime =date.getDate()+'/'+(parseInt(date.getMonth())+1)+'/'+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime

     }
    render() { 
        
            return ( 
                
                <ResponsiveContainer className='graph'>
                <LineChart className="chart" stroke="black" data={this.props.data.dataArray} >
                <XAxis dataKey="timestamp" tickFormatter={this.formatXAxis}/>
                <YAxis interval={0} stroke="white" dataKey={this.props.data.dataKey}  />
                
                <Line dot={false} type="monotone" dataKey={this.props.data.dataKey} stroke="white"/>
                <Tooltip contentStyle={{backgroundColor:"#333D79FF", color:"#FAEBEFFF"}} labelFormatter={this.formatXAxis} />
            
                </LineChart>
                </ResponsiveContainer>
                
            );
        
    
    }
}
const mapStateToProps=state=>({
    data:state
  })
 
export default connect(mapStateToProps)(Graph) 
