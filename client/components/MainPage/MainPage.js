import React, { Component } from 'react'
import {
    Button, Card, CardBody, CardTitle, Row, Col,
    Container, Navbar, Badge, ListGroup,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import { CreateInvoice } from "../../dialogs";
import { EditInvoice } from "../../dialogs";

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import query from "../../queryes/fetchInvoicesByUserId";
import Plus from "../../assets/svg/Plus";

import InvoiceList from "../Invoice-List/InvoiceList";
import './MainPage.css'
class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editInvoiceModal: false,
            addInvoiceModal: false,
            invoiceEditId: "",
            detailsCollapse: false
        }
    }

    handleInvoiceDelete = (id) => {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch())
    }

    handleAddInvoiceModal = (e) => {
        // e.persist()
        e.preventDefault()
        this.setState({ addInvoiceModal: !this.state.addInvoiceModal })
    }

    handleEditInvoice = (event, id) => {
        event.preventDefault()
        // this.props.history.push(`?${id}`)
        this.setState({ invoiceEditId: id })
        this.toggleEditInvoice()
    }

    toggleEditInvoice = () => {
        this.setState({ editInvoiceModal: !this.state.editInvoiceModal })
    }

    handleRefetch = () => {
        this.props.data.refetch()
    }


    render() {
        const { getInvoicesByUserId, loading } = this.props.data
        if (loading) return <div> Loading... </div>
        return (
            <div className="MainPage">
                <div className="mainPage-header">
                    <h2>Invoice List</h2>
                </div>
                <div className="invoice-list-table">
                    <div className="invoice-list-header">
                        <div className="invoice-list-col">NAME</div>
                        <div className="invoice-list-col">CONTACT-NAME</div>
                        <div className="invoice-list-col">DATE</div>
                        <div className="invoice-list-col">DESCRIPTION</div>
                        <div className="invoice-list-col">ADDRESS</div>
                        <div className="invoice-list-col"></div>
                    </div>

                    {getInvoicesByUserId &&
                        getInvoicesByUserId.map(invoice => {
                            return (
                                <InvoiceList
                                    key={invoice._id}
                                    Invoices={invoice}
                                    refetch={this.props.data.refetch}
                                    handleEditInvoice={this.handleEditInvoice}
                                    handleInvoiceDelete={this.handleInvoiceDelete}
                                />
                            )
                        })
                    }
                </div>
                <div className="mainPage-footer">
                    <button className="add-invoice" onClick={this.handleAddInvoiceModal}>
                        <Plus />
                    </button>{' '}
                </div>

                {/* Modals */}
                <Modal isOpen={this.state.addInvoiceModal} toggle={this.toggle} className={this.props.className} >
                    <ModalBody>
                        <CreateInvoice
                            userId={this.props.match.params.id}
                            handleAddInvoiceModal={this.handleAddInvoiceModal}
                            refetch={this.handleRefetch}
                        />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editInvoiceModal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <EditInvoice invoiceId={this.state.invoiceEditId} toggleEditInvoice={this.toggleEditInvoice} />
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}


const mutation = gql`
    mutation deleteInvoice($_id: ID) {
                    deleteInvoice(_id: $_id) {
                    id
                }
                }
            `;

export default compose(
    graphql(mutation),
    graphql(query, { options: (props) => { return { variables: { id: props.match.params.id } } } }),
)(MainPage)

