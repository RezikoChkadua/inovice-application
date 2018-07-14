import React, { Component } from 'react'

import { Link } from "react-router-dom";

import {
    Button, Card, CardBody, CardTitle, Row, Col
    , Form, FormGroup, Label, Input
} from 'reactstrap';
import './Login.css'


import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log('logiin')
        const { username, password } = this.state
        this.props.mutate({
            variables: {
                username,
                password
            }
        }).then(res => this.props.history.push(`/mainpage/${res.data.login.id}`))
    }

    render() {
        const { username, password } = this.state
        return (
            <div className="Login">
                <form onSubmit={this.handleLogin}>
                    <div className="form-header">
                        <h2>Invoice App</h2>
                    </div>
                    <div className="formGroup">
                        {/* <label htmlFor="username">Username</label> */}
                        <input autoComplete="off" className="input-style" type="text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        {/* <label htmlFor="password">Password</label> */}
                        <input autoComplete="off" className="input-style" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <button className="login-btn">Login</button>
                        {' '}
                    </div>
                    <div className="form-footer">
                        <Link to="/registration">
                            <p> Registration </p>
                        </Link>
                    </div>

                </form>
            </div >
        )
    }
}

const mutation = gql`
    mutation login($username: String, $password:String){
                    login(username: $username, password:$password) {
                    id
                }
                }
                `


export default graphql(mutation)(Login)
