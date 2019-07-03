const User = require('../models/User.model')
const Joi = require('joi')

module.exports = {
    user_login_post: function (req, res, next) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(3).max(30).required(),
        }).unknown()

        const result = schema.validate(req.body)

        if (result.error) {
            console.log(result.error)
            res.json({
                message: 'Username or password invalid',
                success: false
            })
        } else {
            const username = req.body.username.toLowerCase()
            const password = req.body.password
            User.findOne({username: username}).then(user => {
                if (user.password === password) {
                    res.json({
                        message: 'Login success',
                        success: true,
                        data: user.toObject()
                    })
                } else {
                    res.json({
                        message: 'Username or password invalid',
                        success: false
                    })
                }
            }).catch(error => {
                console.log(error)
                res.json({
                    message: 'Username or password invalid',
                    // error: error,
                    success: false
                })
            })
        }
    },

    user_register_post: function (req, res, next) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(3).max(30).required(),
            name: Joi.string().min(2).required(),
            avatar: Joi.string(),
            address: Joi.string(),
            phone: Joi.number().min(10).max(11),
            email: Joi.string().email(),
            birthday: Joi.number(),
        })

        const result = schema.validate(req.body)

        if (result.error) {
            console.log(result.error)
            res.json({
                message: 'Register params invalid',
                success: false
            })
        } else {
            const user = req.body
            user.username = user.username.toLowerCase()
            if (user.birthday) {
                user.birthday = new Date(user.birthday)
            }
            new User(user).save().then(user => {
                res.json({
                    message: 'Register success',
                    success: true,
                    data: user.toObject()
                })
            }).catch(error => {
                console.log(error)
                res.json({
                    message: 'Register fail',
                    // error: error,
                    success: false
                })
            })
        }
    }
}
