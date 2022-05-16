const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        fullName: {
            type: String
        },
        phone: {
            type: Number,
            required: true
        }
    }
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = { Contact }