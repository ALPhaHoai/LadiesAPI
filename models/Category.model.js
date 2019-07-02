const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const CategorySchema = new Schema({
    name: {  type: String,   trim: true,  required: true },
    parent_id: { type: Schema.Types.ObjectId, ref: process.env.SchemaName_Category  },
}, {timestamps: true})

module.exports.default = model(process.env.SchemaName_Category, CategorySchema)
module.exports.CategorySchema = CategorySchema