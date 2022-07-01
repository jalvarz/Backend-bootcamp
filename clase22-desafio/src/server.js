import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import contenedor from './ContenedorDB.js'
import { Server } from 'socket.io'
import http from 'http'
import morgan from 'morgan'
import productosRoutes from './routes/productos.js'
import productosTest from './routes/productosTest.js'
import carritoRoutes from './routes/carrito.js'
import {faker} from '@faker-js/faker';



import options from './configDB.js'
import optionsSqlite from './configDBsqlite.js'

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
app.use('/productostest',productosTest)
app.use('/carrito',carritoRoutes)

app.engine('hbs',handlebars.engine({
   extname:".hbs",
   defaultLayout:'index.hbs', 
   layoutsDir:path.join(__dirname, "../views/layouts"),
   partialsdIR:path.join(__dirname, "../views/partials")
}))

app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../views'))

//const c = new contenedor(options,'productos')
// const products = c.getAll()
let products = []


function generarProducto(){
    return{
       timestamp: Date.now(),
       title: faker.name.firstName(),
       descripcion: faker.name.lastName(),
       code: randNumber(10000,300000),
       price: randNumber(1,1000),
       stock: randNumber(1,50),
       thumbnail: faker.internet.url()
 
    }
 }
 
 const randNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
 };

    for (let x=0;x<5;x++){
       products.push(generarProducto())
    }

app.get('/',(req,res)=>{
            res.render("main",{
                productos:products, listExists:(products.length >0 ? true : false)
            }) 
        } 
)

    


    const io = new Server(httpServer)
    console.log("stream de datos inicializado")
    const m = new contenedor(optionsSqlite,'mensajes')
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
    
const PORT = process.env.PORT || 8080

httpServer.listen(PORT, err =>{
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`servidor escuchando en el puerto ${PORT}`)
})

