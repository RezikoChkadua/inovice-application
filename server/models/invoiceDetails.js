import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const invoiceDetailsSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    total: Number,
    userId: ObjectId,
    invoiceId: ObjectId
})

export default mongoose.model('InvoiceDetails', invoiceDetailsSchema)