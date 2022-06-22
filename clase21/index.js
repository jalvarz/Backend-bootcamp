import express from 'express'
import {faker} from '@faker-js/faker'
const app = express()

const nombres = ['luis','lucia','juan','agusto','ana']
const apellidos = [' eee','fsfsd0','fdgfg']
const colores = ['rojo','verde','amarillo','magenta']

app.use(express.json())

app.get('/test',(req,res) => {
    let array = []
    for (let i=0; i<10;i++){

        const numNom = Math.floor(Math.random()*4)
        const numApel = Math.floor(Math.random()*4)
        const numCol = Math.floor(Math.random()*4)
        
    }
    array.push({
        nombre: nombres[numNom],
        apellido: apellidos[numApel],
        color: colores[numCol],

    })
    res.json(array)

})

app.get('/',(req,res)=>{
    let array=[]
    for(let i=0;i<40;i++){
        const obj = {
            city:faker.address.city(),
            country:faker.address.country(),
            latitude: faker.address.latitude(),
            company: faker.company.companyName()
        }
        array.push(obj)
    }
    res.json(array)

})
const PORT = 8080
app.listen(PORT,()=> {
    console.log(`escuchando al puerto ${PORT}`)
})