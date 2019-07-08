import {Document, Schema, model, Model} from "mongoose"
import {ICategory, CategorySchema} from './Category.model'
import {IComment, CommentSchema} from './Comment.model'
import {TagSchema} from './Tag.model'
import {IUser, UserSchema} from "./User.model"


export interface IProduct extends Document {
    name: string
    price: number
    description: string
    image: string
    image_small: string
    link: string
    categories: [ICategory]
    comments: [IComment]
    similar_products: [{product_id: IProduct['_id']}]
    tags: [string]
    statistics: {
        upvote: number
        downvote: number
        view: number
    }

}

export const ProductSchema = new Schema({
    name: {type: String, trim: true, required: true, min: 2, max: 255, unique: true},
    price: {type: Number, required: true, min: 0},
    description: {type: String, trim: true},
    image: {type: String, trim: true},
    image_small: {type: String, trim: true},
    link: {type: String, trim: true},
    categories: [CategorySchema],
    comments: [CommentSchema],
    similar_products: [{
        product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
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
export const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema)
