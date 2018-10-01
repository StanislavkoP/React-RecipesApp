import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard';
import Edit from './containers/Edit/Edit';

class App extends Component {
  render() {

    const routes = (
      <Switch>
        <Route path="/recipe/:id" component={Edit}/>
        <Route path="/" exact component={Dashboard}/>
      </Switch>
    )
    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
