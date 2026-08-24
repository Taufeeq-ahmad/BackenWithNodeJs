//to create a server

const express = require('express');
const noteModel = require('./models/note.model');
const postModel = require('./models/post.model');
const userModel=require('./models/user.model');
const authRoute=require('./route/auth.route');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadImage = require('./service/storage.service');
const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Set the destination folder for uploaded files
//middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use(cookieParser());




   app.post('/create-post', upload.single('image'), async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);

    const result = await uploadImage(req.file);
    console.log('Image upload result:', result);

    const post=await postModel.create({
        image: result.url,
        caption: data.caption
    });
    // const data = req.body;

    // const note = await noteModel.create({
    //     title: data.title,
    //     content: data.content
    // });

    res.status(201).json({
        message: 'Post Created successfully',
        data: post
    });
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find();
    console.log('Sending posts:', posts);
    res.status(200).json({
        message: 'Posts retrieved successfully',
        data: posts
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

// Return a useful response when a client sends invalid JSON.
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            message: 'Invalid JSON request body'
        });
    }

    next(error);
});

module.exports = app;