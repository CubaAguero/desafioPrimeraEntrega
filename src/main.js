const express = require('express');
const app = express();

app.use('/api', express.static('public'))

const routerProductos = require('./routes/productos')
const routerCart = require('./routes/cart')

app.use('/api/productos', routerProductos)
app.use('/api/cart', routerCart)

app.use((req, res) =>{
    res.status(404).json({error: -2, description: 'ruta no implementada!'})
})


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error!', err => console.log(`Error en servidor ${err}`))

