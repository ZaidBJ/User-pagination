import React from 'react';
import {Switch, Route}from 'react-router-dom';
import App from './App';
import Detail from './detail'
const Switcher= ()=>(

  <Switch>
    <Route path="/:id" component={Detail}/>
  <Route path="/" component={App}/>

  </Switch>
)


export default Switcher;
