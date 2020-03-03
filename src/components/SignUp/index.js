import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import Firebase from '../Firebase/firebase'

import { Wrapper, Form }from './style';

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        isAuth: false,
        error: null
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFormSubmit = async e => {
        const{ email, passwordOne, username }= this.state;
        e.preventDefault();
        try {
            await Firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
            this.props.doSetCurrentUser({
                username,
                email,
            })
            this.setState({isAuth: true});
        } catch(error) {
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
            username,
            email,
            passwordOne,
            passwordTwo,
            isAuth,
            error
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
            if(isAuth) {
                return <Redirect to = '/login' />
            }

        return (
        <Wrapper>
            <h1>sign up</h1>
            <Form onSubmit={this.handleFormSubmit}> 
    
            <input
                    placeholder='Full Name'
                    name='username'
                    value={username}
                    onChange={this.handleChange}
                /> <br />

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
                /> <br />

                <input
                    placeholder='Confirm Password'
                    type="password"
                    name='passwordTwo'
                    value={passwordTwo}
                    onChange={this.handleChange}
                /> <br /><br />

                <button disabled={isInvalid} type="submit">submit</button>
            </Form>
            {
                error &&<div style= {{color: 'red'}}>{error.message}</div>
            }
        </Wrapper>
        )
    }
}

export default withRouter(SignUp);