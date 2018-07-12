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
                <Row>
                    <Col>
                        <Card body>
                            <CardBody>
                                <CardTitle>Invoice App</CardTitle>
                                <Form onSubmit={this.handleLogin}>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button color="primary">Login</Button>
                                    {' '}
                                    <Link to="/registration">
                                        <Button color="primary">Register</Button>
                                    </Link>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div >
        )
    }
}

const mutation = gql`
    mutation login($username: String, $password:String){
        login(username:$username, password:$password) {
            id
        }
}
`


export default graphql(mutation)(Login)
