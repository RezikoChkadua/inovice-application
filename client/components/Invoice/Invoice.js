import React, { Component } from 'react'
import {
    Button, Card, CardBody, Row, Col, Container, ListGroupItem, Collapse,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import moment from 'moment'
import './Invoice.css'
import EditInvoiceDetails from '../../dialogs/EditInvoiceDetails';
class Invoice extends Component {

    constructor() {
        super()
        this.state = {
            detailsCollapse: false,
            editInvoiceDetailsModal: false
        }
    }
    handleDetailsCollapse = () => {
        this.setState({ detailsCollapse: !this.state.detailsCollapse })
    }

    handleEditDetails = () => {

    }

    handleClearDetails = () => {

    }
    handleInvoiceDetailsModal = () => {

        this.setState({ editInvoiceDetailsModal: !this.state.editInvoiceDetailsModal })
    }
    render() {
        const { _id, name, contactName, date, description, address, modified, } = this.props.Invoices
        const { handleEditInvoice, handleInvoiceDelete } = this.props
        return (
            <div>
                <ListGroupItem key={_id} >
                    <Container>
                        <Row className="center-col-verticaly">
                            <Col sm="9" className="flex-end">
                                <Col sm="2">
                                    {name}
                                </Col>
                                <Col sm="2">
                                    {contactName}
                                </Col>
                                <Col sm="2">
                                    {moment(date).format('YYYY-MM-DD')}
                                </Col>
                                <Col sm="2">
                                    {description}
                                </Col>
                                <Col sm="2">
                                    {address}
                                </Col>
                                <Col sm="2">
                                    {modified}
                                </Col>
                            </Col>
                            <Col sm="3" className="flex-end">
                                <div>
                                    <Button color="secondary1,./ " size="sm" active
                                        onClick={() => this.handleDetailsCollapse()}>
                                        details
                                </Button>{' '}

                                    <Button color="info" size="sm" active
                                        onClick={() => handleEditInvoice(event, _id)}>
                                        edit
                                  </Button>{' '}

                                    <Button color="danger" size="sm" active
                                        onClick={() => handleInvoiceDelete(_id)}>
                                        delete
                                </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="margin-top">
                            <Collapse isOpen={this.state.detailsCollapse}>
                                <Card>
                                    <CardBody>
                                        <Container>
                                            <Row>
                                                <Col sm="2">
                                                    name:
                                            </Col>
                                                <Col sm="2">
                                                    quantity:
                                            </Col>
                                                <Col sm="2">
                                                    price:
                                            </Col>
                                                <Col sm="2">
                                                    total:
                                            </Col>
                                            </Row>
                                            <Row className="margin-top">
                                                <Col>
                                                    description:
                                            </Col>
                                            </Row>
                                            <Row className="margin-top">
                                                <Col>
                                                    <Button color="primary" size="sm" active
                                                        onClick={() => this.handleInvoiceDetailsModal(_id)}>
                                                        Ediit
                                                </Button> {" "}
                                                    <Button color="danger" size="sm" active
                                                        onClick={() => this.handleClearDetails(_id)}>
                                                        Clear
                                                </Button>
                                                </Col>
                                            </Row>

                                        </Container>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Row>
                    </Container >
                </ListGroupItem >

                <Modal isOpen={this.state.editInvoiceDetailsModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Invoice Details</ModalHeader>
                    <ModalBody>
                        <EditInvoiceDetails />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mutation = gql`
                editInvoiceDetails(_id: ID,name: String,description: String,quantity: Int,price: Int,total: Int,userId: ID,invoiceId: ID)
`;


export default Invoice