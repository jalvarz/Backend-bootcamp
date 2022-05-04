const http = require('http')
const express = require('express')
const fs = require('fs')

class contenedor {
    
    constructor(archivo){
        this.file = archivo
        this.objlist=[]
        try{
            this.objlist = JSON.parse(fs.readFileSync(this.file,'utf-8'))
            console.log("archivo encontrado")
        }catch{
            console.log("archivo no encontrado, creando uno...")
         //   const objlist = []
            fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
        }
     }
 
      async save(obj){
         let maxId=0
     
             if (this.objlist.length>0){
                 const ids = this.objlist.map(object => {
                   return object.id;
                 });
 
                 maxId = Math.max(...ids);
                 obj.id = maxId+1
 
             }else{
                 obj.id = 0
             }
             this.objlist.push(obj)
 
             await fs.promises.writeFile(this.file, JSON.stringify(this.objlist,null,2))
         }
         
     getById(id){
         return(this.objlist.filter(obj => obj.id == id) )
     }
 
     getAll(){
         return (this.objlist)
     }
     
     async deleteById(id){
             let filtrado = this.objlist.filter(obj => obj.id !== id) 
             await fs.promises.writeFile(this.file, JSON.stringify(filtrado,null,2))
         }
 
     deleteAll(){
         fs.unlink(this.file,error=>{
             if(error){console.log("error")}
             else
             {console.log("archivo borrado")}
         }
         )
     }
  
 
 
    getRandom(){
        return this.objlist[Math.floor(Math.random()*this.objlist.length)]
    }
}


const app = express()
const PORT = 8080
app.listen(8080)
console.log('escuchando puerto: ',PORT)

c = new contenedor("productos.txt")

app.get('/',(req,res)=>{
    res.send("<h1 style=color:blue>java</h1>")
})

app.get("/productos", (req,res)=>{
    res.send(c.getAll())
})

app.get('/productoRandom',(req,res)=>{
    res.send(c.getRandom())
})