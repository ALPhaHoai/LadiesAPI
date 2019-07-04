# LadiesAPI
Nodejs Api for [Ladies Android App](https://github.com/ALPhaHoai/Ladies)

You can try my API in [Heroku](https://ladies-barcode.herokuapp.com)


## 1. User

### Register
#### Request

`POST` register

    {
        "username": "john_doe",
        "password": "123abc",
        "name": "John Doe"
        "avatar": "https://i.imgur.com/bbHO1Dt.png",
        "address": "Moon, Solar",
        "phone": "+841234354546",
        "email": "john.doe@email.com",
        "birthday": 646914805,
    }
    
#### Response
##### Success

    {
        "message": "Register success",
        "success": true,
        "data": {
            "_id": "5d1db58d6aeb380444151d5b",
            "username": "john_doe",
            "name": "John Doe",
            "avatar": "https://i.imgur.com/bbHO1Dt.png",
            "address": "Moon, Solar",
            "phone": "+841234354546",
            "email": "john.doe@email.com",
            "birthday": 646914805,
            "history": [],
            "createdAt": "2019-07-04T08:15:09.967Z",
            "updatedAt": "2019-07-04T08:15:09.967Z",
        }
    }


##### Fail

    {
        "message": "Register params invalid",
        "success": false
    }
    
    
### Login
#### Request
`POST` login
    
    {
        "username": "john_doe",
        "password": "123abc"
    }
#### Response
##### Success

    {
        "message": "Login success",
        "success": true,
        "data": {
            "_id": "5d1db9a9c2ccfd2c0853519d",
            "username": "john_doe",
            "name": "John Doe",
            "history": [],
            "createdAt": "2019-07-04T08:32:41.530Z",
            "updatedAt": "2019-07-04T08:32:41.530Z"
        }
    }
##### Fail

    {
        "message": "Username or password invalid",
        "success": false
    }




## 2. Product

### Get products
#### Request
`GET` products
#### Response
##### Success

    {
        "message": "Request success",
        "success": true,
        "data": [
            {
                "_id": "5d1dbdc4bef6d308245d4c8d",
                "name": "Iphone",
                "price": 123123,
                "description": "my iphone",
                "image": "https://i.imgur.com/K5o7G7b.png",
                "image_small": "https://i.imgur.com/zhHUdbD.png",
                "link": "https://example-product.com/iphone",
                "categories": [],
                "comments": [],
                "similar_products": [],
                "statistics": {
                    "upvote": 0,
                    "downvote": 0,
                    "view": 0
                },
                "tags": [
                    "iphone",
                    "apple",
                    "smartphone"
                ],
                "createdAt": "2019-07-04T08:50:12.763Z",
                "updatedAt": "2019-07-04T08:50:12.763Z",
            },
            {
                "_id": "5d1dbf4427c6fb25c0df7fad",
                "name": "Iphone 2",
                "price": 1231233,
                "description": "my iphone 2",
                "categories": [],
                "comments": [],
                "similar_products": [],
                "statistics": {
                    "upvote": 0,
                    "downvote": 0,
                    "view": 0
                },
                "tags": [],
                "createdAt": "2019-07-04T08:56:36.717Z",
                "updatedAt": "2019-07-04T08:56:36.717Z",
            }
        ]
    }

Empty data

    {
        "message": "Request success",
        "success": true,
        "data": []
    }

##### Fail

### Add new product
#### Request

`POST` products

    {
        "name": "Iphone",
        "price": 123123,
        "description": "my iphone",
        "image": "https://i.imgur.com/K5o7G7b.png",
        "image_small": "https://i.imgur.com/zhHUdbD.png",
        "link": "https://example-product.com/iphone",
        "tags": "iphone, apple, smartphone,
    }
#### Response
##### Success

    {
        "message": "Request success",
        "success": true,
        "data": {
            "_id": "5d1dbdc4bef6d308245d4c8d",
            "name": "Iphone",
            "price": 123123,
            "description": "my iphone",
            "image": "https://i.imgur.com/K5o7G7b.png",
            "image_small": "https://i.imgur.com/zhHUdbD.png",
            "link": "https://example-product.com/iphone",
            "categories": [],
            "comments": [],
            "similar_products": [],
            "statistics": {
                "upvote": 0,
                "downvote": 0,
                "view": 0
            },
            "tags": [
                "iphone",
                "apple",
                "smartphone"
            ],
            "createdAt": "2019-07-04T08:50:12.763Z",
            "updatedAt": "2019-07-04T08:50:12.763Z",
        }
    }
##### Fail

    {
        "message": "Request fail",
        "success": false
    }
