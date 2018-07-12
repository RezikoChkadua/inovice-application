import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID
} from "graphql";

import userType from "./types/userType";
import invoiceType from "./types/invoiceType";
import invoiceDetailsType from "./types/invoiceDetailsType";

import Invoice from "../models/invoice";
import User from "../models/user";
import InvoiceDetails from "../models/invoiceDetails";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getInvoices: {
            type: new GraphQLList(invoiceType),
            resolve() {
                return Invoice.find({})
            }
        },
        getInvoiceById: {
            type: invoiceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Invoice.findById(args.id)
            }
        },
        getInvoicesByUserId: {
            type: new GraphQLList(invoiceType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Invoice.find({ 'userId': args.id })
            }
        },
        getInvoiceDetailsByInvoiceId: {
            type: new GraphQLList(invoiceDetailsType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return InvoiceDetails.find({ 'invoiceId': args.id });
            }
        }
    }
})

export default RootQuery;