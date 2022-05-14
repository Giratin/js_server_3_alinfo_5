const { User } = require("../models/user.model");

var users = [
    new User(1, "John", "Doe", "john.doe@esprit.tn", 12)
]

const incrementId = () => {
    if (users.length == 0) {
        return 1;
    }
    return users[users.length - 1].id + 1;
}

const verifyEmail = (email) => {
    //find
    //findIndex
    //filter
    //forEach
    //for
    //while
    const user = users.find((el) => {
        return el.email === email;
    });

    if (!user) {
        return true;
    }
    return false;
}

module.exports = {
    createUser: (req, res) => {
        //HTTP POST
        /* 
            { firstName: "", lastName: "", email : "", age : 0 }
        */
        const { firstName, lastName, email, age } = req.body;

        if (verifyEmail(email)) {
            //create new user 
            const user = new User(incrementId(), firstName, lastName, email, age);
            users.push(user);
            return res.status(202).json(user);
        }

        //cannot create user
        return res.status(400).send("email duplicated");
    },
    getAll: (req, res) => {
        res.status(200).json(users);
    },
    deleteUserById: (req, res) => {
        const { id } = req.params;

        const userIndex = users.findIndex((el) => {
            return el.id == id
        });

        if (userIndex == -1) {
            return res.status(404).send("user not found");
        }

        //splice ==> Array.splice(start, deleteCount)
        users.splice(userIndex, 1);
        res.json(users);
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        const user = users.find((el) => {
            return el.id == id
        });
        if (user) {
            return res.status(200).json(user);
        }
        res.status(404).send("user not found");
    },
    updateUser: (req, res) => {
        const { id } = req.params;

        const userIndex = users.findIndex((el) => {
            return el.id == id
        });

        if (userIndex == -1) {
            return res.status(404).send("user not found");
        }

        users = users.map((el,index)=>{
            if(index == userIndex){
                el = {...el, ...req.body}
            }
            return el;
        });
        res.json(users)
    },
}