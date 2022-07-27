const fs = require('fs');

class Container{
    constructor(nameFile){
        this.nameFile = nameFile
    }

    async createFile(){
        try{
             await fs.promises.writeFile("productos.txt", "")
             return console.log("Archivo Creado!")
        }
        catch(err){
            console.log("No se pudo crear el archivo!",err)
        }
    }        
    
    async save(obj){
        try{
            const val = this.validateData(obj)
            if(val) return val
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            let dataFile = [];
            if (res != ""){
                dataFile = JSON.parse(res)
            }

            let item = {};
            item.title = obj.title,
            item.price = obj.price,
            item.thumbnail = obj.thumbnail,
            item.description = obj.description,
            item.codigo = obj.codigo,
            item.stock = obj.stock,
            item.id = dataFile.length + 1,
            item.timestamp = Date.now().toString()
            dataFile.push(item)

            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            
            return {massage: "Archivo Guardado", id: `${item.id}`}
        }
        catch(err){
            console.log("No se pudo guardar!",err)
        }
    }

    async getById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return {message: "No hay productos!"}
            }
            let data = JSON.parse(res)
            let item = data.find((elem) => elem.id === id)
            if(item === undefined){
                return {message: "No se encontro el item"}
            }
            return item
        }
        catch(err){
            console.log('No se pudo encontrar el elemento!',err)
        }
    }

    async getAll(){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                let message = {message: "No hay Productos!"}
                return message;
            }
            const data = JSON.parse(res)
            return data
        }  
        catch(err){
            console.log("No se pudo leer!",err)
        }
    }

    async deleteById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return {message: "No hay productos!"}
            }
            let data = JSON.parse(res)

            let item = data.find((elem) => elem.id === id)
            if(item === undefined) return {message: "No se encontro el item "}
            
            let dataFile = data.filter((elem) => elem.id !== item.id)
            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            return {message: "Se elimino el item!"}
        }
        catch(err){
            console.log('No se pudo eliminar!',err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile("productos.txt", " ")
            return console.log("Se eliminaron los elementos del Archivo!")
        }
        catch(err){
            console.log("No se pudo borrar el archivo!",err)
        }    
    }

    async put(id, item){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return {message: "No hay productos!"}
            }
            
            let data = JSON.parse(res)
            let index = data.findIndex((elem) => elem.id === id)
            if(index === undefined) return {message: "No se encontro el item"}
            const val = this.validateData(item)
            if(val) return val

            let obj = {}
            obj.title= item.title
            obj.price = item.price
            obj.thumbnail = item.thumbnail
            obj.description = item.description
            obj.codigo = item.codigo
            obj.stock = item.stock
            obj.id = id
            obj.timestamp = Date.now().toString()
            data[index] = obj

            await fs.promises.writeFile("productos.txt", JSON.stringify(data, null, 2))
            return {message: "item actualizado!"}

        }
        catch(err){
            console.log("Error!",err)
        }
    }

    validateData(obj){
        if( obj.title == undefined || obj.price == undefined || obj.thumbnail == undefined || obj.description == undefined || obj.codigo == undefined || obj.stock == undefined) {
                return {message: 'Falta un campo'}
        }
        return null
    }

} 

module.exports = Container;