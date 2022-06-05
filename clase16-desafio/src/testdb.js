import contenedor from './ContenedorDB.js'
import options from './configDB.js'
import optionsSqlite from './configDBsqlite.js'

console.log(options)
const db = new contenedor(options,'productos')

const m = new contenedor(optionsSqlite,'mensajes')


// db.initDbProductos()
// db.getAll()

//m.initDbMsj()



//m.save(msj)


// m.getById(3)

// m.updateById(17,msj)
m.getAll()

//m.deleteById(3)
//m.deleteAll()


// db.getAll()