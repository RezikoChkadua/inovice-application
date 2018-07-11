import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import moment from 'moment'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import query from "../queryes/fetchInvoiceDetailsByInvoiceId";

class EditInvoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            desctiption: "",
            quantity: "",
            price: '',
            total: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleEditInvoiceDetails = (e) => {
        e.preventDefault()
        const { name, description, contactName, address, date } = this.state
        this.props.mutate({ variables: { _id: this.props.invoiceId, name, description, quantity, price, total } })
        this.props.data.refetch()
        this.props.toggleEditInvoice()
    }

    componentDidMount() {
        setTimeout(() => {
            const { name, quantity, price, total, desctiption } = this.props.data.getInvoiceById
            this.setState({ name, quantity, price, total, desctiption })
        }, 1000);
    }

    render() {
        const { loading } = this.props.data
        if (this.props.data.loading) return <div>loading...</div>

        const { name, description, quantity, price, total } = this.props.data.getInvoiceById
        return (
            <div className="create-invoice" >
                <Form onSubmit={this.handleEditInvoiceDetails}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" placeholder="name" value={this.state.name ? this.state.name : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Desctiption</Label>
                        <Input type="text" name="description" placeholder="description" value={this.state.description ? this.state.description : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>.
                        <Label for="quantity">Quantity</Label>
                        <Input type="text" name="quantity" placeholder="quantity" value={this.state.quantity ? this.state.quantity : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>.
                        <Label for="quantity">Quantity</Label>
                        <Input type="text" name="quantity" placeholder="quantity" value={this.state.quantity ? this.state.quantity : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">price</Label>
                        <Input type="price" name="price" placeholder="price" readOnly value={this.state.price ? this.state.price : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <Button color="primary">Edit</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleEditInvoice}>Cancel</Button>
                </Form>
            </div >
        )
    }
}

const mutation = gql`
    mutation editInvoiceDetails($_id:ID, $name: String,  $desctiption: String, $quantity: Number, $price: Number, $total:Number){
        editInvoiceDetails(_id:$_id, name:$name,description:$description, quantity:$quantity, price: $price,total:$total)
               {
                     name
               }
      }
`;


export default compose(
    // graphql(query, { options: (props) => { return { variables: { id: props.invoiceId } } } }),
    graphql(mutation)
)(EditInvoice)
