const socket = io.connect();

const divMessages = document.querySelector("#messages")
const button = document.querySelector("#button")

button.addEventListener("click",(event)=>{
    const inputNombre = document.querySelector("#nombre").value
    const inputTexto = document.querySelector("#texto").value
    const message = {
        author: inputNombre,
        text: inputTexto,
        date : new Date().toLocaleString()
    }
    socket.emit("newMessage",message)
})

socket.on('messages',(messages)=>{
console.log(messages)
    divMessages.innerHTML = messages.map(message=>{
        return(
            `<div> 
            <strong>${message.author}</strong>
            <p>${message.text}</p>
            </div>`
        )
    }).join(" ")

})

