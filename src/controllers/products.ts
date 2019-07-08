import {IProduct, Product} from "../models/Product.model"
import Joi from "joi"
import {config} from "../config"
import {handleError} from "./utils"
import {Request, Response, NextFunction} from "express"

export const products_get = function (req: Request, res: Response, next: NextFunction) {
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

        Product.find().limit(limit).then(product => {
            res.json({
                message: "Request success",
                success: true,
                data: product,
            })
        }).catch(error => {
            handleError(error, res)
        })
    }
}

export const product_post = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(255).required(),
        price: Joi.number().min(0),
        description: Joi.string(),
        image: Joi.string(),
        image_small: Joi.string(),
        link: Joi.string(),
        tags: Joi.string(),
    })

    const result = schema.validate(req.body)

    if (result.error) {
        console.log(result.error)
        res.json({
            message: "Request params invalid",
            success: false,
        })
    } else {
        const product = req.body

        if (product.tags && typeof product.tags === "string") {
            product.tags = product.tags.split(",")
            // const tagsArr = product.tags.split(",")
            // if (tagsArr && tagsArr.length > 0) {
            //     product.tags = tagsArr.map(tag => ({"name": tag}));
            // } else {
            //     delete product.tags
            // }
        }

        Product.create(product).then(product => {
            res.json({
                message: "Request success",
                success: true,
                data: product.toObject({
                    transform: (doc: IProduct, ret: IProduct, options: object) => {
                        delete ret.__v
                    },
                }),
            })
        }).catch(error => {
            handleError(error, res)
        })
    }
}
