import Contenedor from '../Contenedor.js'
import { Router } from "express";
const router = Router()

const admin = true
const cart = new Contenedor('./src/database/carrito.json')

// Routes Carrito

//GET /api/carrito
router.get('/', async (req, res) => {
    const carritos = await cart.getAll()
    res.status(200).json(carritos)
 })
 
 // Delete /api/carrito/:id
 router.delete('/:id', async(req, res) => {
    if (admin){
    const {id} = req.params
    const result = await cart.deleteById(id)
    res.status(200).send('delete ok')
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo delete no autorizado'})   
    }
 })
 //-------------
 // Crear Carrito OK
 // POST /api/carrito/ 
 router.post('/', async (req,res)=>{
    if (admin){
       req.body['timestamp']=Date.now()
       const id = await cart.save(req.body);
       console.log(req.body)
 
       res.status(200).send(`{"id":${id}}`)
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo POST no autorizado'})  
    }
 }
 )
  
 // POST /api/:id/carrito/ 
 router.post('/:id/productos', async (req,res)=>{
    if (admin){
       const productById = c.getById(req.params)
       const carritoById = cart.getById()
       const id = await cart.save(req.body)
       res.render("main",{
          productos:products, listExists:(products.length >0 ? true : false)
       })
       res.status(200).send("ok")
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo POST no autorizado'})  
    }
 }
 )
 
 //GET /api/productos/:id
 router.get('/:id/productos/', async (req, res) => {
    const {id} = req.params
    const product = await cart.getById(id)
    console.log(product)
    res.status(200).json(product)
 })
 
export default router