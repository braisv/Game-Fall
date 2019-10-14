import React, { Component } from 'react';
import AuthService from './AuthService'
import "./Signup.css"


export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
    };
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, name, surname, email, phone } = this.state;

    this.service.signup(username, password, name, surname, email, phone)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            name: '',
            surname: '',
            email: '',
            phone: ''
        });

        this.props.getUser(response.user)
    })
    .catch(error => {
      this.setState({
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        error: true
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div className='container-card'>
        <h3>Welcome!, create your account next:</h3>

        <form className="signup-form" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" placeholder="userN..." value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset>
            <label>Name:</label>
            <input type="text" name="name" placeholder="John..." value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset>
            <label>Surname:</label>
            <input type="text" name="surname" placeholder="Wick..." value={this.state.surname} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset>
            <label>E-mail:</label>
            <input type="text" name="email" placeholder="something@like.this..." value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset>
            <label>Phone Number:</label>
            <input type="text" name="phone" value={this.state.phone} placeholder="+34 333 911 199..." onChange={ e => this.handleChange(e)}/>
          </fieldset>
          
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>
          
          <input type="submit" value="Sign up" />
        </form>

        <h1>{this.state.error ? 'Error' : ''}</h1>
      </div>
    )
  }
}
