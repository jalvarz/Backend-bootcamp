const fs = require('fs')
/*
const { join } = require('path')
const { stringify } = require('querystring')
*/
class Contenedor {
   constructor(archivo){
       this.file = archivo
       this.objlist=[]
       try{
           this.objlist = JSON.parse(fs.readFileSync(this.file,'utf-8'))
          // console.log("archivo encontrado")
       }catch{
           console.log("archivo no encontrado, creando uno...")
        //   const objlist = []
           fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
       }
    }

     async save(obj){
        let maxId=0
    
            if (this.objlist.length>0){
                const ids = this.objlist.map(object => {
                  return object.id;
                });

                maxId = Math.max(...ids);
                obj.id = maxId+1

            }else{
                obj.id = 0
            }
            this.objlist.push(obj)

            await fs.promises.writeFile(this.file, JSON.stringify(this.objlist,null,2))
        }
        
    getById(id){
        return(this.objlist.filter(obj => obj.id == id) )
    }

    getAll(){
        return (this.objlist)
    }
    
    async deleteById(id){
        id = Number(id)
            let filtrado = this.objlist.filter(obj => obj.id !== id) 
            await fs.promises.writeFile(this.file, JSON.stringify(filtrado,null,2))
        }
    async updateById(id,data){
        id = Number(id)
        var foundIndex = this.objlist.findIndex(x => x.id == id);
        this.objlist[foundIndex] = data;
        this.objlist[foundIndex].id = id
        await fs.promises.writeFile(this.file, JSON.stringify(this.objlist,null,2))
    }

    deleteAll(){
        fs.unlink(this.file,error=>{
            if(error){console.log("error")}
            else
            {console.log("archivo borrado")}
        }
        )
    }
}    

module.exports = Contenedor;

/*
const obj1 ={
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}



const obj2 ={
    title: 'blabla',
    price: 200,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}

export {Contenedor}
//const c = new Contenedor('clase4.txt')

//c.save(obj1)
//c.save(obj2)
//console.log(c.getById(1))
//console.log(c.getAll())
//c.deleteById(2)
//c.deleteAll()
*/