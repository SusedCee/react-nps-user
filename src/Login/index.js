import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';
import '../App.css';

class Login extends Component {
	constructor(){
		super();

		this.state = {
			username: '',
			password: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value});

	}
	
	render(){
		return (
			<div className="form">
			<Segment>
				<Form onSubmit={this.props.handleLogin.bind(null, this.state)}>
				<div className="formTitle"> LOGIN </div><br/>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Username' placeholder='username' type='text' name='username' onChange={this.handleChange} width={2}/>
						<Form.Input fluid label='Password' placeholder='password' type='password' name='password' onChange={this.handleChange} width={2}/>
					</Form.Group>
					<Button color='grey' type='submit'>Login</Button>
				</Form>
				</Segment>
			</div>
		)
	}
}

export default Login;