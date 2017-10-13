import React, { Component } from 'react'
import { Button, Input, Dropdown } from 'semantic-ui-react'
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

import styles from './Movie.scss'
import Detail from '../Detail/Detail.jsx'

class Landing extends Component {
    render() {
        return(
            <div className='Landing'>
                <h1>Detail Page</h1>
            </div>
        )
    }
}

const Movie = () => (
    <div>
      <Switch>
          <Route exact path='/detail' component={Landing}/>
          <Route exact path='/detail/:rank' component={Detail}/>
      </Switch>
    </div>
)

export default Movie
