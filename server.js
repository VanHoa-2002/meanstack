require('dotenv').config()
const express  = require('express')
const mongoose  = require('mongoose')
const cors  = require('cors')
const fileUpload  = require('express-fileupload')
const cookieParse  = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParse())
app.use(cors())
app.use(fileUpload(
    {
        useTempFiles: true,
    }
))

// router
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))

const URL = process.env.MONGODB_URL
mongoose.connect(URL,{
    // useCreateIndex : true,
    // useFindAndModify : false,
    useNewUrlParser : true,
    useUniFiedTopology : true,
},err =>{
    if(err) throw err;
    console.log('connect to Mongo')
})

app.get('/',(req, res)=>{
    res.json({msg:"Welcome to Mongo"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('server listening on port',PORT)
})