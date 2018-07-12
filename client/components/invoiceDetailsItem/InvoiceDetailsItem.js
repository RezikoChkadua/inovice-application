import React, { Component } from 'react'
import {
    Button, Card, CardBody,
    Container, Row, Col, CardTitle,
    Table, Form, FormGroup, Input, Label,
    Modal, ModalBody, ModalFooter
} from 'reactstrap';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { EditInvoiceDetails } from "../../dialogs";

import './InvoiceDetailsItem.css'
class InvoiceDetailsItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDetails: '',
            invoiceDetails: '',
            name: '',
            description: '',
            quantity: '',
            price: '',
            total: '',
            modal: false
        }
    }

    handleInvoiceDetailDelete = () => {
        this.props.mutate({
            variables: { _id: this.props.details._id }
        })
        this.props.refetchDetails()
    }

    handleChange = event => {
        this.handleModal()
    }
    handleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    render() {
        const { _id, invoiceId, name, description, quantity, price, total } = this.props.details
        return (
            <tr>
                <td>
                    <FormGroup>
                        <Input type="name" name="name" placeholder="Name" value={name ? name : ""} onChange={this.handleChange} />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="Description" name="Description" placeholder="Description" value={description ? description : ""} onChange={this.handleChange} />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="Quantity" name="Quantity" placeholder="Quantity" value={quantity ? quantity : ""} onChange={this.handleChange} />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="Price" name="Price" placeholder="Price" value={price ? price : ""} onChange={this.handleChange} />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="Total" name="Total" placeholder="Total" value={total ? total : ""} onChange={this.handleChange} />
                    </FormGroup>
                </td>
                <td>
                    <Button color="danger" onClick={this.handleInvoiceDetailDelete}>delete</Button>
                </td>
                <Modal isOpen={this.state.modal} >
                    <ModalBody>
                        <EditInvoiceDetails refetchDetails={this.props.refetchDetails} invoiceDetails={this.props.details} handleModal={this.handleModal} />
                    </ModalBody>
                </Modal>
            </tr>
        )
    }
}


const mutation = gql`
    mutation deleteInvoiceDetails($_id:ID){
        deleteInvoiceDetails(_id: $_id)
               {
                     name
               }
      }
`;

export default graphql(mutation)(InvoiceDetailsItem)

// export default Invoice