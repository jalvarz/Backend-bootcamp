import mongoose from "mongoose";
import config from "../config.js"

mongoose.connect(config.mongoDB.URL,config.mongoDB.options)

class MongoClass {

        //parametros collection y schema
    constructor(collectionName,docSchema){
        this.collection = mongoose.model(collectionName,docSchema)
    }
async getAll(){
    try{
        const data = await this.collection.find({})
        return data

    }catch(error){
        throw new Error('error: ', error)
    }
}

async save(obj){
    try{
        await this.collection.insert(obj)
    }catch(error){
        throw new Error('error: ', error)
    }

}

async getById(id){
    try{
        const data = await this.collection.find({"_id" : {$eq: id}})
        return data

    }catch(error){
        throw new Error('error: ', error)
    }
    //return(this.objlist.filter(obj => obj.id == id) )
}

async deleteById(id){
    try{
        await this.collection.delete(obj)
    }catch(error){
        throw new Error('error: ', error)
    }
    // id = Number(id)
    // this.objlist = this.objlist.filter(obj => obj.id !== id)
    // fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
    // console.log(`${this.file} actualizado`)
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
export default MongoClass