const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "hadling get request to /products"
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "hadling get request to /products"
    })
});
// router.get('/:productId', (req, res, next) => {
//     const id = req.params.productId;
//     if (id == "specical") {
//         res.status(200).json({
//             message: 'you discovered the special',
//             id: id
//         });
//     } else {
//         res.status(200).json({
//             message: 'you pas an id'
//         })
//     }
// })
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'update Product'
    })
})
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'delete Product'
    })
})

module.exports = router;