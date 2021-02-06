import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MachineLearning from './views/machineLearning'
import WebScraping from './views/webScraping'
import Home from './views/home'
import About from './views/about'

// A tag de Redirect irá redirecionar qualquer chamada que não foi
//mapeada nas Routes para a rota especificada.
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/home" component={Home}></Route>
            <Route exact path="/machinelearning" component={MachineLearning}></Route>
            <Route exact path="/webscraping" component={WebScraping}></Route>
            <Route exact path="/about" component={About}></Route>
            <Redirect to='home'></Redirect>
        </Switch>
    </Router>
)

export default Routes