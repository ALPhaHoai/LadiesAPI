const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const TagSchema = new Schema({
    name: {type: String, trim: true, required: true, unique: true},
}, {timestamps: true})

module.exports.default = model(process.env.SchemaName_Tag, TagSchema)
module.exports.TagSchema = TagSchema