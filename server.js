const express = require('express');
const fileUpload = require('express-fileupload');
const server = express();
server.use(express.json());
server.use(fileUpload({
  useTempFiles: true
}));

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbl8pi1ms',
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

server.get('/', (req, res) => {
  res.status(200).json({ message: 'hi' });
});

server.post('/upload', (req, res) => {
  const file = req.files.image;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'something broke' });
    }

    res.status(201).json({
      success: true,
      result
    });
  });

  //res.status(201).json({ message: 'received' });
});

module.exports = server;