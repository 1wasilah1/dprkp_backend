const express = require('express');
const router = express.Router();
const controller = require('../controllers/strukturOrganisasiController');

// POST
router.post('/', controller.createStrukturOrganisasi);

// GET all
router.get('/', controller.getAllStrukturOrganisasi);

// GET by ID
router.get('/:id', controller.getStrukturOrganisasiById);

// PUT by ID
router.put('/:id', controller.updateStrukturOrganisasi);

// DELETE by ID
router.delete('/:id', controller.deleteStrukturOrganisasi);

module.exports = router;
