import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Home from './views/home'
import MachineLearning from './views/machineLearning'

// A tag de Redirect irá redirecionar qualquer chamada que não foi
//mapeada nas Routes para a rota especificada.
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/home" component={Home}></Route>
            <Route exact path="/machinelearning" component={MachineLearning}></Route>
            <Redirect to='home'></Redirect>
        </Switch>
    </Router>
)

export default Routes