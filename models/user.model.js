const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true
        },
        age: Number
    },
    {
        timestamps: true // manage createdAt And updatedAt
    }
);
//category ==> categories
//user ==> users
const User = mongoose.model('user', userSchema);

// module.exports.User = User
// module.exports = { User: User }
module.exports = { User }


/*

    {
        _id: ObjectId(+**++),
        firstName : "",
        lastName: "",
        email: "",
        age: 0,
        __v: 0,
        createAt: Date,
        updatedAt: Date
    }

*/
