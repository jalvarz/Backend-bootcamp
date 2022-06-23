import ContenedorArchivo from "../../contenedores/filesystemClass"

class ProductosDaoArchivo extends ContenedorArchivo{

    constructor(){        
        super('database/productos.json')
    }

}

export default ProductosDaoArchivo

