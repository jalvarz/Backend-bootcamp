const button = document.querySelector("#button")
const table = document.querySelector("#table-body")

const socket = io.connect()

button.addEventListener("click",(event)=>{
    console.log("click")
    const inputTitle = document.querySelector("#title").value
    const inputPrice = document.querySelector("#price").value
    const inputUrl = document.querySelector("#thumbnail").value
    const product = {
        title: inputTitle,
        price: inputPrice,
        thumbnail: inputUrl
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
            </tr>
            `
        )
    }).join(" ")
})