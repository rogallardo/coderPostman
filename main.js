/*const express = require('express')

const aplicacion = express()

const port = 8080

const frase = 'Hola pepe'
aplicacion.get('/api/frase', (peticion, respuesta)=>{
    respuesta.send(frase)
})

aplicacion.get('/api/letras/:num', (peticion, respuesta)=>{   
    const num = peticion.params.num;
    const numFormateado = parseInt(num) - 1

//Si no es un numero//
if(isNaN(num)){
    respuesta.send({
        error: 'El param no es un num'
    })
}

//Si esta fuera de rango//
if(numFormateado >= frase.length || numFormateado < 0){
    respuesta.send({
        error: 'El param no está fuera de rango'
    })
}

    
    const letra = frase[numFormateado]
    respuesta.send(letra)
})

const servidor = aplicacion.listen(port, ()=>{
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))*/


//**************************EJERCICIO CON POSTMAN******************************** */
/*const express = require('express')

const aplicacion = express()

const port = 8080

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({extended: true}))

//peticion con params//

aplicacion.get('/api/sumar/:num1/:num2', (peticion, respuesta)=>{
    const num1 = parseInt(peticion.params.num1)
    const num2 = parseInt(peticion.params.num2)

    const suma = num1 + num2
    respuesta.json(suma)
})

//peticion con query ruta ejemplo(http://localhost:8080/api/sumar?num1=1&num2=2)
aplicacion.get('/api/sumar', (peticion, respuesta)=>{
    const num1 = parseInt(peticion.query.num1)
    const num2 = parseInt(peticion.query.num2)

    const suma = num1 + num2
    respuesta.json(suma)
})
// usando POST
aplicacion.post('/api', (peticion, respuesta)=>{
    respuesta.json({
        status:'ok'
    })
})
// usando PUT
aplicacion.put('/api', (peticion, respuesta)=>{
    respuesta.json({
        status:'ok'
    })
})
// usando DELETE
aplicacion.delete('/api', (peticion, respuesta)=>{
    respuesta.json({
        status:'ok'
    })
})

const servidor = aplicacion.listen(port, ()=>{
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))*/




//ULTIMO EJERCICIO EXPRESS AVANZADO


/*const express = require('express')

const aplicacion = express()

const port = 8080

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({
    extended: true
}))

let frase = 'Frase inicial';



aplicacion.get('/api/frase', (peticion, respuesta) => {
    respuesta.json({
        frase: frase
    })
})

aplicacion.get('/api/palabras/:pos', (peticion, respuesta) => {
    const pos = peticion.params.pos;
    const fraseDividida = frase.split(' ')

    //Si no es un numero//
    if (isNaN(pos)) {
        respuesta.send({
            error: 'El param no es un num'
        });
        return;
    }
    const numFormateado = parseInt(pos) - 1
    //Si esta fuera de rango//
    if (numFormateado >= fraseDividida.length || numFormateado < 0) {
        respuesta.send({
            error: 'El param no está fuera de rango'
        });
        return;
    }
    
    const palabra = fraseDividida[numFormateado]
    respuesta.json({
        buscada: palabra
    })
})


// usando POST
aplicacion.post('/api/palabras', (peticion, respuesta)=>{
    const palabra = peticion.body.palabra

    frase += ' ' + palabra
    respuesta.json({
        agregada: palabra
    })
})
// usando PUT
aplicacion.put('/api/palabras/:pos', (peticion, respuesta)=>{
    const nuevaPalabra = peticion.body.palabra;
    const pos = parseInt(peticion.params.pos) - 1;
    const palabras = frase.split(' ');
    const anterior = palabras[pos];

    palabras[pos] = nuevaPalabra;
    frase = palabras.join(' ')
    respuesta.json({
        actualizada: nuevaPalabra,
        anterior: anterior
    })
})
// usando DELETE
aplicacion.delete('/api/palabras/:pos', (peticion, respuesta)=>{
    const pos = parseInt(peticion.params.pos)
    const palabras = frase.split(' ')
    palabras.splice(pos, 1)
    frase = palabras.join()
    respuesta.json({
        status:'ok'
    })
})


const servidor = aplicacion.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))*/


/*rutaPersonas.post('/', (peticion, respuesta) => {
    const persona = peticion.body;
    const personaId = {
        ...persona,
        id: 1
    }
    console.log(personaId)
    personas.push(personaId)
    respuesta.send('ok')
})

rutaMascotas.get('/', (peticion, respuesta) => {
    respuesta.send(mascotas)
})

rutaMascotas.post('/', (peticion, respuesta) => {
    const mascota = peticion.body;
    mascotas.push(mascota)
    respuesta.send('ok')

})*/
class Contenedor {
    constructor(productos) {
        this.productos = productos
    }

    save(producto) {
        let id
        const apendID = {
            ...producto,
            id: this.productos.length + 1
        }
        this.productos.push(apendID)
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
