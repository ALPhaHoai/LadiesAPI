import {Document, Schema, model, Model} from "mongoose"

export interface ITag extends Document {
    name: string
}

export const TagSchema = new Schema({
    name: {type: String, trim: true, required: true, unique: true},
}, {timestamps: true})


export const Tag: Model<ITag> = model<ITag>("Tag", TagSchema)
