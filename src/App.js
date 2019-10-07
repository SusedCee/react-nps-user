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
      <img className="welcomeImage" src='.public/arrowhead.png' alt="logo"/>
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
      const responseGetOneUser = await fetch('http://localhost:9000/auth/' + this.state.user._id, {
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

    const loginResponse = await fetch('http://localhost:9000/auth/login', {
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


            // <Route 
            //   exact path='/favorites' 
            //   render={(routeProps) => (<FavoriteContainer {...routeProps} 
            //   user={this.state.favorite} />)}
            // />
















    // <h1>loggedIn:</h1> {this.state.loggedIn ? <h1> TRUE</h1> : <h1> FALSE</h1>}


// {
//   this.props.loggedIn ?
//     <div className="search-form">
//       <Form onSubmit={this.handleSubmit}>
//         <Input 
//           size='small' 
//           icon='search' 
//           type="text" 
//           name="searchTerm" 
//           id="IDK" focus
//           placeholder="Search Parks..." 
//           value={this.state.searchTerm} 
//           onChange={this.handleTermChange}/>
//         <Button className="mainButton" color="orange" >
//           Submit
//         </Button>
//       </Form>
//     </div>
//    :
//     null
// }











// import React, { Component } from 'react';
// import './App.css';
// import ParkContainer from './ParkContainer';
// import Register from './Register';
// import Header from './Header';
// import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
// import Login from './Login';
// import EditUser from './EditUser';
// import UserContainer from './UserContainer';




// // Will have to change code to this at end of project-------------------
// const My404 = () => {
//   return (
//     <div>
//       Welcome to the National Parks Finder Application where you can search for national parks and save them to a favorites list. Log in or register if you are not a member.
//     </div>
//     )
// };

// class App extends Component {
  
//   constructor(props)
//   {
//     super(props);
//     this.state=
//     {
//       loggedIn: false,
//       user: {
//         username: '',
//         firstname: '',
//         lastname: '',
//         email: ''
//       }
//     };
//   }




//   handleLogin = async (loginInfo, e) =>
//   {
//     e.preventDefault();

//     const loginResponse = await fetch('http://localhost:9000/auth/login', {
//       method: 'POST',
//       credentials: 'include', 
//       body: JSON.stringify(loginInfo),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const parsedResponse = await loginResponse.json();
//     console.log('parsedResponse: ', parsedResponse)
//     if(await parsedResponse.status.message === 'User Logged In'){
//       // this.props.history.push('/parks');
//       this.setState(
//       {
//         loggedIn: true,
//         user: {...parsedResponse.data}
//       }, () => {
//         console.log('this.state.user: ', this.state.user)
//       });
//     }
//   }




//   render() {
//   return (
//     <BrowserRouter>
//       <main>
//         <Header loggedIn={this.state.loggedIn}/>
//           <Switch>
//             <Route 
//               exact path='/register' 
//               render={(routeProps) => (<Register {...routeProps} 
//               handleLogin={this.handleLogin} />)} 
//             />
//             <Route 
//               exact path='/login' 
//               render={(routeProps) => (<Login {...routeProps} 
//               handleLogin={this.handleLogin}/>)} 
//             />
//             <Route 
//               exact path='/parks' 
//               render={(routeProps) => (<ParkContainer {...routeProps} />)} 
//             />
//             <Route 
//               exact path='/profile' 
//               render={(routeProps) => (<UserContainer {...routeProps} 
//               user={this.state.user} />)}
//             />

//             <Route component={My404}/>
//           </Switch>
//       </main>
//     </BrowserRouter>

//   );
// }
// }

// export default App;

