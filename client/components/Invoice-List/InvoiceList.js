import React, { Component } from 'react'
import {
    Button, Card, CardBody, Row, Col, Container, ListGroupItem, Collapse,
    Modal, ModalHeader, ModalBody, Tooltip
} from 'reactstrap';
import moment from 'moment'
import { EditInvoice } from '../../dialogs';
import { Link } from 'react-router-dom'
import Edit from "../../assets/svg/Edit";
import Delete from "../../assets/svg/Delete";


import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './InvoiceList.css'
class InvoiceList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleteTooltip: false,
            editTooltip: false,
            editInvoiceModal: false
        }
    }

    handleEditInvoice = e => {
        e.preventDefault()
    }

    handleDeleteInvoice = (e) => {
        e.preventDefault()
        this.props.mutate({ variables: { _id: this.props.Invoices._id } }).then(() => {
            this.props.refetch()
        })
    }

    toggleEditInvoice = (e) => {
        e.preventDefault()
        this.setState({ editInvoiceModal: !this.state.editInvoiceModal })
    }


    // deleteTooltip = () => {
    //     this.setState({
    //         deleteTooltip: !this.state.deleteTooltip
    //     })
    // }

    // editTooltip = () => {
    //     console.log('hi')
    //     this.setState({
    //         editTooltip: !this.state.editTooltip
    //     })
    // }


    render() {
        const { _id, name, contactName, date, description, address, modified } = this.props.Invoices
        return (
            <div className="invoice-list-item">
                <Link to={`/invoice/${_id ? _id : ''}`}>
                    <div className="invoice-list-item-content">
                        <div className="invoice-list-col">
                            {name ? name : ''}
                        </div>
                        <div className="invoice-list-col">
                            {contactName ? contactName : ''}
                        </div>
                        <div className="invoice-list-col">
                            {moment(date).format('YYYY-MM-DD')}
                        </div>
                        <div className="invoice-list-col">
                            {description ? description : ''}
                        </div>
                        <div className="invoice-list-col">
                            {address ? address : ''}
                        </div>
                        <div className="invoice-list-col list-item-btns" >
                            <div className="invoice-list-item-edit" id="editTooltip" onClick={this.toggleEditInvoice}>
                                <Edit />
                            </div>
                            {' '}
                            <div className="invoice-list-item-delete" id="deleteTooltip" onClick={this.handleDeleteInvoice}>
                                <Delete />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* <Tooltip placement="right" isOpen={this.state.deleteTooltip} target="deleteTooltip" toggle={this.deleteTooltip}>
                    Delete
                </Tooltip>
                <Tooltip placement="right" isOpen={this.state.editTooltip} target="editTooltip" toggle={this.editTooltip}>
                    Edit
                </Tooltip> */}


                <Modal isOpen={this.state.editInvoiceModal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <EditInvoice invoiceId={this.props.Invoices._id} toggleEditInvoice={this.toggleEditInvoice} />
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

const mutation = gql`
        mutation deleteInvoice($_id: ID){
                    deleteInvoice(_id: $_id) {
                    name
                }
                }
            `;

export default graphql(mutation)(InvoiceList)
