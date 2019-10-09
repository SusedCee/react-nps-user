import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import '../App.css';

// import ParkContainer from '../ParkContainer'
// import {Form, Button, Label} from 'semantic-ui-react';
// import UserContainer from '../UserContainer'

class Header extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			//nothing here yet
		}
	}

	componentDidMount()
	{
		console.log("header rendered, loggedIn: " + this.props.loggedIn);
	}


	closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editRequest = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/' + this.state.userToEdit._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.userToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(editRequest.status !== 200){
        throw Error('editResquest not working')
      }

      const editResponse = await editRequest.json();

      const editedUserArray = this.state.users.map((user) => {
        // remember map creates a brand new array
        if(user._id === editResponse.data._id){
        // comparing every movie in the array, the
        // movie we edited
        // and if they match update the movie with response
        // data from the api
          user = editResponse.data
        }

        return user
      });

      this.setState({
        users: editedUserArray,
        showEditModal: false
      })

      console.log(editResponse, ' editResponse');

    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }

  handleLogoutClick = () =>
  {
	this.props.handleLogout();
	this.props.history.push('/login');
  }

  handleRegisterClick = () =>
  {
  	this.props.history.push('/register');
  }

  handleProfileClick = () =>
  {
  	this.props.history.push('/profile');
  }

  handleLoginClick = () =>
  {
  	this.props.history.push('/login');
  }

  handleSearchClick = () =>
  {
  	this.props.history.push('/parks');
  }
  // handleFavoriteClick = () =>
  // {
  // 	this.props.history.push('/favorites');
  // }
  



	render()
	{
		return (

		<Menu inverted size='massive'>
        <Menu.Item>
          <img src='favicon.ico' alt="alt"/>
        </Menu.Item>



<Menu.Menu position='right'>
		{
		this.props.loggedIn ?
		null
		:
        <Menu.Item 
          name='login'
          onClick={this.handleLoginClick}
        >
        LOGIN
        </Menu.Item>
		}

		{
		this.props.loggedIn ?
		null
		:
        <Menu.Item
          name='register'
          onClick={this.handleRegisterClick}
        >
 		REGISTER
        </Menu.Item>
    	}

    	{
    	this.props.loggedIn ?
        <Menu.Item
          name='searchParks'
          onClick={this.handleSearchClick}
        >
        SEARCH PARKS
        </Menu.Item>
        :
        null
    	}

     //    {
     //    this.props.loggedIn ?
     //    <Menu.Item
     //      name='favorite'
     //      // onClick={this.handleFavoriteClick}
     //    >
     //    FAVORITES
     //    </Menu.Item>
     //    : 
     //    null
    	// }

        {
        this.props.loggedIn ?
        <Menu.Item
          name='editProfile'
          onClick={this.handleProfileClick}
        >
        ACCOUNT
        </Menu.Item>
        : 
        null
    	}

        {
        this.props.loggedIn ?
        <Menu.Item
          name='Logout'
          onClick={this.handleLogoutClick}
        >
        LOGOUT
        </Menu.Item>
        : 
        null
    	}

</Menu.Menu>
      </Menu>
	);
	}
};
export default Header;














					