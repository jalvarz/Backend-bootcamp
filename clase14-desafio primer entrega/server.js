const express = require('express')
const {Server} = require('socket.io')
const http = require('http')

const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer)

const handlebars = require('express-handlebars')
const { append } = require('express/lib/response')
const { Router } = express

const Contenedor = require('./src/Contenedor.js')
const c = new Contenedor('productos.json')
const m = new Contenedor('mensajes.json')

const router = Router()

//middleware
app.use(express.static(__dirname+'/public'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', router)

app.set('views','./views')
app.set('view engine','hbs')

app.engine('hbs',handlebars.engine({
   extname:".hbs",
   defaultLayout:'index.hbs', 
   layoutsDir:__dirname+"/views/layouts",
   partialsdIR:__dirname+"/views/partials"
}))

const messages = m.getAll()
const products = c.getAll()

const admin = true

app.get('/',(req,res)=>{
   const products = c.getAll()
   res.render("main",{
       productos:products, listExists:(products.length >0 ? true : false)
   })
})

//GET /api/productos
router.get('/', async (req, res) => {
   const products = await c.getAll()
   res.status(200).json(products)
})

//GET /api/productos/:id
router.get('/:id', async (req, res) => {
   const {id} = req.params
   const product = await c.getById(id)
   res.status(200).json(product)
})

// POST /api/productos/:id 
router.post('/', async (req,res)=>{
   if (admin){

      const id = await c.save(req.body);
      res.render("main",{
         productos:products, listExists:(products.length >0 ? true : false)
      })
      res.status(200).redirect('/')
   }else{
      res.status(200).send({"error":-1, "descripcion":'ruta / y metodo POST no autorizado'})  
      res.status(503)
   }
}
)


// PUT /api/productos/:id
router.put('/:id',async(req,res)=>{
   if (admin){
   const {id} = req.body
   const result = await c.updateById(id,req.query)
   res.status(200).send("actualizado")
   }else{
      res.status(200).send({"error":-1, "descripcion":'ruta / y metodo put no autorizado'})  
   }
})

// Delete /api/productos/:id
router.delete('/:id', async(req, res) => {
   if (admin){
   const {id} = req.params
   const result = await c.deleteById(id)
   res.status(200).send('delete ok')
   }else{
      res.status(200).send({"error":-1, "descripcion":'ruta / y metodo delete no autorizado'})   
   }
})

//nuevo servidor
io.on('connection',(socket)=>{
   io.sockets.emit('messages',messages)
   console.log('websocket inicializado',socket.id)

   socket.on("newProduct",product=>{
         
           products.push(product)
       //    const id = c.save(product);

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


const PORT = 8080

httpServer.listen(PORT, err =>{
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`el servidor express escuchando en el puerto ${PORT}`)
})

