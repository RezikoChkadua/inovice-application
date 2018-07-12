import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;
const invoiceSchema = new Schema({
    id: Number,
    name: String,
    date: Date,
    created: String,
    modified: String,
    description: String,
    contactName: String,
    address: String,
    userId: ObjectId,
    invoiceDetails: String
})

export default mongoose.model('Invoice', invoiceSchema)