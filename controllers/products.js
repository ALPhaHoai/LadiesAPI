const Product = require('../models/Product.model')
const Joi = require('joi')
const MAX_ITEM_PER_PAGE = 50
const DEFAULT_ITEM_PER_PAGE = 20
const {handleError} = require('./utils')

module.exports = {
    products_get: function (req, res, next) {
        const schema = Joi.object().keys({
            limit: Joi.number().min(1).max(MAX_ITEM_PER_PAGE),
        }).unknown()

        const result = schema.validate(req.body)

        if (result.error) {
            console.log(result.error)
            res.json({
                message: 'Request params invalid',
                success: false
            })
        } else {
            let limit = req.body.limit || DEFAULT_ITEM_PER_PAGE
            limit = parseInt(limit)

            Product.find().limit(limit).then(product => {
                res.json({
                    message: 'Request success',
                    success: true,
                    data: product
                })
            }).catch(error => {
                handleError(error, res)
            })
        }
    },

    product_post: function (req, res, next) {
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
                message: 'Request params invalid',
                success: false
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
                    message: 'Request success',
                    success: true,
                    data: product.toObject({
                        transform: (doc, ret, options) => {
                            delete ret.__v
                        }
                    })
                })
            }).catch(error => {
                handleError(error, res)
            })
        }
    }
}
