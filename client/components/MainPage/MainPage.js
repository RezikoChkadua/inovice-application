import React, { Component } from 'react'
import {
    Button, Card, CardBody, CardTitle, Row, Col,
    Container, Navbar, Badge, ListGroup,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import { CreateInvoice } from "../../dialogs";
import { EditInvoice } from "../../dialogs";

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import query from "../../queryes/fetchInvoicesByUserId";

import InvoiceList from "../Invoice-List/InvoiceList";
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

    handleRefetch = () => {
        this.props.data.refetch()
    }


    render() {
        console.log(this.props.data, 'this.props.data')
        const { getInvoicesByUserId, loading } = this.props.data
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
                                                    <h4> <Badge color="secondary"></Badge> </h4>
                                                    {/* <NavbarToggler onClick={this.toggle} /> */}
                                                </Navbar>
                                            </Row>
                                        </Container>
                                    </CardTitle>
                                    <ListGroup>
                                        {getInvoicesByUserId &&
                                            getInvoicesByUserId.map(invoice => {
                                                console.log(invoice, 'invoice')
                                                return (
                                                    <InvoiceList
                                                        key={invoice._id}
                                                        Invoices={invoice}
                                                        refetch={this.props.data.refetch}
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
                        <CreateInvoice
                            userId={this.props.match.params.id}
                            handleInvoiceModal={this.handleInvoiceModal}
                            refetch={this.handleRefetch}
                        />
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
    mutation deleteInvoice($_id: ID) {
        deleteInvoice(_id: $_id) {
            id
       }
    }
`;

export default compose(
    graphql(mutation),
    graphql(query, { options: (props) => { return { variables: { id: props.match.params.id } } } }),
)(MainPage)

