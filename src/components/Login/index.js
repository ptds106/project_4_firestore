import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { PasswordForgetLink } from '../PasswordForget'

import Firebase from '../Firebase/firebase'
class Login extends Component {
    state = {
        email: '',
        passwordOne: '',
        username: '',
        isAuth: false,
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFormSubmit = async e => {
        const { email, passwordOne, username } = this.state;
        e.preventDefault();
        try {
            await Firebase.doSignInWithEmailAndPassword(email, passwordOne)
            this.props.loginUser({
                username,
                email,
            });
            this.setState({ 
                isAuth: true, 
            })
        } catch (error) {
            this.setState({
                error,
            });
            setTimeout(() => {
                this.setState({
                    error: null,
                });
            }, 3000);
        }
    }

    render() {
        const {
            email,
            passwordOne,
            isAuth,
        } = this.state

        if(isAuth) {
            return <Redirect to='/' />
        }

        return (
            <>
           
                <h1>Log In</h1>
                <form onSubmit={this.handleFormSubmit}>

                    <input
                        placeholder='E-mail'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                    /> <br />

                    <input
                        placeholder='Password'
                        type="password"
                        name='passwordOne'
                        value={passwordOne}
                        onChange={this.handleChange}
                    /> <br /><br />

                    <button type="submit">submit</button>
                </form>
                <PasswordForgetLink />
         
        </>
        )
    }
}

export default Login