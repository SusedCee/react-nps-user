import React, { Component } from 'react';
// import CreateUser from '../CreateUser';
// import UserList from '../UserList';
import EditUser from '../EditUser';
// import ParkList from '../ParkList';
// import './style.css'

class UserContainer extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      showEditModal: false,
      userToEdit: {
        _id: null,
        username: '',
        firstname: '',
        lastname: '',
        email: '', 
        password: ''
      }
    }
  }
  componentDidMount(){
    //this.getUsers();
  }
  
  getUsers = async () => {

    try {

      const responseGetUsers = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user', {
        credentials: 'include',
        method: 'GET'
      });

      console.log(responseGetUsers, ' responseGetUsers')

      if(responseGetUsers.status !== 200){
        // before we parse

        // fetch won't reject a 404
        // throw error ends the try and sends
        // the error to the catch
        throw Error('404 from server');
      }

      // parse the json from a string into a js object we
      // can manipulate
      const usersResponse = await responseGetUsers.json();
      // in the browser console
      console.log(usersResponse, ' usersResponse <')

      this.setState({
        users: [...usersResponse.data]
      });


    } catch(err){
      console.log(err, ' getUsers errors');
      return err
    }


  }
  handleFormChange = (e) => {

    this.setState({
      userToEdit: {
        ...this.state.userToEdit, // spread the previous contents of
        // the object in the movie to edit
        // then use the computational properties to edit
        // the input you're typing in
        [e.target.username]: e.target.value
        
      }
    })

  }
  showModal = (user) => {
    console.log(user, ' userID in show Modal')
    this.setState({
      userToEdit: user,
      showEditModal: !this.state.showEditModal
    })
  }
  closeAndEdit = async (userToEdit) => {
    // e.preventDefault();
    console.log('userToEdit in closeAndEdit: ', userToEdit)
    try {
      const editRequest = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/' + userToEdit._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(userToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(editRequest.status !== 200){
        throw Error('editResquest not working')
      }

      const editResponse = await editRequest.json();


      this.setState({
        userToEdit: {...editResponse.data},
        showEditModal: false
      })

      console.log("editResponse: " + editResponse);
      console.log("this.props.user: " + this.props.user)


      

    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }
  deleteUser = async (id) => {
    console.log(id, ' delete user ID')

    try {

      const deleteUser = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/' + id, {
        method: 'DELETE',
        credentials: 'include', 
        headers: {
          "Content-Type":"application/json"
        }
      });

      if(deleteUser.status !== 200){
        throw Error('Something happened on delete')
      }

      // this object is the actual response from the api
      const deleteUserJson = await deleteUser.json();

      this.setState({
        users: this.state.users.filter((user) => user._id !== id)
      });
      console.log(this.props.user, "this was deleted")
      return deleteUserJson;
    } catch(err){
      console.log(err);
      return err
    }
  }
  render(){
    console.log(this.props, "< state in render");
    return (
      <div className='user-container'>
        
        <EditUser 
        closeAndEdit={this.closeAndEdit} 
        userToEdit={this.props.user} 
        handleFormChange={this.handleFormChange} 
        deleteUser={this.deleteUser}
        /><br/>
      </div>
      )
  }
}

export default UserContainer;




//right before opening div 
//<UserList users={this.state.users} showModal={this.showModal} deleteUser={this.deleteUser}/>
        // <ParkList parks={this.state.users} showModal={this.showModal} deletePark={this.deletePark}
        // {this.state.showEditModal ? 
