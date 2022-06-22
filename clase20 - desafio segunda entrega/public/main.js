const button = document.querySelector("#button")
const table = document.querySelector("#table-body")

const socket = io.connect()

button.addEventListener("click",(event)=>{
    console.log("click")
    const inputTitle = document.querySelector("#title").value
    const inputPrice = document.querySelector("#price").value
    const inputUrl = document.querySelector("#thumbnail").value
    const inputDescription = document.querySelector("#description").value
    const inputCodigo = document.querySelector("#code").value
    const inputStock = document.querySelector("#stock").value
    const product = {
        title: inputTitle,
        price: Number(inputPrice),
        thumbnail: inputUrl,
        description: inputDescription,
        stock: Number(inputStock),
        code: inputCodigo,
        timestamp: Date.now()
    }
    socket.emit('newProduct',product)
 })


 socket.on('updateData',(products)=>{
    table.innerHTML = products.map(product=>{
        return(
            `
            <tr>
            <td><img src="${product.thumbnail}" class="img-fluid img-thumbnail" ></td>
            <td>${product.title}</td> 
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.code}</td>
            </tr>
            `
        )
    }).join(" ")
})

const divMessages = document.querySelector("#messages")
const enviarMsg = document.querySelector("#enviarMsg")

enviarMsg.addEventListener("click",(event)=>{
    console.log("click msg")
    const inputMail = document.querySelector("#mail").value
    const inputTexto = document.querySelector("#texto").value
    document.getElementById("mail").disabled = true
    const message = {
        mail: inputMail,
        text: inputTexto,
        date: new Date().toLocaleString()
    }
    socket.emit("newMessage",message)
})

socket.on('messages',(messages)=>{
    divMessages.innerHTML = messages.map(message=>{
        return(
            `<div> 
            <strong style="color:blue;font-weight:bold">${message.mail}</strong>
            <a style="color:brown">${message.date}</a>
            <a style="color:green;font-weight:italic">${message.text} </a>
            </div>`
        )
    }).join(" ")

})
