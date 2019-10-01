const MongoClient = require('mongodb').MongoClient;

const usersSchema = new.MongoClient.usersSchema({
    firstName: {
        type:String,
        required: "First Name is required",
        minlength:4,
        maxlength:150
    },

    lastName: {
        type:String,
        required: "Last Name is required",
        minlength:4,
        maxlength:150
    }
})
module.exports = MongoClient.model("Users", usersSchema);