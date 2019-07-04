const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const UserSchema = new Schema({
    username: {type: String, trim: true, required: true, unique: true, lowercase: true, min: 3, max: 30,},
    password: {type: String, required: true, min: 3, max: 30},
    name: {type: String, trim: true, required: true, min: 2},
    avatar: {type: String, trim: true},
    address: {type: String, trim: true},
    phone: {type: String, trim: true, unique: true, sparse: true, index: true},
    email: {type: String, trim: true, unique: true, lowercase: true, sparse: true, index: true},
    birthday: {type: Date},
    history: [{
        type: {type: String, enum: ['Upvote', 'Downvote', 'View', 'Comment'], required: true},
        comment_id: {type: Schema.Types.ObjectId, ref: process.env.SchemaName_Comment},
        last_update: {type: Date, default: Date.now()},
        product_id: {type: Schema.Types.ObjectId, ref: process.env.SchemaName_Product, required: true}
    }]
}, {timestamps: true})

module.exports = model(process.env.SchemaName_User, UserSchema)