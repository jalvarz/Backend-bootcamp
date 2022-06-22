import mongoose from "mongoose";
import config from "../config.js"

mongoose.connect(config.mongoDB.URL,config.mongoDB.options)

class MongoClass {

    constructor(collectionName,docSchema){
        this.collection = mongoose.model(collectionName,docSchema)
    }
async getAll(){
    try{
        const allUsers = await this.collection.find({})
        return allUsers

    }catch(error){
        throw new Error('error: ', error)
    }
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