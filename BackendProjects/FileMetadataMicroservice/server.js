const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();

const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/meta', upload.single('datafile'), function (req, res) {
  const {originalname, size, mimetype} = req.file;
  return res.send({
    originalname,
    size,
    mimetype
  });
})

app.listen(port, () => {
  console.log(`🚀 Server up and running at port: ${port}`);
})
