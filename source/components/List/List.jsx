import React, { Component } from 'react'
import { Button, Input, Dropdown, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './List.scss'

class List extends Component {

  constructor(props) {
      super(props)
      this.state = {
          movies: [],
          visible: [],
          rank: true,
          ascend: true
      }
      this.searchMovie = this.searchMovie.bind(this);
      this.ascend = this.ascend.bind(this);
      this.descend = this.descend.bind(this);
      this.sortRank = this.sortRank.bind(this);
      this.sortTitle = this.sortTitle.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  //https://developers.themoviedb.org/3/getting-started
  //https://stackoverflow.com/questions/44182951/axios-chaining-multiple-api-requests
  componentDidMount() {
      axios.all([
          axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=1'),
          axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=2'),
          axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=3'),
          axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=4'),
          axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dd47aecbdc4d1f563a8b6f37f182c2f3&page=5')
      ])
      //https://daveceddia.com/ajax-requests-in-react/
      .then(axios.spread((response1, response2, response3, response4, response5) => {
            var movies = []
            var i = 1
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
                movies: movies
            })
      }))
      .catch(function (error) {
          console.log(error)
      })
  }

  searchMovie(event) {
      var movies = []
      var movie = []
      for(var i = 0; i < this.state.movies.length; i++) {
          if(this.state.movies[i].movie.title.toLowerCase().includes(event.currentTarget.value) && event.currentTarget.value != '') {
              movies.push(this.state.movies[i])
          }
      }
      if(this.state.rank) {
          if(this.state.ascend) {
            for(var i = 0; i < this.state.movies.length; i++) {
                if(movies.includes(this.state.movies[i])) {
                    movie.push(this.state.movies[i])
                }
            }
          } else {
            for(var i = this.state.movies.length; i >= 0; i--) {
                if(movies.includes(this.state.movies[i])) {
                    movie.push(this.state.movies[i])
                }
            }
          }
      } else {
          if(this.state.ascend) {
              for(var i = 0; i < movies.length; i++) {
                  for(var j = i; j < movies.length; j++) {
                      if(movies[i].movie.title > movies[j].movie.title) {
                          var temp = movies[i]
                          movies[i] = movies[j]
                          movies[j] = temp
                      }
                  }
              }
          } else {
              for(var i = 0; i < movies.length; i++) {
                  for(var j = i; j < movies.length; j++) {
                      if(movies[i].movie.title < movies[j].movie.title) {
                          var temp = movies[i]
                          movies[i] = movies[j]
                          movies[j] = temp
                      }
                  }
              }
          }
          movie = movies
      }
      this.setState({ visible: movie })
  }

  handleChange(e, { value }) {
      if(value == 'rank')
          this.sortRank()
      else
          this.sortTitle()
  }

  sortRank() {
      var movies = []
      if(this.state.ascend) {
        for(var i = 0; i < this.state.movies.length; i++) {
            if(this.state.visible.includes(this.state.movies[i])) {
                movies.push(this.state.movies[i])
            }
        }
      } else {
        for(var i = this.state.movies.length; i >= 0; i--) {
            if(this.state.visible.includes(this.state.movies[i])) {
                movies.push(this.state.movies[i])
            }
        }
      }
      this.setState({
          visible: movies,
          rank: true
      })
  }

  sortTitle() {
      var movies = this.state.visible
      if(this.state.ascend) {
        for(var i = 0; i < movies.length; i++) {
            for(var j = i; j < movies.length; j++) {
                if(movies[i].movie.title > movies[j].movie.title) {
                    var temp = movies[i]
                    movies[i] = movies[j]
                    movies[j] = temp
                }
            }
        }
      } else {
      for(var i = 0; i < movies.length; i++) {
          for(var j = i; j < movies.length; j++) {
              if(movies[i].movie.title < movies[j].movie.title) {
                  var temp = movies[i]
                  movies[i] = movies[j]
                  movies[j] = temp
              }
          }
      }
      }
      this.setState({
          visible: movies,
          rank: false
      })
  }

  ascend() {
      if(!this.state.ascend) {
        var movies = []
        for(var i = this.state.visible.length-1; i >= 0; i--) {
            movies.push(this.state.visible[i])
        }
        this.setState({
            visible: movies,
            ascend: true
        })
      }
  }

  descend() {
      if(this.state.ascend) {
        var movies = []
        for(var i = this.state.visible.length-1; i >= 0; i--) {
            movies.push(this.state.visible[i])
        }
        this.setState({
            visible: movies,
            ascend: false
        })
      }
  }

  render() {
    const sortOptions = [
    {
      text: 'Rank',
      value: 'rank'
    },
    {
      text: 'Title',
      value: 'title'
    }
    ]

    const movie = this.state.visible.map((movie) => {
        return (
            <Link to = {'/detail/' + `${movie.rank}`} key={movie.rank}>
                <div className='Movie'>
                    <img src={'http://image.tmdb.org/t/p/w185/' + movie.movie.poster_path}/>
                    <div className='movie_info'>
                        <h1>{movie.movie.title}</h1>
                        <p>Rank: {movie.rank}</p>
                    </div>
                </div>
            </Link>
        )
    })

    //https://react.semantic-ui.com/introduction
    return (
        <div className='List'>
          <div className='Search'>
            <p id="search_label">Search</p>
            <Input className='search_bar' type='text' placeholder='Search movies...' onChange={this.searchMovie} />
            <p>Sort By</p>
            <Dropdown className='sort_menu' defaultValue={sortOptions[0].value} onChange={this.handleChange} search selection options={sortOptions} />
            <Button.Group size='medium' className='sort_order'>
              <Button active={this.state.ascend} onClick={this.ascend}>Ascending</Button>
              <Button.Or />
              <Button active={!this.state.ascend} onClick={this.descend}>Descending</Button>
            </Button.Group>
          </div>
          <div className='Found'>
            {movie}
          </div>
        </div>
    )
  }
}

export default List
