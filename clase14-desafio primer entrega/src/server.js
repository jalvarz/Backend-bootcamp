import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import Contenedor from './Contenedor.js'
import { Server } from 'socket.io'
import http from 'http'
import morgan from 'morgan'
import productosRoutes from './routes/productos.js'
import carritoRoutes from './routes/carrito.js'

const app = express()
const httpServer = http.createServer(app)
import handlebars from 'express-handlebars'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.static(path.join(__dirname, '../views')))
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/productos',productosRoutes)
app.use('/carrito',carritoRoutes)

app.engine('hbs',handlebars.engine({
   extname:".hbs",
   defaultLayout:'index.hbs', 
   layoutsDir:path.join(__dirname, "../views/layouts"),
   partialsdIR:path.join(__dirname, "../views/partials")
}))

app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../views'))

app.get('/',(req,res)=>{
   const c = new Contenedor('./src/database/productos.json')
   const products = c.getAll()
   res.render("main",{
       productos:products, listExists:(products.length >0 ? true : false)
   })
})

const io = new Server(httpServer)
console.log("stream de datos inicializado")
    const m = new Contenedor('./src/database/mensajes.json')
    const messages = m.getAll()
    //nuevo servidor
    io.on('connection',(socket)=>{
        io.sockets.emit('messages',messages)
        console.log('websocket inicializado',socket.id)
        
        socket.on("newProduct",product=>{
            
            // products.push(product)
            //    const id = c.save(product);
            const id = c.save(product);
            products = c.getAll()
            io.sockets.emit('updateData',products)
        })
        
    socket.on("newMessage",message=>{
        m.save(message)
        messages.push(message)
        io.sockets.emit('messages',messages)
    })

 })

 
 io.on('data',(messages)=>{
     console.log(`llego ${messages}`)
    })
    
const PORT = process.env.PORT || 8080

httpServer.listen(PORT, err =>{
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`servidor escuchando en el puerto ${PORT}`)
})

