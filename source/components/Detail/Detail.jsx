import React, { Component } from 'react'
import { Button, Item } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Detail.scss'

//https://jaketrent.com/post/access-route-params-react-router-v4/
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            movie: [],
            //https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/component_will_receive_props.html
            rank: parseInt(this.props.match.params.rank)
        }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        axios.all([
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=1'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=2'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=3'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=4'),
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=5')
        ])
        //https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
        .then(axios.spread((response1, response2, response3, response4, response5) => {
              var movies = []
              var i = 1
              response1.data.results.map(movie => {
                  movies.push({'rank': i, 'movies': movie})
                  i++
              })
              response2.data.results.map(movie => {
                  movies.push({'rank': i, 'movies': movie})
                  i++
              })
              response3.data.results.map(movie => {
                  movies.push({'rank': i, 'movies': movie})
                  i++
              })
              response4.data.results.map(movie => {
                  movies.push({'rank': i, 'movies': movie})
                  i++
              })
              response5.data.results.map(movie => {
                  movies.push({'rank': i, 'movies': movie})
                  i++
              })
              this.setState({
                  movies: movies,
                  movie: movies[this.state.rank - 1].movies
              })
        }))
        .catch(function (error) {
            console.log(error);
        })
    }

    prev() {
        var rank = parseInt(this.props.match.params.rank) - 1 > 0 ? parseInt(this.props.match.params.rank) - 1 : 100
        this.setState({
            rank: rank,
            movie: this.state.movies[rank - 1].movies
        })
    }

    next() {
        var rank = parseInt(this.props.match.params.rank) + 1 < 101 ? parseInt(this.props.match.params.rank) + 1 : 1
        this.setState({
            rank: rank,
            movie: this.state.movies[rank - 1].movies
        })
    }

    render() {
        const rank = this.state.rank
        const prev = rank - 1 > 0 ? rank - 1 : 100
        const next = rank + 1 < 101 ? rank + 1 : 1

        const movie = this.state.movie
        const img_path = movie.poster_path
        const title = movie.title
        const rating = movie.vote_average
        const overview = movie.overview
        const extra = movie.release_date

        const item = [{
            childKey: rank,
            image: 'http://image.tmdb.org/t/p/w185/' + img_path,
            header: title,
            description: overview,
            meta: 'Rank: ' + rank + ' Rating: ' + rating + '/10',
            extra: 'Release Date: ' + extra
        }]

        return(
            <div className='detail_movie'>
              <Link to = {`/detail/${prev}`}><Button floated="left" color='blue' onClick={this.prev}>&#10094;</Button></Link>
              <Link to = {`/detail/${next}`}><Button floated="right" color='blue' onClick={this.next}>&#10095;</Button></Link>
              <Item.Group items={item} />
            </div>
        )
    }
}

export default Detail
