import express from 'express'
import usersRoutes from './routes/userRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
const app = express()

app.use(express.json())
app.use('/users',usersRoutes)
app.use('/productos',productsRoutes)
app.use('/carrito',cartRoutes)
const PORT = 8080
app.listen(PORT,()=>{
    console.log(`escuchando al puerto ${PORT}`)
})