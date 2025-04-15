const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { getContent, createOrUpdateContent } = require('../controllers/contentController');

// Multer: simpan ke folder sementara
const upload = multer({
  dest: 'temp/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);
    }
  }
});

router.get('/', getContent);

router.post('/', upload.array('images', 3), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Path ke direktori frontend
    const frontendUploadsDir = path.join(__dirname, '../../frontend/public/uploads/');
    if (!fs.existsSync(frontendUploadsDir)) fs.mkdirSync(frontendUploadsDir, { recursive: true });

    const resizedImages = [];
    for (let file of req.files) {
      const filename = `${Date.now()}-${file.originalname}`;
      const outputFile = path.join(frontendUploadsDir, filename);

      await sharp(file.path)
        .resize({ width: 800 })
        .toFile(outputFile);

      fs.unlinkSync(file.path); // hapus file sementara
      resizedImages.push(`/uploads/${filename}`); // path relatif untuk diakses di frontend
    }

    // Kirim path gambar ke controller
    req.body.imagePaths = resizedImages;
    createOrUpdateContent(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
