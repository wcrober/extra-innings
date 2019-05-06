import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

import {setAuthenticationHeader} from '../utils/authenticate'


class Login extends {Component} {

    constructor(){
        super()

        this.state ={
            username: '',
            password: ''
        }
    }
    

   // Need to set the state based on user input on the text box.
   handleTextBoxChange = (e) => {
       this.setState({
    [e.target.name]: e.target.value
    })
   }

   
   handleLoginClick = () => {
       // Send the username and password from the state to the express Server by doing a fetch or axios
       axios.post('http://localhost:8080/login', {
           username:this.state.username,
           password:this.state.password
       }).then(response => {
           let token = response.data.token
           console.log(token)
           //Save the token in local storage
           localStorage.setItem('jsonwebtoken', token)
           //update the redux state
           this.props.onAuthenticated(token)
           setAuthenticationHeader(token)
       }).catch(error => console.log(error))
   }


    render(){

        return(
            <div>
            <h1>Login</h1>
            <input name="username" onChange={this.handleTextBoxChange} placeholder="username"></input>
            <input name="password" onChange={this.handleTextBoxChange} placeholder="password"></input>
            <button onClick={this.handleLoginClick}>Login</button>
            </div>
        )
    }
}

const mapDispaatchToProps = (dispatch) => {
    return {
        onAuthenticated:(token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null, mapDispaatchToProps)(Login) 