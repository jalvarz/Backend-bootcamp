import express from 'express'
import usersRoutes from './routes/userRoutes.js'
const app = express()

app.use(express.json())
app.use('/users',usersRoutes)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`escuchando al puerto ${PORT}`)
})