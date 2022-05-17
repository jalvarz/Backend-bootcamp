const handlebars = require('express-handlebars')
const { append } = require('express/lib/response')
const express = require('express')
const app = express()
app.set('views','./views')
app.set('view engine','hbs')

app.engine('hbs',handlebars.engine({
    extname:".hbs",
    defaultLayout:'index.hbs', 
    layoutsDir:__dirname+"/views/layouts",
    partialsdIR:__dirname+"/views/partials"
}))
fakeApi=()=>[
{name:"Katarina",lane:'midlaner'},
{name:"Jayce",lane:'toplaner'},
{name:"pepe",lane:'midlaner'},
]

app.get('/',(req,res)=>{
    res.render("main",{
        suggestedChamps:fakeApi(), listExists:true
    })
})

const PORT = 8080

app.listen(PORT, err =>{
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`el servidor express escuchando en el puerto ${PORT}`)
})