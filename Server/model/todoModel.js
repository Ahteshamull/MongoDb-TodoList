const { default: mongoose } = require("mongoose")
const { Schema } = require("mongoose")
const createUser = new Schema({
    name: {
        type:String
    }
  
})
module.exports = mongoose.model("User2",createUser)