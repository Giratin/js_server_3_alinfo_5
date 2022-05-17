const { showAllProducts, showCreate, createProduct, showDetails, deleteProduct, showUpdate, updateProduct } = require("../controllers/product.controller");

const router = require("express").Router();
const path = require("path");
/**
 * @Path /products
 */


router.get("/", showAllProducts);


const multer = require("multer");

const diskStorage = multer.diskStorage({
    filename: (req, file, clb) => {
        const newFileName = +new Date() + path.extname(file.originalname);
        clb(null, newFileName);
    },
    destination: (req, file, clb) => {
        clb(null, "./public/images/");
    }
});

const upload = multer({ storage: diskStorage });


router.route("/add")
    .get(showCreate)
    .post(upload.single("avatar"), createProduct);

router.get("/details/:id", showDetails);
router.get("/delete/:id", deleteProduct);

router.route("/update/:id")
    .get(showUpdate)
    .post(upload.single("avatar"), updateProduct)

module.exports = router;