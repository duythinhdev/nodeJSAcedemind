const express = require('express');
const router = express.Router();
const Product = require('../../models/products');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find().select('name price _id')
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                product: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "localhost:1999/products/"+ doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// router.post('/', (req, res, next) => {
//     res.status(200).json({
//         message: "hadling get request to /products"
//     })
// });
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select().exec().then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'localhost:1999/products/'
                }
            });
        } else {
            res.status(404).json({message: "No valid entry found for provided ID"})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: error});
    })

})
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "created product successfully",
            createdProduct:{
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: "POST",
                    url: "localhost:1999/products/"+ result._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });

})
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    console.log("updateOps", updateOps)
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.logS(result);
            res.status(200).json({
                message: "Product updated",
                request: {
                    type: "PATH",
                    url: 'localhost:1999/products/'+id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
})
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            type: 'POST',
            url: 'localhost:1999/products/',
            body: { name: "String", price: "Number" }
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    })
})

module.exports = router;
