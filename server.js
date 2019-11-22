const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const server = express();
server.use(cors());
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
  // const file = req.files;
  //console.log(req);
  // console.log(file);
  // console.log(req.body.albums);
  const mediaData = JSON.parse(req.body.media);
  // console.log(mediaData);
  // console.log(mediaData[0].meta);

  const media = mediaData.map(e => {
    e.file = req.files[e.title]
    return e;
  });

  console.log(req.body.albums);
  console.log(media);

  // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({ message: 'something broke' });
  //   }

  //   res.status(201).json({
  //     success: true,
  //     result
  //   });
  // });

  res.status(201).json({ message: 'received' });
});

module.exports = server;