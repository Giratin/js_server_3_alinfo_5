const { Product } = require("../models/product.model");
const fs = require("fs");

module.exports = {
    showCreate: (req, res) => {
        res.render("create");
    },
    createProduct: async (req, res) => {
        const product = new Product({ ...req.body });
        if (req.file) {
            product.image = req.file.filename;
        }

        await product.save();
        res.redirect("/products")
    },
    showAllProducts: async (req, res) => {
        Product.find()
            .then((products) => {
                res.render("list", { title: "Product List", products })
            }).catch((exc) => {
                res.render("error");
            });
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        if (product.image) {
            fs.rm(`./public/images/${product.image}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('image deleted');
                }
            });
        }

        await Product.remove({ _id: id });
        res.redirect("/products");
    },
    showDetails: (req, res) => {
        const { id } = req.params;
        Product.findById(id, (error, product) => {
            if (!error) {
                console.log(product);
                return res.render("show", { product })
            }
            res.status(404).json({ error: "product not found" });
        });
    },
    showUpdate: (req, res) => {
        const { id } = req.params;
        Product.findById(id, (error, product) => {
            if (!error) {
                return res.render("update", { product })
            }
            res.status(404).json({ error: "product not found" });
        });
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).send("not found");
        }

        if(req.file){
            //supprimer l'ancienne image
            fs.rm(`./public/images/${product.image}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('image deleted');
                }
            });
            //affecter le nouveau nom de la nouvelle image au produit
            product.image = req.file.filename;
        }
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;

        await product.save();
        res.redirect("/products");
    }
} 