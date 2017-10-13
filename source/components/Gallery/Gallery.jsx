import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Gallery.scss'

class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            genres: [],
            visible: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.all([
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=1'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=2'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=3'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=4'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=5')
        ])
        .then(axios.spread((response, response1, response2, response3, response4, response5) => {
              var movies = []
              var genres = [{"id": 0, "name": "All"}]
              var i = 1
              response.data.genres.map(genre => {
                  genres.push(genre)
              })
              response1.data.results.map(movie => {
                  movies.push({'rank': i, 'movie': movie})
                  i++
              })
              response2.data.results.map(movie => {
                  movies.push({'rank': i, 'movie': movie})
                  i++
              })
              response3.data.results.map(movie => {
                  movies.push({'rank': i, 'movie': movie})
                  i++
              })
              response4.data.results.map(movie => {
                  movies.push({'rank': i, 'movie': movie})
                  i++
              })
              response5.data.results.map(movie => {
                  movies.push({'rank': i, 'movie': movie})
                  i++
              })
              this.setState({
                  genres: genres,
                  movies: movies,
                  visible: movies
              })
        }))
        .catch(function (error) {
            console.log(error)
        })
    }

    handleChange(event, {value}) {
        var movie = []
        for(var i = 0; i < this.state.movies.length; i++) {
            if(this.state.movies[i].movie.genre_ids.includes(value) || value == 0)
                movie.push(this.state.movies[i])
        }
        this.setState({
            visible: movie
        })
    }

    render() {
        const movie_img = this.state.visible.map((movie) => {
            return (
                <Link to = {'/detail/' + `${movie.rank}`} className='galleryLink' key={movie.rank}>
                    <img src={'http://image.tmdb.org/t/p/w185/' + movie.movie.poster_path} />
                </Link>
            )
        })

        const filters = []

        const add = this.state.genres.map(genre => {
            filters.push({'text': genre.name, 'value': genre.id})
        })

        return (
            <div className='Gallery'>
                <div className='Buttons'>
                    <h1>Filter By Genre</h1>
                    <Dropdown className='filter' placeholder='All' onChange={this.handleChange} search selection options={filters} />
                </div>
                <div>
                    {movie_img}
                </div>
            </div>
        )
    }
}

export default Gallery
