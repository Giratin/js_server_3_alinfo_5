const { User } = require("../models/user.model");

module.exports = {
    createUser: (req, res) => {
        const { firstName, lastName, email, age } = req.body;

        const user = new User({ firstName, lastName, email, age });
        user.save((error, doc) => {
            if (error) {
                return res.status(400).json(error);
                /*
                    {
                        "index": 0,
                        "code": 11000,
                        "keyPattern": {
                            "email": 1
                        },
                        "keyValue": {
                            "email": "test.1@esprit.tn"
                        }
                }*/
            }
            res.json(doc);
            /*
                {
                    "firstName": "test fn",
                    "lastName": "lastName test",
                    "email": "test.1@esprit.tn",
                    "age": 12,
                    "_id": "627f87346ded304b1aa81477",
                    "createdAt": "2022-05-14T10:40:52.250Z",
                    "updatedAt": "2022-05-14T10:40:52.250Z",
                    "__v": 0
                }
            */
        });
    },
    getAll: async (req, res) => {
        //await 
        const users = await User.find();
        res.json(users);

        // User.find((error,docs)=>{
        //     if(!error){
        //         return res.json(docs)
        //     }
        //     res.status(404).json(error)
        // })
    },
    createUserAsync: async (req, res) => {
        const { firstName, lastName, email, age } = req.body;
        const user = new User({ firstName, lastName, email, age });
        // try {
        //     await user.save();
        //     res.json(user);
        // } catch (error) {
        //     res.json({ error });
        // }

        await user.save();
        res.json(user);
    },
    deleteUserById: (req, res) => {
        const { id } = req.params;


    },
    getUserById: (req, res) => {
        const { id } = req.params;

    },
    updateUser: (req, res) => {
        const { id } = req.params;


    },
}


/// C:/Program Files/Mongodb/server/5.0/bin/ 
// mongo.exe / mongod.exe --dbpath = C:/Data/ --fork ==> lancer mongod comme étant un processus