import mongoose from "mongoose"

export default (dbUri: string) => {
    const connect = () => {
        mongoose.connect(dbUri, {useNewUrlParser: true}, err => {
            if (err) {
                console.log("Unable to connect to the mongoDB server. Error:", err)
            } else {
                //HURRAY!! We are connected. :)
                console.log("Connection established to", dbUri)
            }
        })
    }
    mongoose.set("useCreateIndex", true)
    mongoose.set("useFindAndModify", false)
    connect()
    mongoose.connection.on("disconnected", connect)
};
