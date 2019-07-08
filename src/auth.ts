import {NextFunction, Request, Response} from "express"
import {config} from "./config"
import jwt from "jsonwebtoken"

export const tokenVerify = function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, config.auth.secret, function (err, payload) {
            console.log(payload)
            if (err) {
                // console.log(err)
                res.json({
                    status: 2,
                    message: "Authentication error",
                })
            } else next()
        })
    } catch (e) {
        res.json({
            status: 2,
            message: "Authentication error",
        })
    }
}