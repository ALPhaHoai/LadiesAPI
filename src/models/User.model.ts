import {Document, Schema, model, Model} from "mongoose"
import bcrypt from "bcrypt"
import {config} from "../config"

export interface IUser extends Document {
    username: string
    password: string
    name: string
    avatar: string
    address: number
    phone: string
    email: string
    birthday: string
    history: {
        type: string
        comment_id: string
        last_update: Date
        product_id: string
    }
    comparePassword: comparePasswordFunction,
    tokens: AuthToken[],
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void

export class AuthToken{
    token: string
    kind: string

    constructor(token: string, kind: string) {
        this.token = token
        this.kind = kind
    }
}

export const UserSchema = new Schema({
    username: {type: String, trim: true, required: true, unique: true, lowercase: true, min: 3, max: 30},
    password: {type: String, required: true, min: 3, max: 30},
    name: {type: String, trim: true, required: true, min: 2},
    avatar: {type: String, trim: true},
    address: {type: String, trim: true},
    phone: {type: String, trim: true, unique: true, sparse: true, index: true},
    email: {type: String, trim: true, unique: true, lowercase: true, sparse: true, index: true},
    birthday: {type: Date},
    history: [{
        type: {type: String, enum: ["Upvote", "Downvote", "View", "Comment"], required: true},
        comment_id: {type: Schema.Types.ObjectId, ref: config.database.SchemaName_Comment},
        last_update: {type: Date, default: Date.now()},
        product_id: {type: Schema.Types.ObjectId, ref: config.database.SchemaName_Product, required: true},
    }],
    tokens: [{
        token: {type: String},
        kind: {type: String},
    }],
}, {timestamps: true})

/**
 * Password hash middleware.
 */
UserSchema.pre<IUser>("save", function save(next) {
    const user = this
    if (!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err: Error, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

const comparePassword : comparePasswordFunction = function (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch)
    })
}

UserSchema.methods.comparePassword = comparePassword

export const User: Model<IUser> = model<IUser>(config.database.SchemaName_User, UserSchema)