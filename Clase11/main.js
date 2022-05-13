const socket = io();

const input = document.querySelector("#input")
const p = document.querySelector("#p")
const button = document.querySelector("#button")

socket.on('mensajesServidor', function(mensajes){
    p.innerHTML = mensajes.map(mensaje=>`Mensaje:${mensaje}`).join('')
})
button.addEventListener('click',()=>{
    socket.emit('mensajeCliente',input.value)
})




socket.on('bienvenido cliente',()=>{
    console.log('servidor saludando')
    socket.emit('gracias servidor')
})