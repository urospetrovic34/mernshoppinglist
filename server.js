const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

//MIDDLEWARE ZA BODY-PARSER
app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').mongoURI

//Konekcija za bazu
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>console.log('MONGODB CONNECTED')).catch(err => console.log(err))

app.use('/api/items',items)

//Serve static assets if in production
//Odgovara statickim podacima iz build foldera u production skripti
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))
    //'*' znaci dohvati sve zahteve
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port,()=>console.log(`SERVER STARTED ON PORT ${port}`))