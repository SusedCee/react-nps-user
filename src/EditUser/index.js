import React, { Component } from 'react';
import {Form, Button, Label, Segment} from 'semantic-ui-react';
import UserContainer from '../UserContainer';


class EditUser extends Component {
	constructor(){
		super();

			this.state = {
				_id: '',
				username: '',
				firstname: '',
				lastname: '',
				email: '',
				password: ''
			}
		}

		componentDidMount() {
			console.log('this.props.userToEdit before setState: ', this.props)
			this.setState({
				_id: this.props.userToEdit._id,
				username: this.props.userToEdit.username,
				firstname: this.props.userToEdit.firstname,
				lastname: this.props.userToEdit.lastname,
				email: this.props.userToEdit.email,
				password: this.props.userToEdit.password
			}, () => {
				console.log('this.state.userToEdit in EditUser: ', this.state)
			})
		}

		updateUser = (e) => {
			this.setState({[e.currentTarget.name]: e.currentTarget.value})

		}

		handleSubmit = (e) => {
			e.preventDefault()
			console.log('this.state.userToEdit in handleSubmit: ', this.state)
			this.props.closeAndEdit(this.state);	
		}
	    render() {
	    	console.log('edit user props: ', this.props)
	    	// this.setUser();
			return (



			<div className="form">
			<Segment>
				<Form onSubmit={this.handleSubmit}>
				<div className="formTitle"> PROFILE </div><br/>
					<Form.Group widths='equal'>
						<Form.Input fluid label='First Name' placeholder='firstname' type='text' name='firstname' onChange={this.updateUser} value={this.state.firstname} width={2}/>
						<Form.Input fluid label='Last Name' placeholder='lastname' type='text' name='lastname' onChange={this.updateUser} value={this.state.lastname} width={2}/>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Username' placeholder='username' type='text' name='username' onChange={this.updateUser} value={this.state.username} width={2}/>
						<Form.Input fluid label='Email' placeholder='email' type='text' name='email' onChange={this.updateUser} value={this.state.email} width={2}/>
					</Form.Group>
					<Button color='grey' type='submit'>Submit Edit</Button>
				</Form>
				</Segment>
				<br />
				<Button 
					color='grey'
					type='submit' 
					className="small ui red button" 
					onClick={this.props.deleteUser.bind(null, this.state._id)}
					>
					Delete my Profile
				</Button>
			</div>


			)
	}
}

export default EditUser;



						//<Label htmlFor="password">
						//	Change Password:
						//	<Form.Input 
						//	type='text' 
						//	name='password' 
						//	onChange={this.updateUser} 
						//	/>
						//</Label>


