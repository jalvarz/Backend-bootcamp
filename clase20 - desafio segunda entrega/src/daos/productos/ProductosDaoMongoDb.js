import MongoClass from "../../contenedores/MongoClass.js";

export class productosMongodb extends MongoClass{
    constructor(){
        super ('productos',{
            timestamp: {type:String,required:true},
            title: {type:String,required:true},
            description: {type:String,required:true},
            code: {type:String,required:true},
            price: {type:Number,required:true},
            stock: {type:Number,required:true},
            thumbnail: {type:String,required:true},
        })
    }
}


