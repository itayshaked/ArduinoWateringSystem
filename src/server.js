import api from './api.js'
const apis=new api('http://localhost:5000/data')


function falseArduActions(){
    return {name:"Avocado",temp:Math.floor(10+Math.random()*20),soil_moist:Math.floor(Math.random()*100)} 
    
}
async function UpdateDataFromDevice(){
    const data=falseArduActions()
    console.log(data)
   apis.updateItem("Avocado","soil_moist",data.soil_moist)
   apis.updateItem("enviorment","temp",data.temp)
    //gets data from arduino and sends to api
}
async function SendDataToDevice(){
    //sends data to arduino
}
UpdateDataFromDevice()
setInterval(()=>{UpdateDataFromDevice()},10000)






