import {Document, Schema, model, Model} from "mongoose"
import { IProduct } from "./Product.model"
import { IUser } from "./User.model"


export interface IComment extends Document {
    content: string
    product_id: IProduct['_id']
    user_id: IUser['_id']
    created: Date
}

export const CommentSchema = new Schema({
    content: {type: String, required: true, trim: true},
    product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    created: { type: Date, default: Date.now() }
}, {timestamps: true})

export const Comment : Model<IComment> = model<IComment>('Comment', CommentSchema)