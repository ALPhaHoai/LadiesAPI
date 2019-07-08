import {Category, ICategory} from "../models/Category.model"
const ObjectId = require("mongoose").Types.ObjectId
import Joi from "joi"
import {config} from "../config"
import {handleError} from "./utils"
import {Request, Response, NextFunction} from "express"


export const categories_get = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
        limit: Joi.number().min(1).max(config.MAX_ITEM_PER_PAGE),
    }).unknown()

    const result = schema.validate(req.body)

    if (result.error) {
        console.log(result.error)
        res.json({
            message: "Request params invalid",
            success: false,
        })
    } else {
        let limit = req.body.limit || config.DEFAULT_ITEM_PER_PAGE
        limit = parseInt(limit)

        Category.find().limit(limit).then(categories => {
            res.json({
                message: "Request success",
                success: true,
                data: categories.map(category => {
                    category.__v = undefined // delete category.__v is not work
                    if (category.parent_id) {
                        category.parent_id = category.parent_id.toString()
                    }
                    return category
                }),
            })
        }).catch(error => {
            handleError(error, res)
        })
    }
}

export const categories_post = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(255).required(),
        parent_id: Joi.string(),
    })

    const result = schema.validate(req.body)

    if (result.error || (req.body.parent_id && !ObjectId.isValid(req.body.parent_id))) {
        console.log(result.error || `Invalid mongodb id: ${req.body.parent_id}`)
        res.json({
            message: "Request params invalid",
            success: false,
        })
    } else {
        Category.create(req.body).then(category => {
            res.json({
                message: "Request success",
                success: true,
                data: category.toObject({
                    transform: (doc: ICategory, ret: ICategory, options: object) => {
                        delete ret.__v
                        if (ret.parent_id) {
                            ret.parent_id = ret.parent_id.toString()
                        }
                    },
                }),
            })
        }).catch(error => {
            handleError(error, res)
        })
    }
}

export const categories_put = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(255).required(),
        parent_id: Joi.string(),
    })

    const result = schema.validate(req.body)

    if (result.error || (req.body.parent_id && !ObjectId.isValid(req.body.parent_id))) {
        console.log(result.error || `Invalid mongodb id: ${req.body.parent_id}`)
        res.json({
            message: "Request params invalid",
            success: false,
        })
    } else {
        Category.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true, new: true}).then(category => {
            res.json({
                message: "Request success",
                success: true,
                data: category.toObject({
                    transform: (doc: ICategory, ret: ICategory, options: object) => {
                        delete ret.__v
                        if (ret.parent_id) {
                            ret.parent_id = ret.parent_id.toString()
                        }
                    },
                }),
            })
        }).catch(error => {
            handleError(error, res)
        })
    }
}