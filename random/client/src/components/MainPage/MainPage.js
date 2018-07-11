import React, { Component } from 'react'
import {
    Button, Card, CardBody, CardTitle, Row, Col,
    Form, FormGroup, Label, Input, Container, Navbar,
    Nav, NavItem, NavbarBrand, Badge, ListGroup, ListGroupItem, CardText,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { graphql } from 'react-apollo'
import query from "../../queryes/fetchInvoices";

import './MainPage.css'
class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }
    render() {
        console.log(this.props, 'props')
        return (
            <div className="MainPage">
                <Card>
                    <CardBody>
                        <Container>
                            <Row>
                                <Col>
                                    <CardTitle>
                                        <Container>
                                            <Row>
                                                <Navbar color="light" light expand="md">
                                                    <h4> <Badge color="secondary">UserName</Badge> </h4>
                                                    {/* <NavbarToggler onClick={this.toggle} /> */}
                                                </Navbar>
                                            </Row>
                                        </Container>
                                    </CardTitle>
                                    <ListGroup>
                                        <ListGroupItem action>
                                            <Container>
                                                <Row className="center-col-verticaly">
                                                    <Col lg="8">
                                                        ინვოისის სახელი
                                                    </Col>

                                                    <Col lg="4" className="flex-end">
                                                        <div>
                                                            <Button color="secondary" size="sm" active>details</Button>{' '}
                                                            <Button color="info" size="sm" active
                                                                onClick={() => this.setState({ modal: !this.state.modal })}>
                                                                edit
                                                            </Button>{' '}
                                                            <Button color="danger" size="sm" active>delete</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="margin-top">
                                <Col>
                                    <Button outline color="primary">
                                        Add Invoice
                                    </Button>{' '}
                                </Col>
                            </Row>
                        </Container>
                    </CardBody >
                </Card >

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Invoice</ModalHeader>
                    <ModalBody>
                        Ediit
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Edit</Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}


export default graphql(query)(MainPage)