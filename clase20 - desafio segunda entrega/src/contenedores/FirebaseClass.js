//completar
//import { database } from "firebase-admin"
import config from "../config.js"

const admin = require("firebase-admin")
const serviceAccount = require("../src/database/firebasekey.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

console.log('base firebase conectada!')

class FirebaseClass {
    //parametros collection y schema
    constructor(collectionName,docSchema){
    const db = admin.firestore()
    const query = db.collection(collectionName)
}

async getAll(){
    try{
        const data = await this.query.get()
        let docs = querySnapshot.docs
        const response = docs.maps((doc)=> ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni,
        }))
        return response
    }catch(error){
        throw new Error('error: ', error)
    }
}

async save(obj){
    try{
        const doc = this.query.doc()
        await doc.create(obj)
        console.log("datos insertados")
    }catch(error){
        throw new Error('error: ', error)
    }

}

async getById(id){
    try{
        const doc = this.query.doc(`${id}`)
        const item = await doc.get()
        const response = item.data()
        return response

    }catch(error){
        throw new Error('error: ', error)
    }
}

async deleteById(id){
    try{
        const doc = this.query.doc(`${id}`)
        const item = await doc.delete()
    }catch(error){
        throw new Error('error: ', error)
    }

}

async updateById(id,data){
//console.log(data)
// id = Number(id)
// var foundIndex = this.objlist.findIndex(x => x.id == id);
// this.objlist[foundIndex] = data;
// this.objlist[foundIndex].id = id
// fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
// console.log(`${this.file} actualizado`)

}

async deleteAll(){
try{
    await this.collection.deleteMany({})
}catch(error){
    throw new Error('error: ', error)
}
// this.objlist=[]
}

async create(obj){
try{
    const newUser = await this.collection.create(obj)
    return newUser
}catch(error){
    console.log(error)
}
}

}
export default FirebaseClass

