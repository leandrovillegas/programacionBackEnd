const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        const url = 'mongodb+srv://leanv:Casa13579.@backend-coderhouse.zt8gxfh.mongodb.net/test'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.error(error)
    }
   
}
module.exports = connectMongoDB;