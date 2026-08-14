//to create a server

const express = require('express');
const app = express();

//middleware
app.use(express.json());

const notes=[];

app.post('/notes', (req, res) => {

    const note = req.body;
    console.log('Received note:', note);
    notes.push(note);
    res.status(200).json({
        message: 'Notes added successfully',
        data: notes
       
    });
});

app.get('/notes', (req, res) => {
    res.json(notes);
    console.log('Sending notes:', notes);
    res.status(200).json({
        message: 'Notes retrieved successfully',
       
    });

    
});

app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;  
    if(index<0 ||index>notes.length){
        res.status(400).json({
            message: 'Invalid index'
        });
        return;
    } 
    notes.splice(index,1);
    res.status(200).json({
        message: 'Note deleted successfully',
        data: notes
    });
});


module.exports = app;