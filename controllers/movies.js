// movies.js

module.exports = function(app){

    const MovieDb = require('moviedb-promise')
    const moviedb = new MovieDb("88ab59b1fec2510f4a0abce24e886eb5")

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response =>{
            res.render('movies-index', {movies: response.results})
        }).catch(console.error)
    })
}

