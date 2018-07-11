import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from "graphql";

import invoiceType from "./invoiceType";


const userType = new GraphQLObjectType({
    name: 'userType',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        created: { type: GraphQLString },
        activated: { type: GraphQLString },
        invoices: {
            type: new GraphQLList(invoiceType),
            resolve(parent, args) {
                return Invoices.filter(x => x.id === parent.userId)
            }
        }

    })
})

export default userType;