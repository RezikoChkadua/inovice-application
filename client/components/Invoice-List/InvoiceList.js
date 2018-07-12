import React, { Component } from 'react'
import {
    Button, Card, CardBody, Row, Col, Container, ListGroupItem, Collapse,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import moment from 'moment'
import { EditInvoice } from '../../dialogs';
import { Link } from 'react-router-dom'


import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './InvoiceList.css'
class InvoiceList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editInvoiceModal: false
        }
    }

    handleEditInvoice = e => {
        e.preventDefault()
    }

    handleDeleteInvoice = (e) => {
        e.preventDefault()
        this.props.mutate({ variables: { _id: this.props.Invoices._id } }).then(() => {
            this.props.refetch()
        })
    }

    toggleEditInvoice = (e) => {
        e.preventDefault()
        this.setState({ editInvoiceModal: !this.state.editInvoiceModal })
    }

    render() {
        const { _id, name, contactName, date, description, address, modified } = this.props.Invoices
        return (
            <div className="invoice-list">
                <Link to={`/invoice/${_id ? _id : ''}`}>
                    <ListGroupItem action>
                        <Container>
                            <Row>
                                <Col sm="2">
                                    {name ? name : ''}
                                </Col>
                                <Col sm="2">
                                    {contactName ? contactName : ''}
                                </Col>
                                <Col sm="2">
                                    {moment(date).format('YYYY-MM-DD')}
                                </Col>
                                <Col sm="2">
                                    {description}
                                </Col>
                                <Col sm="2">
                                    {address}
                                </Col>
                                <Col sm="2">
                                    <Button onClick={this.toggleEditInvoice} color="primary">Edit</Button> {' '}
                                    <Button onClick={this.handleDeleteInvoice} color="danger">Delete</Button>
                                </Col>
                            </Row>
                        </Container >
                    </ListGroupItem >
                </Link>
                <Modal isOpen={this.state.editInvoiceModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Invoice</ModalHeader>
                    <ModalBody>
                        <EditInvoice invoiceId={this.props.Invoices._id} toggleEditInvoice={this.toggleEditInvoice} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mutation = gql`
        mutation deleteInvoice($_id: ID){
            deleteInvoice(_id: $_id) {
            name
        }
    }
`;

export default graphql(mutation)(InvoiceList)
