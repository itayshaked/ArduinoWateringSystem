export const updateLive=function(){
    return{type:'UPDATE_LIVE_DATA'}
}
export const updateHistory=function(){
    return {type:'UPDATE_HISTORY_DATA'}
}
export const updateTime=function(time){
    return {type:'UPDATE_TIME',payload:time}
}
export const updateDataKey=function(dataKey){
    return {type:'UPDATE_DATA_KEY',payload:dataKey}
}


