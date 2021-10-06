
import './Layout.css';
import React from 'react';
import Graph from './Graph';
import LiveData from './LiveData';
import Actions from './Actions';

class Layout extends React.Component{
  constructor(props){
    super(props)
    this.state={liveData:{},url:'https://3emvmdwffh.us-east-2.awsapprunner.com',dataArray:[],graphIsLoading:true,dataKey:"temp"}
    this.updateLiveData=this.updateLiveData.bind(this)
    this.updateGraphData=this.updateGraphData.bind(this)
    this.updateKeyData=this.updateKeyData.bind(this)
    
  }
    updateKeyData(datakey){
      this.setState({dataKey:datakey})
    }
  
    updateLiveData(){
      fetch(this.state.url+"/data")
      .then((res) => res.json())
      .then((data) => this.setState({liveData:data.Item}));
    }

    updateGraphData(timeToRetreive){
        console.log("Fetching data...")
        this.setState({isLoading:true})
        fetch(this.state.url+'/history/'+timeToRetreive).then(res=>res.json()).then((data)=>{
          this.setState({
              dataArray:data.Items,
              isLoading:false
            })
        console.log("Data Fetched : ", this.state.dataArray)
        })
    }  
  
  componentDidMount(){
    this.updateLiveData()
    this.updateGraphData("24")
  }
  componentDidUpdate(){
    this.updateLiveData()
  }

  render(){
  return (
      <div>
      <LiveData liveData={this.state.liveData}/>
      <Actions updateGraphData={this.updateGraphData} updateKeyData={this.updateKeyData}/>
      {this.state.GraphIsLoading?(<div>Loading...</div>):(<Graph dataArray={this.state.dataArray} dataKey={this.state.dataKey}/>)}
      </div> 

  
  
  
  );
}
}
export default Layout


