const express = require('express')
const server = require('socket.io')
const http = require('http')

const app = express()

const httpServer = http.createServer(app)
const io = new server(httpServer)

//middleware
app.use(express.static(__dirname+'/public'))

const messages = [
    {author:"Juan",text:"Hola que tal?"},
    {author:"Pedro",text:"bien"},
    {author:"Ana",text:"Genial"},
]


//nuevo servidor
io.on('connection',(socket)=>{
    console.log('websocket inicializado',socket.id)
    socket.emit('messages',messages)

    socket.on("newMessage",message=>{
            messages.push(message)
            console.log(message)
            io.sockets.emit('messages',messages)
    })
})





const PORT = 8080
httpServer.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})