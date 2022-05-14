const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/workshop_3alinfo3_mongo_1', (error) => {
    if (error) {
        console.log(error);
        return exit(-1);
    }
    console.log("database connected");
});

var usersRoute = require("./routes/users.route");

app.use("/users", usersRoute);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})