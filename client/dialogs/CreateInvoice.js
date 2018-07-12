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
        this.props.mutate({ variables: { name, description, contactName, address, date, userId: this.props.userId } })
        this.props.handleInvoiceModal()
        this.props.refetch()
    }

    render() {
        return (
            <div className="create-invoice" >
                <Form onSubmit={this.handleInvoiceCreation}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" placeholder="name" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Desctiption</Label>
                        <Input type="text" name="description" placeholder="description" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="contactName">Contact Name</Label>
                        <Input type="text" name="contactName" placeholder="contactName" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">address</Label>
                        <Input type="text" name="address" placeholder="address" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" name="date" placeholder="date" readOnly value={moment().format('YYYY-MM-DD')} onChange={this.handleChange} />
                    </FormGroup>

                    <Button color="primary"  >Create</Button>{' '}
                    <Button color="secondary" onClick={() => this.props.handleInvoiceModal}>Cancel</Button>
                </Form>

            </div >
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





