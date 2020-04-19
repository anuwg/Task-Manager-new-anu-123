const express = require('express')
require('./db/mongoose')
const userRouters= require('../src/routers/userRouters')
const taskRouters = require('../src/routers/taskRouters')

const app= express()

const port = process.env.PORT 
app.use(express.json())

app.use(userRouters)
app.use(taskRouters)

const multer = require('multer')
const upload = multer({
    dest:'image',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
               return cb('invalid type')
               }

        cb(undefined,true)       
    }
})

app.post('/uploads',upload.single('upload'), (req,res)=>{
    res.send()
})

app.listen(port, ()=>{
    console.log('listening on port ' + port)
})