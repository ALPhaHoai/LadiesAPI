const isDev = process.env.NODE_ENV === "development"
import express from "express"
import mongoose from "mongoose"

export const handleError = (error: mongoose.Error, res: express.Response) => {
    console.log(error)
    res.json({
        message: "Request fail",
        error: isDev ? error.message : "Error",
        success: false,
    })
}
