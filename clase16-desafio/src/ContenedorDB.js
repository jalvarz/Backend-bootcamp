import knex from 'knex'

class Contenedor{
    constructor(options,table){
        this.options = options
        this.table = table
    }

    initDbProductos(){
        const initProductos =
            [
                {
              "id": 0,
              "timestamp": 1653708971715,
              "title": "bujia",
              "description": "es una bujia",
              "code": "33ffS",
              "price": 50,
              "stock": 40,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_spark_car_plug_mechanic_service_electric-64.png"
            },
            {
              "id": 4,
              "timestamp": 1653708971715,
              "title": "amortiguador",
              "description": "es un amoriguador",
              "code": "33ffS",
              "price": 200,
              "stock": 40,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/car-machine/64/1_shockbreaker_service_automobile_car_part-64.png"
            }
          ]

          knex(this.options).schema.createTable(this.table,table=>{
            table.increments('id').primary().unique()
            table.string('timestamp').notNullable()
            table.string('title').notNullable()
            table.string('description').notNullable()
            table.string('code').notNullable()
            table.integer('price').notNullable()
            table.integer('stock').notNullable()
            table.string('thumbnail').notNullable()
        })
        .then(()=>{
            console.log('tabla creada')
            this.save(initProductos)
        })
        .catch((err)=>{
            console.log(err.sqlMessage)
        })
        .finally(()=>{
            knex(this.options).destroy()
        })
    }

    initDbMsj(){
        initMensajes= [
            {
              "mail": "Java",
              "text": "Bro I need more funding for my project",
              "date": "5/23/2022, 10:39:02 AM",
            },
            {
              "mail": "Elon Musk",
              "text": "sure, hold my beer",
              "date": "5/23/2022, 10:50:02 AM",
            },
            {
              "mail": "Java",
              "text": "thanks mate",
              "date": "5/23/2022, 10:52:02 AM",
            }
          ]
        knex(this.options).schema.createTable(this.table,table=>{
            table.increments('id').primary().unique()
            table.string('text').notNullable()
            table.string('mail').notNullable()
            table.string('date').notNullable()
        })
        .then(()=>{
            console.log('tabla creada')
            this.save(initMensajes)
        })
        .catch((err)=>{
            console.log(err.sqlMessage)
        })
        .finally(()=>{
            knex(this.options).destroy()
        })
    } 

    getAll(){
        knex(this.options).from(this.table).select("*")
        .then((objlist)=>{
            console.log(objlist)
            return (objlist)
        })
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }
    
    save(obj){
        //console.log(obj)
        knex(this.options)(this.table).insert(obj)
        .then(()=>console.log("data insertada"))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }

    getById(id){
        knex(this.options).from(this.table).select("*").where({id:id})
        .then((obj)=>{
            console.log(obj)
            return (obj)
        })
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }

    deleteById(id){
        knex(this.options).from(this.table).where({id:id}).del()
        .then(()=>console.log("data eliminada"))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }

    deleteAll(){
        knex(this.options).from(this.table).del()
        .then(()=>console.log("toda la data eliminada"))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }

    updateById(id,data){
        knex(this.options)(this.table).where({id:id}).update(data)
        .then(()=>console.log("data actualizada"))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex(this.options).destroy()
        })
    }
}
export default Contenedor