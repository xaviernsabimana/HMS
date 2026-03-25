const express = require('express');
const router = express.Router();
const { getAllPatients, createPatient, updatePatient, deletePatient } = require('../controller/patientController');

// Get all patients
router.get('/', getAllPatients);

// Register new patient
router.post('/', createPatient);

// Update patient details
router.put('/:id', updatePatient)

// Delete patient
router.delete('/:id', deletePatient);

module.exports = router;