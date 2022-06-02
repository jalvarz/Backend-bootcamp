import {options} from './configDB.js'
import knex from 'knex'


const usuarios = [
    {
        name:'Farid',
        lastName:'Sesin',
        edad:30
    }
]

knex(options).schema.createTable('usuarios',table=>{
    table.increments('id').primary().unique()
    table.string('name').notNullable()
    table.string('lastName').notNullable()
    table.integer('edad').notNullable()
})
.then(()=>{
    console.log('table created')
    knex(options)('administradores').insert(usuarios)
})
.catch((err)=>{
    throw err
})