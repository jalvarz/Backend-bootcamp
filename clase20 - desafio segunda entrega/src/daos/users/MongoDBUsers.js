import MongoClass from "../../contenedores/MongoClass.js";

export class MongoDBUsers extends MongoClass{
    constructor(){
        super ('users',{
            nombre: {type:String,required:true},
            apellido: {type:String,required:true},
            dni: {type:String,required:true,unique:true},
        })
    }
}