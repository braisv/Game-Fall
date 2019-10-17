// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return (
      <div className='container-signup flex-column'>
        <h3>Welcome back!</h3>

        <form className="signup-form" onSubmit={this.handleFormSubmit}>
          <div className="flex">
            <fieldset>
              <label>Username:</label>
              <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
            </fieldset>

            <fieldset>
              <label>Password:</label>
              <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </fieldset>

          </div>
          <input className="submit-signup" type="submit" value="Log in" />
        </form>

        <h1>{this.state.error ? 'Error' : ''}</h1>
      </div>
    )
  }
}