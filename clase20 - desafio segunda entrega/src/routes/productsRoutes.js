import { Router} from "express";
import {productosDao as api } from "../daos/index.js";
const router = new Router()
const admin = true



//GET /api/productos
router.get('/',async (req,res)=>{
    try{
        const data = await api.getAll()
        res.status(200).json(data)
    }
    catch (error){
        console.log(error)
    }

})

 //GET /api/productos/:id
 router.get('/:id', async (req, res) => {
    const {id} = req.params
    const product = await api.getById(id)
    res.status(200).json(product)
 })

  // POST /api/productos/:id 
  router.post('/', async (req,res)=>{
    if (admin){
       const id = await api.save(req.body);
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
    const result = await api.updateById(id,req.body)
    res.status(200).send("actualizado")
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo put no autorizado'})  
    }
 })

  // Delete /api/productos/:id
  router.delete('/:id', async(req, res) => {
    if (admin){
    const {id} = req.params
    const result = await api.deleteById(id)
    res.status(200).send('delete ok')
    }else{
       res.status(200).send({"error":-1, "descripcion":'ruta / y metodo delete no autorizado'})   
    }
 })



export default router