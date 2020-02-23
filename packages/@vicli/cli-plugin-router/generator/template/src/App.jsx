---
extend: '@vue/cli-service/generator/template/src/App.jsx'
replace:
  - !!js/regexp /import[^]*?App/
---

<%# REPLACE %>
import React from 'react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import Index from './views/Index'
import Demo from './views/Demo'

const App<%= (rootOptions.plugins && rootOptions.plugins['@vue/cli-plugin-typescript']) ? `: React.FC` : `` %> = () => <>
  <BrowserRouter>
    <Link to='/index'>Index</Link>
    <br />
    <Link to='/demo'>Demo</Link>
    <Switch>
      <Route path='/' exact component={Index}/>
      <Route path='/demo' component={Demo}/>
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
</>

export default App
<%# END_REPLACE %>
