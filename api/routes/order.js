const express = require('express');

const router = express.Router();
// handle incomming get requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched'
    })
})
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'orders were created'
    })
})
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'orders deleted',
        orderId: req.params.orderId
    })
})

module.exports = router;