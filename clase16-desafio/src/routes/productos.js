import Contenedor from '../Contenedor.js'
import { Router } from "express";

const router = Router()
const admin = true
const c = new Contenedor('./src/database/productos.json')

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
       /* deshabilitado, solo para renderizar vista
       res.render("main",{
          productos:products, listExists:(products.length >0 ? true : false)
       })*/
       res.status(200).send("ok")
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo POST no autorizado'})  
    }
 }
 )
 
 // PUT /api/productos/:id
 router.put('/:id',async(req,res)=>{
    if (admin){
    const {id} = req.params
    const result = await c.updateById(id,req.body)
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
 
export default router