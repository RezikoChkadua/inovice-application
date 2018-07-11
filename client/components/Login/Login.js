import React, { Component } from 'react'

import { Link } from "react-router-dom";

import {
    Button, Card, CardBody, CardTitle, Row, Col
    , Form, FormGroup, Label, Input
} from 'reactstrap';
import './Login.css'
export default class Login extends Component {
    render() {
        return (
            <div className="Login">
                <Row>
                    <Col>
                        <Card body>
                            <CardBody>
                                <CardTitle>Invoice App</CardTitle>
                                <Form>
                                    <FormGroup>
                                        <Label for="username">Email</Label>
                                        <Input type="text" name="username" placeholder="username" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Email</Label>
                                        <Input type="password" name="password" placeholder="password" />
                                    </FormGroup>

                                </Form>
                                <Link to="mainpage/:id">
                                    <Button color="primary">Login</Button>
                                </Link>
                                {' '}
                                <Link to="registration">
                                    <Button color="primary">Register</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div >
        )
    }
}
