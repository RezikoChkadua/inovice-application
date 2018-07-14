import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import moment from 'moment'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import query from "../queryes/fetchInvoiceById";
import refetchInvoices from "../queryes/fetchInvoices";

class EditInvoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            contactName: '',
            address: '',
            date: moment().format('YYYY-MM-DD'),
            invoiceId: '',
            modified: '',
            invoiceId: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleInvoiceEdit = (e) => {
        e.preventDefault()
        const { name, description, contactName, address, date } = this.state
        this.props.mutate({ variables: { _id: this.props.invoiceId, name, description, contactName, address, date } })
            .then(() => {
                this.props.data.refetch()
                this.props.toggleEditInvoice(e)
            })
    }

    componentDidMount() {
        setTimeout(() => {
            const { name, contactName, created, date, description, address } = this.props.data.getInvoiceById
            this.setState({ name, contactName, created, date, description, address })
        }, 1000);
    }

    render() {
        const { loading } = this.props.data
        if (this.props.data.loading) return <div>loading...</div>

        const { name, contactName, created, date, description, modified } = this.props.data.getInvoiceById
        return (
            <div className="invoice-modal" >
                <form onSubmit={this.handleInvoiceEdit}>
                    <div className="invoice-modal-header">
                        <h2>Edit Invoice</h2>
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="name" placeholder="name" value={this.state.name ? this.state.name : ''} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="description" placeholder="description" value={this.state.description ? this.state.description : ''} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="contactName" placeholder="contactName" value={this.state.contactName ? this.state.contactName : ''} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="text" name="address" placeholder="address" value={this.state.address ? this.state.address : ''} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <input className="input-style" type="date" name="date" placeholder="date" readOnly value={moment().format('YYYY-MM-DD')} onChange={this.handleChange} />
                    </div>
                    <div className="formGroup">
                        <button className="approve-btn">Edit</button>{' '}
                        <button className="cancel-btn" onClick={this.props.toggleEditInvoice}>Cancel</button>
                    </div>
                </form>
            </div >
        )
    }
}

const mutation = gql`
    mutation editInvoice($_id:ID, $name: String, $date: String,$description: String,$contactName: String,$address: String){
                    editInvoice(_id: $_id name:$name,date:$date,description: $description, contactName: $contactName, address: $address) {
                    name
                }
                }
                `;

export default compose(
    graphql(query, { options: (props) => { return { variables: { id: props.invoiceId } } } }),
    graphql(mutation)
)(EditInvoice)




