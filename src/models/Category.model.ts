import {Document, Schema, model, Model} from "mongoose"
import { config } from "../config"

export interface ICategory extends Document {
    name: string
    parent_id: ICategory["_id"]
}


export const CategorySchema = new Schema({
    name: {type: String, trim: true, required: true, unique: true},
    parent_id: {type: Schema.Types.ObjectId, ref: config.database.SchemaName_Category},
}, {timestamps: true})

export const Category: Model<ICategory> = model<ICategory>(config.database.SchemaName_Category, CategorySchema)
