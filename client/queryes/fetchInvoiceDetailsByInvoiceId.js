import gql from 'graphql-tag'

export default gql`
    query getInvoiceDetailsByInvoiceId($id: ID){
        getInvoiceDetailsByInvoiceId(id: $id) {
            name
            description
            price
            total
            userId
            invoiceId
            quantity
            _id        
       }
    }
`;
