const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/upload/'});
const CheckAuth = require('../../middleware/check-auth');
const productController = require("../../controllers/product");
router.get('/', CheckAuth,productController.get_all_product);

// router.post('/', (req, res, next) => {
//     res.status(200).json({
//         message: "hadling get request to /products"
//     })
// });
router.get('/:productId',CheckAuth,productController.get_product_by_id)
router.post('/', CheckAuth ,upload.single('productImage'),productController.post_data)
router.patch('/:productId', CheckAuth,productController.update_data)
router.delete('/:productId', CheckAuth,productController.delete_data)

module.exports = router;
