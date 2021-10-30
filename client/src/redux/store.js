import { applyMiddleware, createStore } from "redux";
const url='https://3emvmdwffh.us-east-2.awsapprunner.com'
const apiHandler=store=>next=>action=>{
   
    switch(action.type){
    case 'UPDATE_LIVE_DATA':
        fetch(url+'/data').then(res=>res.json()).then(data=>{
            return(next({type:'UPDATE_LIVE_DATA',payload:data.Item}))
        })
        break
    case 'UPDATE_HISTORY_DATA':   
        fetch(url+'/history/'+store.getState().timeToRetreive).then(res=>res.json()).then(data=>{  
            return(next({type:'UPDATE_HISTORY_DATA',payload:data.Items}))
        })
        break
    case 'UPDATE_TIME':
        return next(action)
    case 'UPDATE_DATA_KEY':
        return next(action)
    default:
        return next(action)    
    }
    
}

const initialState={dataKey:"soil_moist",timeToRetreive:"24",dataArray:[],liveData:{},loading:true}
const dataReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'UPDATE_LIVE_DATA':
            return {...state,liveData:action.payload}
        case 'UPDATE_HISTORY_DATA':
            return {...state,dataArray:action.payload,loading:false}
        case 'UPDATE_TIME':
            return {...state,timeToRetreive:action.payload}
            case 'UPDATE_DATA_KEY':
            return {...state,dataKey:action.payload}
        default:
            return state
    }
}

export const store=createStore(dataReducer,applyMiddleware(apiHandler))