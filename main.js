class Contenedor {
    constructor(productos) {
        this.productos = productos
    }

    save(producto) {
    
       let id = 1

        this.productos.map((x)=>{
            if(x.id >= id){
                id = x.id + 1
            }
        } )
        producto.id = id
        this.productos.push(producto)
        return id
    }
    update(id, producto) {
        
        const apendID = {
            ...producto,
            id: id
        }
        this.productos.push(apendID)
        return id
    }
    getById(id) {
        // recibe Id y devuelve el objeto con ese id
        const idEncontrado = this.productos.find(producto => producto.id === id)
        return idEncontrado
    }

    getAll() {
        return this.productos
    }
    deleteById(productoID) {
        const prodIdBorrado = this.productos.filter(producto => producto.id !== productoID)
        this.productos = prodIdBorrado
    }
}

const productos = new Contenedor ([])

//prueba
// ROUTER
const express = require('express')
const {
    Router
} = express;

const aplicacion = express();

//definir rutas
const rutaProductos = Router()


//Rutas
const puerto = 8080
//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({
    extended: true
}))

//ingresamos rutas a la aplicacion

aplicacion.use('/api/productos', rutaProductos)

//**HACEMOS LA CARPETA PUBLIC VISIBLE */
aplicacion.use('/static', express.static(__dirname + '/public'))

//ENDPOINTS
rutaProductos.get('/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    const producto = productos.getById(id)
    
    if (producto){
        respuesta.json(producto)
    }else{
        respuesta.json({error: "producto no encontrado"})
        respuesta.status(404)
    }   
})
rutaProductos.get('/', (peticion, respuesta) => {
    
    const productosShow = productos.getAll()
   
        respuesta.json(productosShow)
    
})
rutaProductos.post('/', (peticion, respuesta) => {   
    const productoIngresado = peticion.body;
    productos.save(productoIngresado)
    respuesta.json({
        status:'ok'
        
    })
})
rutaProductos.put('/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id)
    const productoEncontrado = productos.getById(id)   
    const productoIngresado = peticion.body;
    productos.deleteById(id)
    productos.update(id, productoIngresado)
    
    respuesta.json({
        actualizada: productoIngresado,
        anterior: productoEncontrado
    })
})
rutaProductos.delete('/:id', (peticion, respuesta)=>{
    const id = parseInt(peticion.params.id)
    productos.deleteById(id)
    if (id){
        respuesta.json("producto eliminado")
    }else{
        respuesta.json({error: "producto no encontrado"})
        respuesta.status(404)
    }   
        
    })


const servidor = aplicacion.listen(puerto, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))
