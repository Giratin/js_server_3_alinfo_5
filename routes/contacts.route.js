const router = require("express").Router();
const { Contact } = require("../models/contact.model");
const { verifyObjectId, verifyToken } = require("../middlewares");

router.get("/", (req, res) => {
    //Show Contact list
    Contact.find((error, contacts) => {
        if (!error) {
            res.render('form', { contacts, title: "Contact list" })
        }
    })
});

//express-validator
//Joi



router.route("/contacts")
    .get((req, res) => {
        //Show Contact's Form
        res.render("create")
    })
    .post(async (req, res) => {
        //Create New Contact
        // fullName , phone

        console.log({ ...req.body });
        const newContact = new Contact({ ...req.body });

        try {
            await newContact.save();
            res.status(200).json(newContact)
        } catch (error) {
            res.status(400).json({ error })
        }
    });


//multer :: file upload
//passport

router.route("/contacts/:_id")
    .get(verifyToken, verifyObjectId, (req, res) => {
        const { _id } = req.params;
        Contact.findById(_id, (error, doc) => {
            if (!error) {
                return res.json({ doc, text: req.text, user: req.user })
            }
            res.status(404).json({ error })
        })
    })
    .delete(verifyObjectId, async (req, res) => {
        const { _id } = req.params;
        const contact = await Contact.findOneAndDelete({ _id });
        if (contact) {
            return res.status(202).json(contact);
        }
        res.status(404).send("Contact not found")
    })
    .put(verifyObjectId, async (req, res) => {
        const { _id } = req.params;
        let contact = await Contact.findOne({ _id });
        if(!contact){
            return res.status(404).send("Contact not found");
        }

        try {
            contact.fullName = req.body.fullName;
            contact.phone = req.body.phone;
            
            
            await contact.save();
            return res.status(200).json(contact)
        } catch (error) {

            res.status(404).send("Contact update Error")
        }

    })
module.exports = router;