import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import moment from 'moment'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from "../queryes/fetchInvoices";

class CreateInvoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            contactName: '',
            address: '',
            date: moment().format('YYYY-MM-DD')
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleInvoiceCreation = (e) => {
        e.preventDefault()
        const { name, description, contactName, address, date } = this.state
        this.props.mutate({ variables: { name, description, contactName, address, date, userId: this.props.userId } }).then(() => {
            this.props.refetch()
            this.props.handleAddInvoiceModal(e)
        })
    }

    render() {
        return (
            <div className="invoice-modal" >
                <div className="invoice-modal-header">
                    <h2>Create Invoice</h2>
                </div>
                <form onSubmit={this.handleInvoiceCreation}>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="name" placeholder="name" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="description" placeholder="description" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="contactName" placeholder="contactName" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="address" placeholder="address" onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="date" name="date" placeholder="date" readOnly value={moment().format('YYYY-MM-DD')} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup dialog-btns">
                        <button className="approve-btn">Create</button>{' '}
                        <button className="cancel-btn" onClick={this.props.handleAddInvoiceModal}>Cancel</button>
                    </div>
                </form>

            </div>
        )
    }
}

const mutation = gql`
    mutation createInvoice($name:String, $description:String, $contactName:String, $address:String, $date:String ,$userId:ID) {
                        createInvoice(
                            name: $name,
            date:$date,
            description: $description,
            contactName:$contactName,
            address:$address,
            userId: $userId )
                       {
                        name
                    }
                    }
                `;

export default graphql(mutation)(CreateInvoice)





