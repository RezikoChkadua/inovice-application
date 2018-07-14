import gql from 'graphql-tag'

export default gql`
    query getInvoicesByUserId($id: ID){
            getInvoicesByUserId(id:$id){
            _id
            name
            date
            description
            contactName
            address
            userId       

  }
}    
`;
