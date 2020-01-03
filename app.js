const express = require('express')
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')



mongoose.connect ('mongodb://localhost/rotten-potatoes', {useNewURLParser: true})
const Review = mongoose.model('Review', { 
    title: String, 
    description: String,
    movieTitle: String,
    movieRating: String
})

const app = express()
// override with POST having ?_method = DELETE or ?_method=PUT
app.use(methodOverride('_method'))
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
    res.render('reviews-new',{title: "New Review"})
})

//CREATE 
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) =>{
        console.log(review)
        res.redirect(`/reviews/${review._id}`)
    }).catch((err) =>{
        console.log(err.message)
    })
})

//SHOW 
app.get('/reviews/:id', (req,res) => {
    Review.findById(req.params.id).then((review) =>{
        res.render('reviews-show',{review: review})
    }).catch((err) => {
        console.log(err.message)
    })
})

//EDIT 
app.get('/reviews/:id/edit', (req,res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review, title: "Edit Review"})
    })
})

//UPDATE 
app.put('/reviews/:id', (req,res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

