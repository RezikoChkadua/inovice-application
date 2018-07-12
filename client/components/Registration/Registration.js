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
            <div className="Registration" >
                <Row>
                    <Col>
                        <Card body>
                            <CardBody>
                                <CardTitle>Registration</CardTitle>
                                <Form onSubmit={this.handleSignUp}>
                                    <FormGroup>
                                        <Label for="username">Uername</Label>
                                        <Input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                                    </FormGroup>
                                    <Link to="/">
                                        <Button color="danger">Back</Button>
                                    </Link>
                                    {' '}
                                    <Button color="primary">Register</Button>
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
   mutation signup($username: String, $password:String, $email: String) {
        signup(username:$username, password:$password, email:$email) {
            id
        }
    }

`;

export default graphql(mutation)(Registration)