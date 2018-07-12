import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,

} from "graphql";

import invoiceDetailsType from "./invoiceDetailsType";
import invoiceDetails from "../../models/invoiceDetails";
const invoiceType = new GraphQLObjectType({
    name: 'invoiceType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        created: { type: GraphQLString },
        modified: { type: GraphQLString },
        description: { type: GraphQLString },
        contactName: { type: GraphQLString },
        address: { type: GraphQLString },
        userId: { type: GraphQLID }
    })
})

export default invoiceType;