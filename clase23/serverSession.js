import express  from "express"
import session from "express-session"
import sessionRoutes from "./src/routes/session.js"
const app = express()

app.set('views','./src/views')
app.set('view engine','ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'key',
    resave:true,
    saveUninitialized:true
}))
app.use('/',cookiesRoutes)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`escuchando ${PORT}`)
})