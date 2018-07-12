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

        const { name, address, contactName, date, description, modified } = this.props.data.getInvoiceById
        return (
            <div className="invoice">
                <Card>
                    <CardBody>
                        <Container>
                            <Row>
                                <Col sm="2">Name: {name}</Col>
                                <Col sm="2">Adress: {address}</Col>
                                <Col sm="2">Contact: Name{contactName}</Col>
                                <Col sm="2">Date: {moment(date).format('YYYY-MM-DD')}</Col>
                                <Col sm="2">Description: {description}</Col>
                            </Row>
                            <Row>
                                <InvoiceDetails invoiceId={this.props.match.params.id} />
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


export default compose(
    graphql(fetchInvoiceById, { options: (props) => { return { variables: { id: props.match.params.id } } } }),
    // graphql(fetchInvoiceDetailsByInvoiceId, {options: (props) => { return {variables: {id: props.match.params.id } } } }),
)(Invoice)

// export default Invoice