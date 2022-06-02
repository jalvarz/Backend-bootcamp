import Contenedor from './Contenedor.js'
import express from 'express'
import http from 'http'
// const {Server} = require('socket.io')
// import Server from 'socketio'

import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')

class Chat{
    constructor(){

   
    const app = express()

    const httpServer = createServer(app);
    // const httpServer = http.createServer(app)
  //  const io = new Server(httpServer, { cors: { origin: '*' } });
     const io = new Server(httpServer)
    console.log("stream de datos inicializado")
    const m = new Contenedor('./src/database/mensajes.json')
    const messages = m.getAll()
    //nuevo servidor
    io.on('connection',(socket)=>{
        console.log("ssss")
        io.sockets.emit('messages',messages)
        console.log('websocket inicializado',socket.id)
        
        socket.on("newProduct",product=>{
            
            // products.push(product)
            //    const id = c.save(product);
            const id = c.save(product);
            products = c.getAll()
            io.sockets.emit('updateData',products)
            console.log(products)
        })
        
    socket.on("newMessage",message=>{
        m.save(message)
        messages.push(message)
        console.log(message)
        io.sockets.emit('messages',messages)
    })
    
 })
 
 
 io.on('data',(messages)=>{
     console.log(`llego ${messages}`)
    })
    
}
}
    export default Chat