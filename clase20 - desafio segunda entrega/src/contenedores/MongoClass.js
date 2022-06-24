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
        console.log(data)
        return data

    }catch(error){
        throw new Error('error: ', error)
    }
}

async save(obj){
    try{
        console.log(obj)
        await this.collection.create(obj)
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
        await this.collection.delete(id)
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
export default MongoClass