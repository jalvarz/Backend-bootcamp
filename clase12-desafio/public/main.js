const button = document.querySelector("#button")



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
    socket.emit("newProduct",product)
 })
 