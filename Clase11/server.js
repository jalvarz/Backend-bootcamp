const express = require('express')
// inicializamos socket.io
const Server  = require('socket.io')
// inicializamos http y creamos un servidor utilizando la configuracion de app
const app = express()
const http = require('http')
const httpServer = http.createServer(app)
const io = new Server(httpServer)

//middleware
app.use(express.static(__dirname+'/public'))
const mensajes = []

//levantando servidor io
io.on('connection',(socket)=>{
    console.log('cliente conectado',socket.id)

    socket.on('mensajeCliente', mensaje=>{
        mensajes.push(mensaje)
        io.socket.emit('mensajesServidor', mensajes)
    })

//    socket.emit('bienvenido cliente')

   // socket.on('gracias servidor',()=>{
 //       console.log('cliente saludando')
 //   })
})





//levantando servidor
const PORT = 8080
httpServer.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})
