const express = require('express');
const router = express.Router();
const sopPPIDController = require('../controllers/sop-ppid.controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder tujuan jika belum ada
const targetUploadPath = path.join(__dirname, '../../sop-ppid-frontend/public/doc/upload');
if (!fs.existsSync(targetUploadPath)) {
  fs.mkdirSync(targetUploadPath, { recursive: true });
}

// Simpan ke folder temp dulu
const tempUploadPath = path.join(__dirname, '../temp');
if (!fs.existsSync(tempUploadPath)) {
  fs.mkdirSync(tempUploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempUploadPath),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), sopPPIDController.sopPPIDUploadDokumen);
router.get('/', sopPPIDController.sopPPIDGetAllDokumen);
router.delete('/:id', sopPPIDController.sopPPIDDeleteDokumen);

module.exports = router;
