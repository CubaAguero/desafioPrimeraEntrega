const express = require('express');
const routerProductos = express.Router();

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

const Container = require('../../api/container')
const container1 = new Container('productos.txt')

const validarAdmin = (req, res, next) => {
    if(req.headers.admin){
        next()
    }else{
        res.json({err: -1, ruta: "", metodo: 'public', message: 'No Autorizada!'})
    }
}

routerProductos.get('/:id?', async (req, res) => {
    if ( req.params.id ){
        let  id = parseInt(req.params.id)
        const item = await container1.getById(id)
        res.json(item)
    }
    else{
        let data = await container1.getAll()
        res.json(data)
    }
})

routerProductos.post('/guardar', validarAdmin, async (req, res) => {
    let itemId = await container1.save(req.body)
    res.json(itemId)
})


routerProductos.put('/:id', validarAdmin, async (req, res) => {
    let itemId = parseInt(req.params.id)
    const respuesta = await container1.put(itemId, req.body)
    res.json(respuesta)
})

routerProductos.delete('/:id', validarAdmin, async (req, res) => {
    let id = parseInt(req.params.id)
    const resultado = await container1.deleteById(id)
    res.json(resultado)
})


module.exports = routerProductos