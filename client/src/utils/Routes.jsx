import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NewGame from '../components/NewGame/NewGame'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/addgame" component={NewGame} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes