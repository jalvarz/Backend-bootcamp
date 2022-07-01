import Contenedor from '../Contenedor.js'
import { Router } from "express";
import {faker} from '@faker-js/faker';



faker.locale = 'es'

// "timestamp": 1653708971715,
// "title": "bujia",
// "description": "es una bujia",
// "code": "33ffS",
// "price": 200,
// "stock": 40,
// "thumbnail": "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_spark_car_plug_mechanic_service_electric-64.png"
// },


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

const router = Router()
const admin = true

//GET /api/productos
router.get('/', async (req, res) => {
    const products = []
    for (let x=0;x<5;x++){
       products.push(generarProducto())
    }
    res.status(200).json(products)
 })
 
 
export default router