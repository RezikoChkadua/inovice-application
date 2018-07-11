import gql from 'graphql-tag'

export default gql`
    {
        getInvoices {
            _id
            name
            date
            created
            modified
            description
            contactName
            address
            userId
        }
    }
`;