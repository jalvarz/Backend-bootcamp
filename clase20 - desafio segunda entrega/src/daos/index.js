import dotenv from 'dotenv'
dotenv.config()

let usersDao
    switch (process.env.DB_NAME){
        case 'mongoDB':
            import ('./users/mongoDBUsers.js').then(({MongoDBUsers})=>{
                usersDao = new MongoDBUsers()
            })
        break
        default:
            console.log('esta en default')
            break;
    }

    let productosDao
    switch (process.env.DB_NAME){
        case 'mongoDB':
            import ('./productos/productosDaoMongoDb.js').then(({productosMongodb})=>{
                productosDao = new productosMongodb()
            })
        break
        default:
            console.log('esta en default')
            break;
    }


export {usersDao,productosDao}