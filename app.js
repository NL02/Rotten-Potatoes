const express = require('express')
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


mongoose.connect ('mongodb://localhost/rotten-potatoes', {useNewURLParser: true})
const Review = mongoose.model('Review', { title: String, movieTitle: String})

const app = express()
app.use(bodyParser.urlencoded({ extended: true}))
app.engine('handlebars', exphbs({defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/',(req, res) => {
    Review.find().then(reviews => {
        res.render('reviews-index', {reviews: reviews})
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// // OUR MOCK ARRAY OF PROJECTS 
// let reviews = [
//     { title: "Terrible Games", movieTitle: "Shadow of the Collossus and Death Stranding"},
//     { title: "Triple A", movieTitle: "Super Mario Brothers 2"}
// ]

//INDEX 
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews })
    })
    .catch(err => {
        console.log(err)
    })
})


//NEW 
app.get('/reviews/new', (req,res) => { 
    res.render('reviews-new',{})
})

//CREATE 
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) =>{
        console.log(review)
        res.redirect('/')
    }).catch((err) =>{
        console.log(err.message)
    })
})