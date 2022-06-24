import dotenv from 'dotenv'
dotenv.config()

let productosDao
    switch (process.env.DB_NAME){
        case 'mongoDB':
            import ('./productos/productosDaoMongoDb.js').then(({productosMongodb})=>{
                productosDao = new productosMongodb()
            })
        break

        case 'firebase':
            import ('./productos/productosDaoFirebase.js').then(({productosFirebase})=>{
                productosDao = new productosFirebase()
            })
        break

        default:
            console.log('error configurando tipo de persistencia')
            break;
    }

let carritosDao
    switch (process.env.DB_NAME){
        case 'mongoDB':
            import ('./carritos/carritosDaoMongoDb.js').then(({carritosMongodb})=>{
                carritosDao = new carritosMongodb()
            })
        break

        case 'firebase':
            import ('./carritos/carritosDaoFirebase.js').then(({carritosFirebase})=>{
                carritosDao = new carritosFirebase()
            })
        break

        default:
            console.log('error configurando tipo de persistencia')
            break;
}


export {productosDao,carritosDao}