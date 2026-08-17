const {ImageKit}=require('@imagekit/nodejs');
 require('dotenv').config();
const imagekit = new ImageKit({
 
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   
});

async function uploadImage(buffer) {
    try {
        const response = await imagekit.files.upload({
            file: buffer.toString('base64'), // The file buffer from multer
            fileName: buffer.originalname, // The original name of the uploaded file
        });
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }           }

    module.exports = uploadImage;