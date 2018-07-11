import { GraphQLSchema } from "graphql";
import RootQuery from "./RootQuery";
import mutations from "./mutations";

export default new GraphQLSchema({
    query: RootQuery,
    mutation: mutations
})