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

import Delete from "../../assets/svg/Delete";
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
        }).then(() => this.props.refetchDetails())
    }

    handleChange = event => {
        this.setState({ modal: !this.state.modal })
    }

    handleModal = (e) => {
        e.preventDefault()
        this.setState({ modal: !this.state.modal })
    }

    render() {
        const { _id, invoiceId, name, description, quantity, price, total } = this.props.details
        return (
            <div className="invoice-details-list-item">
                <div className="invoice-list-item-col">
                    <input className="input-style" type="name" name="name" placeholder="Name" value={name ? name : ""} onChange={this.handleChange} />
                </div>
                <div className="invoice-list-item-col">
                    <input className="input-style" type="Description" name="Description" placeholder="Description" value={description ? description : ""} onChange={this.handleChange} />
                </div>
                <div className="invoice-list-item-col">
                    <input className="input-style" type="Quantity" name="Quantity" placeholder="Quantity" value={quantity ? quantity : ""} onChange={this.handleChange} />
                </div>
                <div className="invoice-list-item-col">
                    <input className="input-style" type="Price" name="Price" placeholder="Price" value={price ? price : ""} onChange={this.handleChange} />
                </div>
                <div className="invoice-list-item-col">
                    <input className="input-style" type="Total" name="Total" placeholder="Total" value={total ? total : ""} onChange={this.handleChange} />
                </div>
                <div className="invoice-list-item-col">
                    <div onClick={this.handleInvoiceDetailDelete}>
                        <Delete />
                    </div>
                </div>
                <Modal isOpen={this.state.modal} >
                    <ModalBody>
                        <EditInvoiceDetails refetchDetails={this.props.refetchDetails} invoiceDetails={this.props.details} handleModal={this.handleModal} />
                    </ModalBody>
                </Modal>
            </div >
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