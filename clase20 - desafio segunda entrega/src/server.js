import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import contenedor from '../src/contenedores/ContenedorDB.js'
import { Server } from 'socket.io'
import http from 'http'
import morgan from 'morgan'
import productsRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import config from './config.js'

//import options from './configDB.js'
//import optionsSqlite from './configDBsqlite.js'

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
app.use('/productos',productsRoutes)
app.use('/carrito',cartRoutes)

app.engine('hbs',handlebars.engine({
   extname:".hbs",
   defaultLayout:'index.hbs', 
   layoutsDir:path.join(__dirname, "../views/layouts"),
   partialsdIR:path.join(__dirname, "../views/partials")
}))

app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../views'))

//const c = new contenedor(config.Sqlite.options,'productos')
//const products = c.getAll()
/*
app.get('/',(req,res)=>{
        products.then((products)=>{
            res.render("main",{
                productos:products, listExists:(products.length >0 ? true : false)
            }) 
        })
    }
)
*/
/*
    const io = new Server(httpServer)
    console.log("stream de datos inicializado")
    const m = new contenedorDB(config.Sqlite.options,'mensajes')
    const messages = await m.getAll()
    //nuevo servidor
    io.on('connection',(socket)=>{
        io.sockets.emit('messages',messages)
        console.log('websocket inicializado',socket.id)
        
        socket.on("newProduct",product=>{
            
            // products.push(product)
            //    const id = c.save(product);
            c.save(product);
            products.then((products)=>{products=products})
          //  products = c.getAll()
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
    
    */
const PORT = process.env.PORT || 8080

httpServer.listen(PORT, err =>{
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`servidor escuchando en el puerto ${PORT}`)
})

