import React, { Component } from 'react'

import { Link } from "react-router-dom";

import {
    Button, Card, CardBody, CardTitle, Row, Col
    , Form, FormGroup, Label, Input
} from 'reactstrap';
import './Registration.css'
export default class Registration extends Component {
    render() {
        return (
            <div className="Registration">
                <Row>
                    <Col>
                        <Card body>
                            <CardBody>
                                <CardTitle>Registration</CardTitle>
                                <Form>
                                    <FormGroup>
                                        <Label for="username">Uername</Label>
                                        <Input type="text" name="username" placeholder="username" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" placeholder="password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Confirm Password</Label>
                                        <Input type="password" name="password" placeholder="password" />
                                    </FormGroup>

                                </Form>
                                <Link to="/">
                                    <Button color="danger">Back</Button>
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
