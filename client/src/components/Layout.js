import "./Layout.css";
import React,{Component} from "react";
import Graph from "./Graph";
import LiveData from "./LiveData";
import Actions from "./Actions";
import { connect} from "react-redux";
import {updateLive,updateHistory,updateTime,updateDataKey} from '../redux/actions'

class Layout extends Component {
  constructor(props){
    super(props)
    this.props.updateLive()
    this.props.updateHistory()
    
  }
  

  componentDidMount() {
   
    setInterval(() => {
    this.props.updateLive()
    }, 10000);
    this.props.updateHistory()
    
  }

  render() {
 
    return (
      
      <div className="layout">
        <LiveData/>
        <Actions/>
        {this.props.data.loading?(<div>Loading...</div>):(<Graph/>)}
      
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    data:state
  }
};
const mapDispatchtoProps=(dispatch)=>{
  return {
    updateLive:()=>{dispatch(updateLive())},
    updateHistory:()=>{dispatch(updateHistory())},
    updateTime:(timeToRetreive)=>{dispatch(updateTime(timeToRetreive))},
    updateDataKey:(dataKey)=>{dispatch(updateDataKey(dataKey))}
  }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Layout);
