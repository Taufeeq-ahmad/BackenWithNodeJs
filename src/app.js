//to create a server

const express = require('express');
const noteModel = require('./models/note.model');
const app = express();

//middleware
app.use(express.json());




   app.post('/notes', async (req, res) => {
    const data = req.body;

    const note = await noteModel.create({
        title: data.title,
        content: data.content
    });

    res.status(201).json({
        message: 'Note added successfully',
        data: note
    });
});

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();
    console.log('Sending notes:', notes);
    res.status(200).json({
        message: 'Notes retrieved successfully',
       data: notes
    });

    
});

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await noteModel.findByIdAndDelete(id);
    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }
    res.status(200).json({
        message: 'Note deleted successfully',
        data: note
    });
});
      
app.patch('/notes/:id',async(req,res)=>{
    const id= req.params.id;
    const content = req.body.content;

    const note = await noteModel.findOneAndUpdate({ _id: id }, { content: content }, { new: true });
    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }
    res.status(200).json({

        message: 'Note updated successfully',
        data: note
    });
});

module.exports = app;