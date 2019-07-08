import {Document, Schema, model, Model} from "mongoose"
import { config } from "../config"

export interface ITag extends Document {
    name: string
}

export const TagSchema = new Schema({
    name: {type: String, trim: true, required: true, unique: true},
}, {timestamps: true})


export const Tag: Model<ITag> = model<ITag>(config.database.SchemaName_Tag, TagSchema)
