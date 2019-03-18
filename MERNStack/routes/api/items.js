const express = require('express');
const router = express.Router();

//Item model : get model
const Item = require('../../models/Item');

// get router: sort
router.get('/',(req ,res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});

// post router: add item
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
})

// delete router: delete item
router.delete('/:id',(req, res) => {
    Item.findById(req.params.id)
    .then((item) => {
         item.remove()
         .then(() => res.json(item ,{success: true}))
    })
    .catch(err => res.status(404).json({success: false}));
})

module.exports = router;