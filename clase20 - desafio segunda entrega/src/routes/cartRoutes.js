import Contenedor from './../contenedores/filesystemClass.js'
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
       req.body['timestamp']=Date.now()
       req.body['products']=[]
       const id = await cart.save(req.body);
       res.status(200).send(`{"id":${id}}`)
 }
 )
 // Agregar productos al carrito. 
 // POST /api/:id/carrito/ 
 router.post('/:id/productos', async (req,res)=>{
    if (admin){
       try{
          const c = new Contenedor('./src/database/productos.json')
          const productById = c.getById(req.body.id)[0] //chequear si existe
          const {id} = req.params
           var carritoById = cart.getById(id)
           const cartaux= carritoById[0]
           cartaux.products = [...cartaux.products,productById]
          await cart.updateById(id,cartaux)
          res.status(200).send("ok")
       }catch{
         res.status(200).send({"error":-1, "descripcion":'error de datos'})  
       }
         /*  
       res.render("main",{
          productos:products, listExists:(products.length >0 ? true : false)
         })
         */
      }else{
         res.status(200).send({"error":-1, "descripcion":'ruta / y metodo POST no autorizado'})  
      }
 }
 )

 // Delete /api/productos/:id
 router.delete('/:id/productos/:id_prod', async(req, res) => {
   if (admin){
      try{
         const {id,id_prod} = req.params
         var carritoById = cart.getById(id)
         const cartaux= carritoById[0]
         cartaux.products = cartaux.products.filter(obj => obj.id !== Number(id_prod))
         await cart.updateById(id,cartaux)
         res.status(200).send('delete ok')
      }catch{
         res.status(200).send({"error":-1, "descripcion":'error de datos'})  
         }
   }else{
      res.status(200).send({"error":-1, "descripcion":'ruta / y metodo delete no autorizado'})   
   }
})
 
 //GET /api/productos/:id
 router.get('/:id/productos/', async (req, res) => {
    const {id} = req.params
    const product = await cart.getById(id)
    res.status(200).json(product)
 })
 
export default router