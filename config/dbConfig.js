const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

const connectTODatabase = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("mongoDB successfully connected")
    }catch(e){
        console.log(`error while connecting mongoDB ${e}`)
        process.exit(1)
    }
}

module.exports = connectTODatabase