const router = require('express').Router()
const multer = require('multer');
const Product = require('../models/productModel')
const { verifyToken } = require('./verifyToken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create unique filenames
    }
});

const upload = multer({ storage: storage });

// CREATE PRODUCT
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => file.path) : req.body.images;
        const productData = {
            ...req.body,
            images,
        };

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.json(products)
    } catch (err) {
        res.json(err)
    }
})

// GET A PRODUCT
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: 'seller',
            select: 'fullName reviews email phoneNumber'
        })
        res.json(product)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router