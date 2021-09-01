import fetch from 'node-fetch'
class api{
    constructor(url){
        this.url=url
        console.log(this.url)
    }
addItem=async(data)=>{
    const dynamoParams=data
   await fetch(this.url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(dynamoParams)
       })
}
  getItem=async(key)=>{
    return await fetch(this.url+'/'+key).then(res=>res.json())
    .then(data=>{return data}) 
}
updateItem=async(name,key,toUpdate)=>{
    await fetch(this.url+'/'+name+'/'+key,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({value:toUpdate})
    })
}
deleteItem=async(name)=>{
    await fetch(this.url+'/delete',{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name})
    })
}
}
export default api
