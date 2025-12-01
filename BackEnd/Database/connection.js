const mongoose = require('mongoose')

function RunServer(){
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('mongoDB connected!!')
    } catch (error) {
        console.log('not connected')
    }
}

module.exports = RunServer;