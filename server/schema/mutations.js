const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql


import invoiceType from "./types/invoiceType";
import invoiceDetailsType from "./types/invoiceDetailsType";
import userType from "./types/userType";

import Invoice from "../models/invoice";
import InvoiceDetails from "../models/invoiceDetails";
import User from "../models/user";

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve() { }
        },
        signup: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
                created: { type: GraphQLString },
                activated: { type: GraphQLString }
            },
            resolve(parentValue, { age, username, email, created, activated }) {
                return (new User({ age, username, email, created, activated })).save()
            }
        },
        createInvoice: {
            type: invoiceType,
            args: {
                name: { type: GraphQLString },
                date: { type: GraphQLString },
                created: { type: GraphQLString },
                modified: { type: GraphQLString },
                description: { type: GraphQLString },
                contactName: { type: GraphQLString },
                address: { type: GraphQLString },
                userId: { type: GraphQLID },
            },
            resolve(parentValue, { name, date, created, modified, description, contactName, address, userId }) {
                return (new Invoice({ name, date, created, modified, description, contactName, address, userId })).save()
            }
        },
        editInvoice: {
            type: invoiceType,
            args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                date: { type: GraphQLString },
                created: { type: GraphQLString },
                modified: { type: GraphQLString },
                description: { type: GraphQLString },
                contactName: { type: GraphQLString },
                address: { type: GraphQLString },
                userId: { type: GraphQLID },
            },
            resolve(parentValue, { _id, name, date, created, modified, description, contactName, address, userId }) {
                return Invoice.findByIdAndUpdate(_id, { name, date, created, modified, description, contactName, address, userId })
            }
        },
        deleteInvoice: {
            type: invoiceType,
            args: {
                _id: { type: GraphQLID },
            },
            resolve(parentValue, { _id }) {
                return Invoice.find({ _id }).remove()
            }
        },
        createInvoiceDetails: {
            type: invoiceDetailsType,
            args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                price: { type: GraphQLInt },
                total: { type: GraphQLInt },
                userId: { type: GraphQLID },
                invoiceId: { type: GraphQLID }
            },
            resolve(parentValue, { _id, name, description, quantity, price, total, userId, invoiceId }) {
                return (new InvoiceDetails({ _id, name, description, quantity, price, total, userId, invoiceId })).save()
            }
        },
        editInvoiceDetails: {
            type: invoiceDetailsType,
            args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                price: { type: GraphQLInt },
                total: { type: GraphQLInt },
                userId: { type: GraphQLID },
                invoiceId: { type: GraphQLID }
            },
            resolve(parentValue, { _id, name, description, quantity, price, total, userId, invoiceId }) {
                return InvoiceDetails.findOneAndUpdate(_id, { name, description, quantity, price, total, userId, invoiceId }).save()
            }
        },
        deleteInvoiceDetails: {
            type: invoiceDetailsType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve({ _id, }) {
                return InvoiceDetails.find({ _id }).remove()
            }
        }
    }
})



export default mutations

