import dotenv from 'dotenv'
import { MongoDBUsers } from './users/MongoDBUsers.js'
dotenv.config()

export let usersDao = async function(){
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
}

export default usersDao