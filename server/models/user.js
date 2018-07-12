import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    age: Number,
    password: String,
    username: String,
    email: String,
    created: String,
    activated: String
})

export default mongoose.model('User', userSchema)