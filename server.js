const express = require('express');
const app = express();

// Middleware to parse JSON requests
//app.use(express.json());


// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World! d');
});
app.get("/about", (req, res) => {
    res.send('About Page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});