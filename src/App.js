import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import * as actionsType from './state/actions/index';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Edit from './containers/Edit/Edit';
import Auth from './containers/Auth/Auth';
import AuthLogOut from './containers/AuthLogOut/AuthLogOut';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log(this.props.isAuthed)
    
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/auth"/>
      </Switch>
    )

    if ( this.props.isAuthed ) {
      routes = (
        <Switch>
          <Route path="/recipe/:id" component={Edit}/>
          <Route path="/authLogOut" component={AuthLogOut}/>
          <Route path="/" exact component={Dashboard}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.isAuthed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actionsType.checkAuthLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;
