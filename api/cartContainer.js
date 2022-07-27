const fs = require('fs')

class CartContianer{
    constructor(name){
        this.name = name
    }

    async createContainer(){
        try{
            await fs.promises.writeFile(this.name, '')
            return console.log("Archivo creado(carritos)")
        }
        catch(err){
            console.log("ERROR! No se pudo crear el archivo!", err)
        }
    }

    async Cart(){
        try{
            const res = await fs.promises.readFile(this.name, 'utf-8')
            let cartFile = []
            if(res != ''){
                cartFile = JSON.parse(res)
            }
            let cart = {
                id: cartFile.length + 1,
                productos: [],
                timestamp: Date.now().toString()
            }
            cartFile.push(cart)
            await fs.promises.writeFile('cartContainer.txt', JSON.stringify(cartFile, null, 2))
            return {message: 'Carrito Creado', id: `${cart.id}`}
        }
        catch(err){
            console.log('Error! No se puedo crear el carrito', err)
        }
    }

    async saveCart(id, item){
        try{
            const res = await fs.promises.readFile('cartContainer.txt', 'utf-8')
            if(res == ''){
                return {message: 'No existe el carrito'}
            }
            let data = JSON.parse(res)
            let index = data.findIndex(elm => elm.id === id)
            let cart = data.find(elem => elem.id === id)
            if(cart === undefined){
                return {message: 'No se encontro el carrito'}
            }
            cart.productos.push(item)
            data[index] = cart
            await fs.promises.writeFile('cartContainer.txt', JSON.stringify(data, null, 2))
            return {message: 'Producto Agregado al carrito'}
        }
        catch(err){
            console.log('Error!', err)
        }
    }

    async delCart(id){
        try{
            const res = await fs.promises.readFile('cartContainer.txt', 'utf-8')
            if(res == ''){
                return {message: 'No hay carritos'}
            }
            let data = JSON.parse(res)

            let cartId = data.find(elm => elm.id === id)
            if (cartId === undefined) return {message: 'No se encontro el carrito!'}

            let dataFile = data.filter(elm => elm.id !== id)
            await fs.promises.writeFile('cartContainer.txt', JSON.stringify(dataFile, null, 2))
            return { message: 'Se elimino el carrito' }
        }
        catch(err){
            console.log('ERROR!', err)
        }
    }

    async delProd(id, itemId){
        try{
            const res = await fs.promises.readFile('cartContainer.txt', 'utf-8')
            if(res == ''){
                return {message: 'No hay carritos'}
            }
            let data = JSON.parse(res)

            let index = data.findIndex(elm => elm.id === id)
            let cartId = data.find(elm => elm.id === id)
            if (cartId === undefined) return {message: 'No se encontro el carrito!'}

            let item = cartId.productos.find(elm => elm.id === itemId)
            if( item === undefined) return {message: 'No se encontro el item'}

            let prod = cartId.productos.filter(elm => elm.id != itemId)
            cartId.productos = prod

            data[index] = cartId
            await fs.promises.writeFile('cartContainer.txt', JSON.stringify(data, null, 2))
            return {message: 'Se elimino el item del carrito', cart: {id: `${id}`}, item:{id: `${itemId}`}}
        }
        catch(err){
            console.log('ERROR!', err)
        }
    }

    async getCart(id){
        try{
            const res = await fs.promises.readFile('cartContainer.txt', 'utf-8')
            if(res == '') return {message: 'No hay carritos!'}
    
            let data = JSON.parse(res)
            let cart = data.find(elm => elm.id === id)

            if(cart === undefined) return {message: 'No se encontro el carrito!'}
            return cart
        }
        catch(err){
            console.log('ERROR!', err)
        }
    }
}

module.exports = CartContianer