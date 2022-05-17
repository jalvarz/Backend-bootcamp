const fs = require('fs')
/*
const { join } = require('path')
const { stringify } = require('querystring')
*/
class Contenedor {
   constructor(){

       this.objlist=[
        {
          title: "bujia",
          price: 50,
          thumbnail: "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_spark_car_plug_mechanic_service_electric-64.png",
          id: 0
        },
        {
          title: "amortiguador",
          price: 200,
          thumbnail: "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_shockbreaker_service_automobile_car_part-64.png",
          id: 4
        },
        {
          title: "pistones",
          price: 400,
          thumbnail: "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_piston_service_machine_forcer_repair-08-64.png",
          id: 6
        }
      ]
    }

      save(obj){
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