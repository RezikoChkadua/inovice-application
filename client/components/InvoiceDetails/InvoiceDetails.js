import React, { Component } from 'react'
import {
    Button, Card, CardBody,
    Container, Row, Col, CardTitle,
    Table, Form, Modal, ModalBody
} from 'reactstrap';

import fetchInvoiceDetailsByInvoiceId from "../../queryes/fetchInvoiceDetailsByInvoiceId";
import { graphql, compose } from 'react-apollo'

import InvoiceDetailsItem from "../invoiceDetailsItem/InvoiceDetailsItem";
import { CreateInvoiceDetails } from "../../dialogs";
import './InvoiceDetails.css'
class InvoiceDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceDetails: '',
            modal: false
        }
    }

    refetchDetails = () => {
        this.props.data.refetch()
    }

    handleModal = () => {
        this.setState({ modal: !this.state.modal })
    }


    render() {
        const { getInvoiceDetailsByInvoiceId } = this.props.data
        const { loading } = this.props.data
        if (loading) return <div>Loading...</div>
        return (
            <Card>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <CardTitle>
                                    Invoice
                            </CardTitle>
                                <CardBody>
                                    <Form>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    getInvoiceDetailsByInvoiceId.map(details =>
                                                        <InvoiceDetailsItem refetchDetails={this.refetchDetails} key={details._id} details={details} />
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Form>
                                </CardBody>
                            </Col>
                        </Row>
                    </Container>
                    <Button color="primary" onClick={this.handleModal}>Add Detail</Button>

                </CardBody>
                <Modal isOpen={this.state.modal} >
                    <ModalBody>
                        <CreateInvoiceDetails
                            invoiceId={this.props.invoiceId}
                            handleModal={this.handleModal}
                            refetch={this.props.data.refetch}
                        />
                    </ModalBody>
                </Modal>
            </Card >
        )
    }
}


export default compose(
    graphql(fetchInvoiceDetailsByInvoiceId, { options: (props) => { return { variables: { id: props.invoiceId } } } }),
)(InvoiceDetails)

// export default Invoice