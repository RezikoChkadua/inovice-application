import React, { Component } from 'react'
import {
    Button, Card, CardBody,
    Container, Row, Col, CardTitle,
    Table, Form, FormGroup, Input, Label
} from 'reactstrap';
import moment from 'moment'
import fetchInvoiceById from "../../queryes/fetchInvoiceById";
import fetchInvoiceDetailsByInvoiceId from "../../queryes/fetchInvoiceDetailsByInvoiceId";
import { graphql, compose } from 'react-apollo'

import InvoiceDetails from '../InvoiceDetails/InvoiceDetails'
import './Invoice.css'
class Invoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDetails: '',
        }
    }


    render() {
        const { loading } = this.props.data
        if (loading) return <div> Loading... </div>

        const { _id, name, address, contactName, date, description, modified } = this.props.data.getInvoiceById
        return (
            <div className="invoice">
                <div className="invoice-header">
                    <h2>Invoice  </h2>{' '}<span> :{_id}</span>
                </div>
                <div className="invoice-fileds">
                    <div className="invoice-field">
                        <span> Name: </span>{name}

                    </div>
                    <div className="invoice-field">
                        <span> Adress: </span>{address}
                    </div>
                    <div className="invoice-field">
                        <span> Contact Name:</span>{contactName}
                    </div>
                    <div className="invoice-field">
                        <span> Date: </span>{moment(date).format('YYYY-MM-DD')}
                    </div>
                    <div className="invoice-field">
                        <span> Description: </span>{description}
                    </div>

                </div>
                <InvoiceDetails invoiceId={this.props.match.params.id} />
            </div>
        )
    }
}


export default compose(
    graphql(fetchInvoiceById, { options: (props) => { return { variables: { id: props.match.params.id } } } }),
    // graphql(fetchInvoiceDetailsByInvoiceId, {options: (props) => { return {variables: {id: props.match.params.id } } } }),
)(Invoice)

// export default Invoice