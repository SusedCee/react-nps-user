import React, { Component } from 'react';
import {Form, Button, Label, Segment } from 'semantic-ui-react';
import '../App.css'

class Register extends Component {
	constructor(){
		super();

		this.state = {
			username: '', 
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}
	handleSubmit = async (e) => {
		e.preventDefault();

		const register = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedRegister = await register.json();

		console.log(parsedRegister, 'response from express server on localhost 9000');

		if(parsedRegister.status.message === 'User logged In'){
			console.log('logged in')
			//programmatically switch between a route

			this.props.history.push('/login');
		}
	}
	render(){
		return (
			<div className="form">
			<Segment>
				<Form onSubmit={this.handleSubmit}>
				<div className="formTitle"> REGISTER </div><br/>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Username' placeholder='username' type='text' name='username' onChange={this.handleChange} width={2}/>
						<Form.Input fluid label='First Name' placeholder='firstname' type='text' name='firstname' onChange={this.handleChange} width={2}/>
						<Form.Input fluid label='Last Name' placeholder='lastname' type='text' name='lastname' onChange={this.handleChange} width={2}/>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Email' placeholder='email' type='text' name='email' onChange={this.handleChange} width={2}/>
						<Form.Input fluid label='Password' placeholder='password' type='password' name='password' onChange={this.handleChange} width={2}/>
					</Form.Group>
					<Button color='grey' type='submit'>Register</Button>
				</Form>
				</Segment>
			</div>
			)
	}
} 

export default Register;









