import React, { Component } from 'react';
import './App.css';
import ParkContainer from './ParkContainer';
import Register from './Register';
import Header from './Header';
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Login from './Login';
import UserContainer from './UserContainer';
import 'semantic-ui-css/semantic.min.css'
// import FavoriteContainer from './FavoriteContainer'


const history = createBrowserHistory();

// Will have to change code to this at end of project-------------------
const My404 = () => {
  return (
    <div className="open" >
    <h1 className="title"> NATIONAL PARKS</h1> <br/>
    <div className="welcome">
      Welcome to the National Parks Finder Application where you can search for national parks and find more information about the park through the official NPS link. Login or register if you are not a member.
    </div>
    <div>
      <img className="welcomeImage" src="arrowhead.png" alt="arrowhead logo"/>
    </div>
    </div>
    )
};

class App extends Component {
  
  constructor(props)
  {
    super(props);
    this.state =
    {
      value: '',
      loggedIn: false,
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: ''
      },
      // favorite: {
      //   fullName: '',
      //   description: '',
      //   url:'',
      //   userId: ''
      // }

      
    };
    console.log('app.js rendered');
  }


updateOneUser = async (e) => {
    try {
      const responseGetOneUser = await fetch(process.env.REACT_APP_BACKEND_URL + this.state.user._id, {
        credentials: 'include',
        method: 'GET'
      });

      console.log(responseGetOneUser, ' responseGetOneUser')

      if(responseGetOneUser.status !== 200){
        // before we parse

        // fetch won't reject a 404
        // throw error ends the try and sends
        // the error to the catch
        throw Error('404 from server');
      }

      // parse the json from a string into a js object we
      // can manipulate
      const oneUserResponse = await responseGetOneUser.json();
      // in the browser console
      console.log(oneUserResponse, ' oneUserResponse <')

      this.setState({
        user: oneUserResponse.data
      });


    } catch(err){
      console.log(err, ' getOneUser errors');
      return err
    }
}


  handleLogin = async (loginInfo, e) =>
  {
    e.preventDefault();

    const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/login', {
      method: 'POST',
      credentials: 'include', 
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();
    console.log('parsedResponse: ', parsedResponse)
    if(await parsedResponse.status.message === 'User Logged In'){
      // this.props.history.push('/parks');
      history.push('/parks');
      
      this.setState(
      {
        loggedIn: true,
        user: {...parsedResponse.data}
      }, () => {
        console.log('this.state.user: ', this.state.user);
        //this.forceUpdate();
      });

    }
  }

  handleLogout = () =>
  {
    //logout

    this.setState(
    {
      loggedIn: false
    });
  }


  render() {
    console.log(this.state, "This is app.js ")
  return (

    <div>

    <Header loggedIn={this.state.loggedIn} history={history} handleLogout={this.handleLogout}/>
    <Router history={history}>
      
      <main>
        
          <Switch>
            <Route 
              exact path='/register' 
              render={(routeProps) => (<Register {...routeProps} 
              handleLogin={this.handleLogin} />)} 
            />
            <Route 
              exact path='/login' 
              render={(routeProps) => (<Login {...routeProps} 
              handleLogin={this.handleLogin}/>)} 
            />
            <Route 
              exact path='/parks' 
              render={(routeProps) => (<ParkContainer {...routeProps} />)} 
            />
            <Route 
              exact path='/profile' 
              render={(routeProps) => (<UserContainer {...routeProps} 
              user={this.state.user} 
              updateOneUser={this.updateOneUser}/>)}
            />



            <Route component={My404}/>
          </Switch>
      </main>
    </Router>
    </div>
    )
  }
}


export default App;

    // <div>
    //   <img className="welcomeImage" src="./public/arrowhead.png" alt="arrowhead logo"/>
    // </div>