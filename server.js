//The proxy server for getting the a successful uload to api.


const express = require('express');
const request = require('request');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); // Initialize multer without disk storage

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy route
app.post('/proxy', upload.single('image'), (req, res) => {
    const apiKey = ''; // API KEY for fivemange
    const url = `https://api.fivemanage.com/api/image?apiKey=${apiKey}`;

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Prepare form data
    const formData = {
        image: {
            value: req.file.buffer,
            options: {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        },
        metadata: req.body.metadata // Add metadata if present
    };
    console.log(req.file); // Log det uploadede billede
    console.log(req.body); // Log metadata


    // Send POST request to the external API
    request.post({ url, formData, headers: { 'Accept': 'application/json' } }, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
});

app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});
