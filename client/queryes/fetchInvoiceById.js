import gql from 'graphql-tag'

export default gql`
    query getInvoiceById($id: ID!){
            getInvoiceById(id: $id) {
                _id
                name
                contactName
                date
                description
                modified
                address
        }
    }
`;
