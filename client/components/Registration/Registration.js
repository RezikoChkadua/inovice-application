import React, { Component } from 'react'

import { Link } from "react-router-dom";

import {
    Button, Card, CardBody, CardTitle, Row, Col
    , Form, FormGroup, Label, Input
} from 'reactstrap';
import './Registration.css'

import gql from "graphql-tag";
import { graphql } from 'react-apollo'

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''

        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSignUp = (e) => {
        e.preventDefault()
        const { username, password, email } = this.state
        this.props.mutate({
            variables: {
                username, password, email,
            }
        }).then(() => {
            window.location.href = '/'
        })
    }

    render() {
        const { username, password, email } = this.state
        return (
            <div className="registration" >

                <form onSubmit={this.handleSignUp}>
                    <div className="form-header">
                        <h2>Invoice App</h2>
                    </div>
                    <div className="formGroup">
                        {/* <label for="username">Uername</label> */}
                        <input className="input-style" type=" text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        {/* <label for="password">Password</label> */}
                        <input className="input-style" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        {/* <label for="email">Email</label> */}
                        <input className="input-style" type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup registration-btns">
                        <button className="registration-btn">Register</button>
                        <Link to="/">
                            <button className="back-btn">Back</button>
                        </Link>
                        {' '}
                    </div>
                </form>
            </div >
        )
    }
}


const mutation = gql`
   mutation signup($username: String, $password:String, $email: String) {
                    signup(username: $username, password:$password, email:$email) {
                    id
                }
                }
            
            `;

export default graphql(mutation)(Registration)