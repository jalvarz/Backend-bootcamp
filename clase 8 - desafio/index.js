const express = require('express')
const { Router } = express

const Contenedor = require('./src/Contenedor.js')
const c = new Contenedor('productos.json')

const app = express()
const router = Router()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', router)
//GET /api/productos
router.get('/', async (req, res) => {
   const products = await c.getAll()
   res.status(200).json(products)
})

// POST /api/productos/:id
router.post('/', async (req,res)=>{
console.log(req.body)
//const {body} = req;
const id = await c.save(req.body);
res.status(200).send(`guardado con id ${id}`)
})


// PUT /api/productos/:id

router.put('/:id',async(req,res)=>{
   const {id} = req.params
   const result = await c.updateById(id,req.query)
   res.status(200).send("actualizado")
})

// Delete /api/productos/:id
router.delete('/:id', async(req, res) => {
   const {id} = req.params
   const result = await c.deleteById(id)
   res.status(200).send('delete ok')
})

// 


app.listen(8080)
