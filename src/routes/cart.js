const express = require('express')
const routerCart = express.Router()

const CartContianer = require('../../api/cartContainer')
const cartContainer1 = new CartContianer('cartContainer.txt')
//cartContainer1.createContainer()

routerCart.use(express.json())
routerCart.use(express.urlencoded({extended: true}))

routerCart.post('/', async (req, res) => {
    let cart = await cartContainer1.Cart()
    res.json(cart)
})

routerCart.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    let ms = await cartContainer1.delCart(id) 
    res.json(ms)
})

routerCart.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    let cart = await cartContainer1.getCart(id)
    res.json(cart)
})

routerCart.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const item = req.body
    let msj = await cartContainer1.saveCart(id, item)
    res.json(msj)
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id)
    const itemId = parseInt(req.params.id_prod)
    const ms = await cartContainer1.delProd(id, itemId)
    res.json(ms)
})


module.exports = routerCart