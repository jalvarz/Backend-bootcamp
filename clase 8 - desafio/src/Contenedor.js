const fs = require('fs')
/*
const { join } = require('path')
const { stringify } = require('querystring')
*/
class Contenedor {
   constructor(){

       this.objlist=[
        {
          "title": "escuadrita",
          "price": "300",
          "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
          "id": 0
        },
        {
          "title": "cosa",
          "price": "200",
          "thumbnail": "foto.png",
          "id": 4
        },
        {
          "title": "regla",
          "price": "400",
          "thumbnail": "url.png",
          "id": 6
        }
      ]
    }

      save(obj){
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
            let filtrado = this.objlist.filter(obj => obj.id !== id) 
        }
    updateById(id,data){
        id = Number(id)
        var foundIndex = this.objlist.findIndex(x => x.id == id);
        this.objlist[foundIndex] = data;
        this.objlist[foundIndex].id = id

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