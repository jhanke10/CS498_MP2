import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

// Include your new Components here
import Home from './components/Home/Home.jsx'

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss')

render(
    <Router>
        <Home />
    </Router>,
    // Define your router and replace <Home /> with it!
    document.getElementById('app')
)
