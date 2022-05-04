const http = require('http')
const express = require('express')
const fs = require('fs')


class contenedor {
    constructor(archivo){
        try{
            this.objs = JSON.parse(fs.readFileSync(archivo,'utf-8'))
        }
        catch(err){
            console.log(err)
        }
    }

    getAll(){
        return this.objs
    }

    getRandom(){
        return this.objs[Math.floor(Math.random()*this.objs.length)]
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