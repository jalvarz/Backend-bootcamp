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

firebaseConfig:{
    apiKey: "AIzaSyCxZ10nBQrXFa25hHlTPh0BzzRb73BrqtA",
    authDomain: "java-ecommerce-b66dc.firebaseapp.com",
    projectId: "java-ecommerce-b66dc",
    storageBucket: "java-ecommerce-b66dc.appspot.com",
    messagingSenderId: "106079110722",
    appId: "1:106079110722:web:0187a9b3725b691dff4fdb",
    measurementId: "G-15C3XH0F68"
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