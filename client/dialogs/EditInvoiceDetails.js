import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import moment from 'moment'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import query from "../queryes/fetchInvoiceDetailsByInvoiceId";

class EditInvoiceDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            name: '',
            description: "",
            quantity: '',
            price: '',
            total: ''
        }
    }

    handleChange = (event) => {
        console.log(this.state)
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.name === "quantity" || event.target.name === "price") {
            setTimeout(() => {
                this.handleTotal()
            }, 0);
        }
    }

    handleTotal = () => {
        this.setState({ total: this.state.price * this.state.quantity })
    }

    handleDetailsUpdate = (e) => {
        console.log(this.state)
        e.preventDefault()
        const { _id, name, description, quantity, price, total } = this.state
        this.props.mutate({
            variables: {
                _id, name, description, quantity, price, total, invoiceId: this.props.invoiceDetails.invoiceId
            }, refetchQueries: [{ query }]
        })
        this.props.handleModal();
        this.props.refetchDetails();
    }

    componentDidMount() {
        setTimeout(() => {
            const { _id, name, quantity, price, total, description } = this.props.invoiceDetails
            this.setState({ _id, name, quantity, price, total, description })
        }, 1000);
    }

    render() {
        const { name, description, quantity, price, total } = this.props.invoiceDetails
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
                    <FormGroup>
                        <Label for="quantity">Quantity</Label>
                        <Input type="text" name="quantity" placeholder="quantity" value={this.state.quantity ? this.state.quantity : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">price</Label>
                        <Input type="price" name="price" placeholder="price" value={this.state.price ? this.state.price : ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="total">Total</Label>
                        <Input type="text" name="total" placeholder="total" readOnly value={this.state.total ? this.state.total : ''} onChange={this.handleChange} />
                    </FormGroup>

                    <Button color="primary" onClick={this.handleDetailsUpdate}>Edit</Button>{' '}
                    <Button color="secondary" onClick={this.props.handleModal}>Cancel</Button>
                </Form>
            </div >
        )
    }
}


const mutation = gql`
    mutation editInvoiceDetails($_id:ID, $name: String, $invoiceId:ID $description: String, $quantity: Int, $price:Int, $total:Int){
        editInvoiceDetails(_id:$_id, name:$name, invoiceId:$invoiceId,description:$description, quantity:$quantity, price: $price,total:$total)
               {
                     name
               }
      }
`;


export default graphql(mutation)(EditInvoiceDetails)