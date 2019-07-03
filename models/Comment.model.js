const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const CommentSchema = new Schema({
    content: {type: String, required: true, trim: true},
    product_id: {type: Schema.Types.ObjectId, ref: process.env.SchemaName_Product, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: process.env.SchemaName_User, required: true},
    created: { type: Date, default: Date.now() }
}, {timestamps: true})

module.exports = model(process.env.SchemaName_Comment, CommentSchema)
module.exports.CommentSchema = CommentSchema
