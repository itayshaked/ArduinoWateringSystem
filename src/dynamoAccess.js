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
import express, { json, urlencoded } from 'express'
import cors from 'cors'
const app=express()
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors())
const port=5000

app.get('/data/:name',async(req,res)=>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            name:{
               S:req.params.name.toString()
            }
        }
    }
  dynamoCLient.getItem(params,(err,data)=>{
    if(err){
        console.log("error at app.get")
    }
    else{
       res.json(data) 
    }
   })

})
app.post('/data',async(req,res)=>{
    
    const params={
        TableName:TABLE_NAME,
        Item:req.body
    }
    dynamoCLient.putItem(params,(err,data)=>{
        if(err) console.log("Failed to Add Item",err)
        else console.log("putItem success",params)
    }) 
})
app.put('/data/:name/:toUpdate',async(req,res)=>{
    
    const params={
        TableName:TABLE_NAME,
        Key:{
            name:req.params.name,
        },
        UpdateExpression:"set #item=:toUpdate",
        ExpressionAttributeNames:{
            "#item":req.params.toUpdate
        },
        ExpressionAttributeValues:{
            ":toUpdate":req.body.value
        }
    }
     await dynamoCLient.update(params,(err,data)=>{
        if(err)console.log("update failed",err)
        else console.log("update success")
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

app.listen(port)