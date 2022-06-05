import contenedor from './ContenedorDB.js'
import options from './configDB.js'
import optionsSqlite from './configDBsqlite.js'

console.log(options)
const db = new contenedor(options,'productos')

const m = new contenedor(optionsSqlite,'mensajes')

//db.initDb()

m.initDbMsj()


const msj = {
    mail: "Java",
    text: "Bro I need more funding for my project",
    date: "5/23/2022, 10:39:02 AM"
}

m.save(msj)

console.log(m.getAll())

console.log("jgg")
