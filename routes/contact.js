const express = require("express")
const Contact = require("../Model/contact")
const router = express.Router()

router.get('/test',(req,res) =>{
    res.send('hello')
})

// add contact

router.post('/add', async(req,res)=>{
    try {
        const {name,email,phone} = req.body ;
        const newContact = new Contact ({name,email,phone})
        await newContact.save();
        res.status(200).send({msg : 'contact added successfully' , newContact})
    } catch (error) {
        res.status(400).send({msg : 'can not add this contact'})
    }
})


router.get('/all-user' , async(req,res)=>{
    try {
        const listContacts = await Contact.find();
        res.status(200).send({msg : 'contactlist' ,listContacts })
    } catch (error) {
        res.status(400).send({msg : 'can not get contactlist'  })
    }
})

router.delete('/:_id' , async(req,res) =>{
    try {
        const {_id} = req.params;
        await Contact.findOneAndDelete({_id})
        res.status(200).send({msg:'contact deleted'})
    } catch (error) {
        res.status(400).send({msg: 'can not find this contact'})
    }
})

router.put('/:_id' , async(req,res) => {
    try {
        const {_id} = req.params ;
        const updatedUser = await Contact.updateOne({_id} , {$set:{...req.body}})
        res.status(200).send({msg: 'contact updated'})
    } catch (error) {
        res.status(400).send({msg: 'can not update this contact'})
    }
})


router.get('/:_id' , async(req,res)=>{
    try {
        const contactToGet = await Contact.findOne({_id:req.params._id})
        res.status(200).send({msg : 'contact getted', contactToGet})
    } catch (error) {
        res.status(400).send({msg: 'can not find this contact'})
    }
})

module.exports = router ;