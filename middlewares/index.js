const mongoose = require("mongoose");

module.exports = {
    verifyObjectId: (req, res, next) => {
        const { _id } = req.params;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            req.text = "Hello World"
            next();
        } else {
            res.status(401).json({ error: "It's not Instance of ObjectId" })
        }
    },
    verifyToken: (req, res, next) => {
        const { token } = req.headers;
        if(!token){
            return res.status(403).send("Token is required");
        }
        
        if(token != "1"){
            return res.status(401).send("Token is invalid");
        }

        const user = {
            email: "john.doe@esprit.tn",
            role: "user"
        }
        req.user = user;
        next();
    }
}