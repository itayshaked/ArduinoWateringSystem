import AWS from 'aws-sdk'

import mcache from 'memory-cache'
const date=new Date()

//AWS Credentials config
AWS.config.update({
    "region":process.env.AWS_DEFAULT_REGION,
   "accessKeyId":process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey":process.env.AWS_SECRET_ACCESS_KEY_ID
})
const dynamoCLient=new AWS.DynamoDB.DocumentClient()
const TABLE_NAME="Watering_System_Data"
import express, {urlencoded,json } from 'express'
import cors from 'cors'
const app=express()
app.use(urlencoded({extended:true}))
app.use(json())
app.use(cors())
const port=5000
var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          console.log("Cache Updated",date.toUTCString())
          res.sendResponse(body)
        }
        next()
      }
    }
  }
  


app.get('/data',async(req,res)=>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            name:"plant"   
        }
    }
  dynamoCLient.get(params,(err,data)=>{
    if(err){
        console.log("error at app.get",err)
    }
    else{
       res.json(data) 
    }
   })

})
app.get('/history/:time',cache(600),async(req,res)=>{
    const params={
        TableName:'history',
        
        FilterExpression: "#ts>:ts",
        ExpressionAttributeNames:{
            "#ts":"time"
        },
        ExpressionAttributeValues:{
            ":ts":Math.floor(date.now()/1000)-(req.params.time*60*60)
        } 
    }
    
  dynamoCLient.scan(params,(err,data)=>{
    if(err){
        console.log("error at app.get",err)
    }
    else{ 
        data.Items.sort(( a, b )=> {
            if ( a.time < b.time ){
              return -1;
            }
            if ( a.time > b.time ){
              return 1;
            }
            return 0;
          })
          res.json(data)
    }
   })

})


app.put('/data/delete',async(req,res)=>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            name:{"S":req.body.name}
        }
    }
    console.log(params)
    await dynamoCLient.deleteItem(params,(err,data)=>{
        if(err)console.log("error at dynamoClient.deleteItem")
        else console.log("item delete succes")
    })

})
app.post('/sensors',async(req,res)=>{ 
  
    const params={
        TableName:"history",
        Item:{
            "time":parseInt(req.body.time)
            ,
            "timestamp":parseInt(Date.now())
            ,

            "temp":parseInt(req.body.temp)
            ,
            "UV":parseInt(req.body.UV)
            ,
            "soil_moist":parseInt(req.body.soil_moist)
            ,
            "water_sensor":parseInt(req.body.water_sensor)
            ,
            "humid":parseInt(req.body.humid)
            }
    }
    dynamoCLient.put(params,(err,data)=>{
        if(err) console.log("Failed to Add Item",err)
        else console.log("putItem success")
    })
    const updatepar={
        TableName:TABLE_NAME,
        Key:{
            name:"plant",
        },
        UpdateExpression:"set #temp=:temp,#UV=:UV,#soil_moist=:soil_moist,#water_sensor=:water_sensor,#humid=:humid,#timestamp=:timestamp",
        ExpressionAttributeValues:{
            ":temp":req.body.temp,
            ":soil_moist":req.body.soil_moist,
            ":UV":req.body.UV,
            ":water_sensor":req.body.water_sensor,
            ":humid":req.body.humid,
            ":timestamp":Date.now()
        },
        ExpressionAttributeNames:{
            "#temp":"temp",
            "#UV":"UV",
            "#soil_moist":"soil_moist",
            "#water_sensor":"water_sensor",
            "#humid":"humid",
            "#timestamp":"timestamp"
        }
    }
     await dynamoCLient.update(updatepar,(err,data)=>{
        if(err)console.log("update failed",err)
        else console.log("update success")
    })
  
    res.send("OK")
    res.end()
})
app.listen(port)

