import React, { Component } from 'react'
import {
    Button, Card, CardBody, CardTitle, Row, Col,
    Container, Navbar, Badge, ListGroup,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import { CreateInvoice } from "../../dialogs";
import { EditInvoice } from "../../dialogs";

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from "../../queryes/fetchInvoices";

import Invoice from "../Invoice/Invoice";
import './MainPage.css'
class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editInvoiceModal: false,
            addInvoiceModal: false,
            invoiceEditId: "",
            detailsCollapse: false
        }
    }

    handleInvoiceDelete = (id) => {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch())
    }

    handleInvoiceModal = () => {
        this.setState({ addInvoiceModal: !this.state.addInvoiceModal })
    }

    handleEditInvoice = (event, id) => {
        event.preventDefault()
        // this.props.history.push(`?${id}`)
        this.setState({ invoiceEditId: id })
        this.toggleEditInvoice()
    }

    toggleEditInvoice = () => {
        this.setState({ editInvoiceModal: !this.state.editInvoiceModal })
    }


    render() {
        const { getInvoices, loading } = this.props.data
        if (loading) return <div> Loading... </div>
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

                                        {
                                            getInvoices.map(invoice => {
                                                return (
                                                    <Invoice
                                                        key={invoice._id}
                                                        Invoices={invoice}
                                                        handleEditInvoice={this.handleEditInvoice}
                                                        handleInvoiceDelete={this.handleInvoiceDelete}
                                                    />
                                                )
                                            })
                                        }

                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="margin-top">
                                <Col>
                                    <Button outline color="primary" onClick={this.handleInvoiceModal}>
                                        Add Invoice
                                    </Button>{' '}
                                </Col>
                            </Row>
                        </Container>
                    </CardBody >
                </Card >

                {/* Modals */}

                <Modal isOpen={this.state.addInvoiceModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Invoice</ModalHeader>
                    <ModalBody>
                        <CreateInvoice handleInvoiceModal={this.handleInvoiceModal} />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editInvoiceModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Invoice</ModalHeader>
                    <ModalBody>
                        <EditInvoice invoiceId={this.state.invoiceEditId} toggleEditInvoice={this.toggleEditInvoice} />
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}


const mutation = gql`
    mutation deleteInvoice($id: ID) {
        deleteInvoice(_id: $id) {
            _id
       }
    }
`;

export default graphql(mutation)(
    graphql(query)(MainPage)
)

