import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Header.scss'

class Header extends Component {
  render() {
    return (
        <div className='Header'>
          <h1>TMDB's Top 100 Rated Movies</h1>
          <span><Link to = '/'>Home</Link></span>
          <span><Link to = '/list'>Search</Link></span>
          <span><Link to = '/gallery'>Gallery</Link></span>
        </div>
    )
  }
}

export default Header
