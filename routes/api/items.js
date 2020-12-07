const express = require('express')
const router = express.Router()

//Item model
const Item = require('../../models/Item')

// GET api/items
// dohvata sve predmete
// Public pristup
// -1 u sort je za opadajuci poredak

router.get('/',(req,res)=>{
    Item.find().sort({date:-1}).then(items => res.json(items))
})

// POST api/items
// dodaje novi predmet
// Public pristup
// .then(item => res.json(item)) da ispise u konzoli

router.post('/',(req,res)=>{
    const newItem = new Item({name:req.body.name})
    newItem.save().then(item => res.json(item))
})

// DELETE api/items/:id
// brise predmet po id-u
// Public pristup

router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id).then(item => item.remove().then(()=>res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
})

module.exports = router