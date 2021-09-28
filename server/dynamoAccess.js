import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

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



app.get('/data',async(req,res)=>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            name:"plant"   
        }
    }
  dynamoCLient.get(params,(err,data)=>{
    if(err){
        console.log("error at app.get")
    }
    else{
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
        UpdateExpression:"set #temp=:temp,#UV=:UV,#soil_moist=:soil_moist,#water_sensor=:water_sensor,#humid=:humid",
        ExpressionAttributeValues:{
            ":temp":req.body.temp,
            ":soil_moist":req.body.soil_moist,
            ":UV":req.body.UV,
            ":water_sensor":req.body.water_sensor,
            ":humid":req.body.humid
        },
        ExpressionAttributeNames:{
            "#temp":"temp",
            "#UV":"UV",
            "#soil_moist":"soil_moist",
            "#water_sensor":"water_sensor",
            "#humid":"humid"
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

