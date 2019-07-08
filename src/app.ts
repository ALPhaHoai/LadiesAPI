require("dotenv").config()
import express from "express"
import {join} from "path"

import cookieParser from "cookie-parser"
import logger from "morgan"
import connectDatabase from "./connect-database"
import * as userController from "./controllers/users"
import * as productController from "./controllers/products"
import * as categoryController from "./controllers/category"

const app = express()

let mongodbUri = process.env.MONGODB_URI
if (mongodbUri === undefined) {
    console.log("Config mongodb url before runing this app")
    process.exit(1)
}
connectDatabase(mongodbUri)


app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(join(__dirname, "public")))


// routers
app.post("/login", userController.user_login_post)
app.post("/register", userController.user_register_post)
app.get("/product", productController.products_get)
app.post("/product", productController.product_post)
app.get("/categories", categoryController.categories_get)
app.post("/categories", categoryController.categories_post)
app.put("/categories", categoryController.categories_put)

export default app
