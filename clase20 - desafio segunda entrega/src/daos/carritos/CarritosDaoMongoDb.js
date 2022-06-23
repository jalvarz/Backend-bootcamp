import MongoClass from "../../contenedores/MongoClass.js";

export class MongoDBUsers extends MongoClass{
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
}


