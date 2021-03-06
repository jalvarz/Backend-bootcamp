const express = require('express')
const handlebars = require('express-handlebars')
const { append } = require('express/lib/response')
const { Router } = express

const Contenedor = require('./src/Contenedor.js')
const c = new Contenedor('productos.json')

const app = express()
const router = Router()

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

app.get('/productos',(req,res)=>{
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
const id = await c.save(req.body);
console.log(c.getAll())
res.status(200).redirect('/productos')
})


// PUT /api/productos/:id
router.put('/:id',async(req,res)=>{
   const {id} = req.body
   const result = await c.updateById(id,req.query)
   res.status(200).send("actualizado")
})

// Delete /api/productos/:id
router.delete('/:id', async(req, res) => {
   const {id} = req.params
   const result = await c.deleteById(id)
   res.status(200).send('delete ok')
})

app.listen(8080)
