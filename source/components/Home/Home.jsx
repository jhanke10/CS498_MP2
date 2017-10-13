import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import styles from './Home.scss'

class Home extends Component {

    render() {
        return(
            <div>
              <Header />
              <Main />
            </div>
        )
    }
}

export default Home
