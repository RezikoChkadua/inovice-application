import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from "graphql";


const invoiceDetailsType = new GraphQLObjectType({
    name: 'invoiceDetailsType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
        total: { type: GraphQLInt },
        userId: { type: GraphQLID },
        invoiceId: { type: GraphQLID }
    })
})

export default invoiceDetailsType;