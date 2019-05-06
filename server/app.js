const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')


const PORT = process.env.PORT || 8080


app.use('/css',express.static('styles'))
app.use(cors())
app.use(bodyParser.json())




connect = {
    "host": "otto.db.elephantsql.com",
    "port": 5432,
    "database": "cykdgjkm",
    "user": "cykdgjkm",
    "password": "8OqQn7H5ufHlBTywLHR_NB_UMt0__tBQ"
}

db = pgp(connect)

const users = [
    {username:'will', password:'will'},    
    {username:'steve', password:'steve'}
]

function authenticate(req,res, next) {
    let headers = req.headers['authorization']

    let token = headers.split('')[1]

    jwt.verify(token,'secret',(err,decoded) => {
        if(decoded){
            if(decoded.username){
                next()
            }else {
                res.status(401).json({message: 'Token invalid'})
            }
        }else {res.status(401).json({message:'Token invalid'})}
    })
}

app.post('/login',(req,res) => {
    let username = req.body.username
    let password = req.body.password

    let user = users.find((u) => {
        return u.username == username && u.password == password
    })

    if(user) {
        jwt.sign({username:username}, 'secret', function(err,token){
            if(token){
                res.json({token:token})
            }else {
                res.status(500).json({message: 'Unable to generate token'})
            }
        })
    }

})

app.post('/location',(req,res) => {

    let latitude = req.body.latitude
    let longitude = req.body.longitude

    db.any('INSERT into location(latitude,longitude) VALUES($1, $2)', [latitude,longitude])
    .then((locate) => {
        res.json({success: true, message: "Your location is stored"})
    }).catch(error => res.json({success: false, message:"Your location was not saved"}))
})


// Post is required post to DB
app.post('/for-sale',(req,res) => {

    let seller_id = req.body.seller_id
    let for_sale_item = req.body.for_sale_item
    let for_sale_amount = req.body.for_sale_amount
 
    db.any('INSERT into for_sale(seller_id,for_sale_item,for_sale_amount) VALUES($1, $2, $3)',[seller_id,for_sale_item,for_sale_amount])
    .then((newitemforsale) => {
        res.json({success: true, message: "Your item was saved"})
    }).catch(error => res.json({success: false, message:"Your item was not saved"}))

})



// This get allows the client to get all the for-sale items
app.get('/for-sale',(req,res) => {
    //send the for sale items to the client
    db.any('select * from for_sale')
    .then((records) => {
        res.json(records)
    })
})





app.listen(PORT,() => {
    console.log('Express server is running on port 8080')
})



// Async-Await. Resolves the promise without using .then - This fails with seller_id is not defined. I need to install axios to use it. 

//axios.get('/for-sale', async (req,res) => {
//   let records = await db.any(('INSERT into for_sale(seller_id,for_sale_item,for_sale_amount) VALUES($1, $2, $3)',[seller_id,for_sale_item,for_sale_amount]))
//    res.json(records)
//})