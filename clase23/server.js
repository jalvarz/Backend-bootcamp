import express from "express"
import cookieParser from "cookie-parser"
import cookiesRoutes from "./src/routes/cookies.js"

const app = express()

app.set('views','./src/views')
app.set('view engine','ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/cookies',cookiesRoutes)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`escuchando ${PORT}`)
})