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
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        created: { type: GraphQLString },
        activated: { type: GraphQLString },
    })
})

export default userType;