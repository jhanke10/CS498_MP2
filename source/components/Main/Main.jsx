import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import {Switch, Route} from 'react-router-dom'

import List from '../List/List.jsx'
import Gallery from '../Gallery/Gallery.jsx'
import Movie from '../Movie/Movie.jsx'
import styles from './Main.scss'

class Landing extends Component {
    render() {
        return(
            <div className='Landing'>
                <h1>Welcome to MP2</h1>
            </div>
        )
    }
}

//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
class Main extends Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/list' component={List}/>
                    <Route path='/gallery' component={Gallery}/>
                    <Route path='/detail' component={Movie}/>
                </Switch>
            </div>
        )
    }
}

export default Main
