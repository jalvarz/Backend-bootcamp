const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.file = archivo
        this.objlist=[]
        try{
            this.objlist = JSON.parse(fs.readFileSync(this.file,'utf-8'))
            console.log(`archivo encontrado ${this.file}`)
        }catch{
            console.log(`archivo no encontrado, creando ${this.file}`)
            fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
        }
     }

      save(obj){
          console.log(obj)
        let maxId=0
            console.log(obj)
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
            fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
            console.log(`${this.file} actualizado`)
            return obj.id

        }
        
    getById(id){
        return(this.objlist.filter(obj => obj.id == id) )
    }

    getAll(){
        return (this.objlist)
    }
    
    deleteById(id){
        id = Number(id)
        this.objlist = this.objlist.filter(obj => obj.id !== id)
        fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
        console.log(`${this.file} actualizado`)
    }
    updateById(id,data){
        id = Number(id)
        var foundIndex = this.objlist.findIndex(x => x.id == id);
        this.objlist[foundIndex] = data;
        this.objlist[foundIndex].id = id
        fs.writeFileSync(this.file, JSON.stringify(this.objlist,null,2))
        console.log(`${this.file} actualizado`)

    }

    deleteAll(){
        this.objlist=[]
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