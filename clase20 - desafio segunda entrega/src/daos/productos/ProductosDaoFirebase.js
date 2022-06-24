import FirebaseClass from "../../contenedores/FirebaseClass.js"

export class productosFirebase extends FirebaseClass{
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

    async getAll(){
        try{
            const data = await this.query.get()
            let docs = querySnapshot.docs
            const response = docs.maps((doc)=> ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                title: doc.data().title,
                description: doc.data().description,
                code: doc.data().code,
                price: doc.data().price,
                stock: doc.data().stock,
                thumbnail: doc.data().thumbnail
            }))
            return response
        }catch(error){
            throw new Error('error: ', error)
        }
    }
    
}