import React, { Component } from 'react'
import {
    Button, Card, CardBody,
    Container, Row, Col, CardTitle,
    Table, Form, Modal, ModalBody
} from 'reactstrap';

import fetchInvoiceDetailsByInvoiceId from "../../queryes/fetchInvoiceDetailsByInvoiceId";
import { graphql, compose } from 'react-apollo'
import Plus from "../../assets/svg/Plus";

import InvoiceDetailsItem from "../invoiceDetailsItem/InvoiceDetailsItem";
import { CreateInvoiceDetails } from "../../dialogs";
import './InvoiceDetails.css'
class InvoiceDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDetails: '',
            modal: false,
            total: 0
        }
    }

    refetchDetails = () => {
        this.props.data.refetch()
        this.forceUpdate()
    }

    handleModal = (e) => {
        e.preventDefault()
        this.setState({ modal: !this.state.modal })
    }

    handleTotal = () => {
        this.state.total({ total: '' })
    }

    render() {
        this.state.total = 0
        const { getInvoiceDetailsByInvoiceId } = this.props.data
        const { loading } = this.props.data
        if (loading) return <div>Loading...</div>
        return (
            <div className="invoice-details">
                <div className="invoice-details-list">
                    <div className="invoice-details-list-header">
                        <div className="invoice-details-list-col">
                            Name
                        </div>
                        <div className="invoice-details-list-col">
                            Description
                        </div>
                        <div className="invoice-details-list-col">
                            Quantity
                        </div>
                        <div className="invoice-details-list-col">
                            Price
                        </div>
                        <div className="invoice-details-list-col">
                            Total
                        </div>
                        <div className="invoice-details-list-col"></div>

                    </div>
                    {getInvoiceDetailsByInvoiceId &&
                        getInvoiceDetailsByInvoiceId.map(details => {
                            this.state.total += details.total
                            return <InvoiceDetailsItem handleTotal={this.handleTotal} refetchDetails={this.refetchDetails} key={details._id} details={details} />
                        })
                    }
                    <div className="invoice-details-list-footer">
                        <div className="add-invoice-details" onClick={this.handleModal}>
                            <Plus />
                        </div>
                        <div className="invoice-total" onClick={this.handleModal}>
                            <span>TOTAL : {this.state.total}</span>
                        </div>
                    </div>


                    <Modal isOpen={this.state.modal} >
                        <ModalBody>
                            <CreateInvoiceDetails
                                invoiceId={this.props.invoiceId}
                                handleModal={this.handleModal}
                                refetch={this.props.data.refetch}
                            />
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}


export default compose(
    graphql(fetchInvoiceDetailsByInvoiceId, { options: (props) => { return { variables: { id: props.invoiceId } } } }),
)(InvoiceDetails)

// export default Invoice