import mongoose from "mongoose";
const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    name: String,
    date: Date,
    created: String,
    modified: String,
    description: String,
    contactName: String,
    address: String,
    userId: Number,
    invoiceDetails: String
})

export default mongoose.model('Invoice', invoiceSchema)