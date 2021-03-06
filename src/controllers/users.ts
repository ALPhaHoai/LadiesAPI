import {User, IUser, AuthToken} from "../models/User.model"
import Joi from "joi"
import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {config} from "../config"

export const user_login_post = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
    }).unknown()

    const result = schema.validate(req.body)

    if (result.error) {
        console.log(result.error)
        res.json({
            message: "Username or password invalid",
            success: false,
        })
    } else {
        const username = req.body.username.toLowerCase()
        const password = req.body.password
        User.findOne({username: username}).then(user => {
            if (user) {
                user.comparePassword(password, (err: any, isMatch: boolean) => {
                    if (isMatch) {
                        jwt.sign({username: username}, config.auth.secret, {expiresIn: "12h"}, function (err: any, token: string) {
                            if (!err) {
                                user.tokens.push(new AuthToken(token, "user"))//after this line, its auto create __id field for each authToken
                                console.log("User Tokens: ", user.tokens)
                                if (config.auth.saveTokensToDatabase) {
                                    user.save().then(newUser => {
                                        res.json({
                                            message: "Login success",
                                            success: true,
                                            data: newUser.toObject({
                                                transform: (doc: IUser, ret: IUser, options: object) => {
                                                    delete ret.password
                                                    delete ret.__v
                                                },
                                            }),
                                        })
                                    }).catch(err => {
                                        console.log(err)
                                        res.json({
                                            message: "Can not login",//Cannot create a jsonwebtoken
                                            success: false,
                                        })
                                    })
                                } else {
                                    res.json({
                                        message: "Login success",
                                        success: true,
                                        data: user.toObject({
                                            transform: (doc: IUser, ret: IUser, options: object) => {
                                                delete ret.password
                                                delete ret.__v
                                            },
                                        }),
                                    })
                                }
                            } else {
                                console.log(err)
                                res.json({
                                    message: "Can not login",//Cannot create a jsonwebtoken
                                    success: false,
                                })
                            }
                        })
                    } else {
                        res.json({
                            message: "Username or password invalid",
                            success: false,
                        })
                    }
                })
            } else {
                res.json({
                    message: "Username or password invalid",
                    success: false,
                })
            }
        }).catch(error => {
            console.log(error)
            res.json({
                message: "Username or password invalid",
                // error: error.message,
                success: false,
            })
        })
    }
}

export const user_register_post = function (req: Request, res: Response, next: NextFunction) {
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
            message: "Register params invalid",
            success: false,
        })
    } else {
        const user = req.body
        user.username = user.username.toLowerCase()
        if (user.birthday) {
            user.birthday = new Date(user.birthday)
        }
        new User(user).save().then(user => {
            res.json({
                message: "Register success",
                success: true,
                data: user.toObject({
                    transform: (doc: IUser, ret: IUser, options: object) => {
                        delete ret.password
                        delete ret.__v
                    },
                }),
            })
        }).catch(error => {
            console.log(error)
            res.json({
                message: "Register fail",
                // error: error.message,
                success: false,
            })
        })
    }
}
