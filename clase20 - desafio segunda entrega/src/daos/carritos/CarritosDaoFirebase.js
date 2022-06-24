import MongoClass from "../../contenedores/FirebaseClass.js";
import mongoose from "mongoose";
export class carritosMongodb extends MongoClass{
    constructor(){
        const productSchema = mongoose.Schema({
            timestamp: {type:String,required:true},
            title: {type:String,required:true},
            description: {type:String,required:true},
            code: {type:String,required:true},
            price: {type:String,required:true},
            stock: {type:String,required:true},
            thumbnail: {type:String,required:true}
        })

        super ('cart',{
            timestamp: {type:String,required:true},
            products:{type:productSchema,required:false}
        })

    }

    async getAll(){
        try{
            const data = await this.query.get()
            let docs = querySnapshot.docs
            const response = docs.maps((doc)=> ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                products: doc.data().productSchema
            }))
            return response
        }catch(error){
            throw new Error('error: ', error)
        }
    }
    
}

