const express = require('express')
const authRouter = require('./authRouter')
const mongoose=require('mongoose')

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.static('public'));


app.use(express.json())
app.use('/auth',authRouter)

const start = async () => {
    try{
      await mongoose.connect('mongodb+srv://IHTORIUS:MA46rG6iL7s5TEn@myfirstcluster.0k6y2.mongodb.net/auth?retryWrites=true&w=majority')
        app.listen(PORT,() => console.log(`server started at ${PORT}`))
    } catch(err){
        console.log(err);
    }
}
start();