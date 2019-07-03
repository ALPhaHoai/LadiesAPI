const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const {CategorySchema} = require('./Category.model')
const {CommentSchema} = require('./Comment.model')
const {TagSchema} = require('./Tag.model')

const ProductSchema = new Schema({
    name: {type: String, trim: true, required: true, min: 2, max: 255, unique: true},
    price: {type: Number, required: true, min: 0},
    description: {type: String, trim: true},
    image: {type: String, trim: true},
    image_small: {type: String, trim: true},
    link: {type: String, trim: true},
    categories: [CategorySchema],
    comments: [CommentSchema],
    similar_products: [{
        product_id: {type: Schema.Types.ObjectId, ref: process.env.SchemaName_Product, required: true}
    }],
    // tags: [TagSchema],
    tags: [{type: String, required: true, trim: true}],
    statistics: {
        upvote: {type: Number, default: 0},
        downvote: {type: Number, default: 0},
        view: {type: Number, default: 0},
    }
}, {timestamps: true})


//enum: ['Coffee', 'Tea', 'Water',]

module.exports = model(process.env.SchemaName_Product, ProductSchema)
module.exports.ProductSchema = ProductSchema
