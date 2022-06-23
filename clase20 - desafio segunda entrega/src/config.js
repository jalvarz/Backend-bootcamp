export default {
mongoDB:{
    URL:'mongodb+srv://javier:V9CGseLdPbmmINBH@cluster0.oklkfvk.mongodb.net/?retryWrites=true&w=majority', 
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
},



Sqlite:{
    client:'sqlite3',
    connection:{
        filename: 'src/database/mensajes.sqlite',
    },
    useNullAsDefault: true
},


//esto era options antes

mysql:{
    client:'mysql',
    connection:{
        host: '127.0.0.1',
        user: 'root',
        password:'root',
        database: 'mysql'
    }
}
}