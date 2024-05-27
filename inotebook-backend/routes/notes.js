const express = require('express');
const router=express.Router();
const { validationResult } = require('express-validator');
const {noteValidator} = require('../Validators/noteValidator');
const Note =require('../models/Notes');
const fetchUser = require('../Middleware/fetchUser');
const { route } = require('./auth');


router.get('/fetchNotes',fetchUser, async(req, res)=>{
        try {
            let notes=await Note.find({user:req.user.id});
            return res.status(200).json({message:"All notes are fetched successfully!!",notes});
        } catch (error) {
            return res.status(401).json({message:"Internal Server Error"});

        }
});
router.post('/createNote',fetchUser,noteValidator, async(req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } 
        const note=await Note.create({
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag:req.body.tag
        });
        return res.status(200).json({message:"Note created Successfully!!!",note});
    } catch (error) {
        return res.status(401).json({message:"Internal Server Error"});

    }
});
router.put('/updateNote/:id',fetchUser,noteValidator, async(req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } 
        const { id, title, description, tag } = req.body;        
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(422).json({message: 'Note not found'});
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).json({message: 'Unauthorized Access'});
        }
        const updatedNote= await Note.findByIdAndUpdate(req.params.id, { title, description, tag }, { new: true });
        return res.status(200).json({message:"Note Updated Successfully!!!",updatedNote});
    } catch (error) {
        return res.status(401).json(error.message);

    }
});
router.delete('/noteDelete/:id',fetchUser,async(req,res)=>{
try {
    let{id}=req.params;
    let note=await Note.findById(id);
    if(!note){
        return res.status(422).json({message: 'Note not found'});
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).json({message: 'Unauthorized Access'});
    }
    await Note.findByIdAndDelete(id);
    return res.status(200).json({message:"Note deleted Successfully!!!"});

} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
});


module.exports=router;