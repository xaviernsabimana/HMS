const db = require('../config/db');

const getAllPatients = async (req, res) => {
    try {
        let query = "SELECT * FROM patients";
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, age, gender, ward, diagnosis } = req.body;
        const query = "INSERT INTO patients (name, age, gender, ward, diagnosis) VALUES (?, ?, ?, ?, ?)";
        const values = [name, age, gender, ward, diagnosis];
        const [rows] = await db.query(query, values);
        res.status(201).json({
            message: "Patient registered successfully",
            patientId: rows.insertId
        });
    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id, name, age, gender, ward, diagnosis } = req.body;
        const query = "UPDATE patients SET name = ?, age = ?, gender = ?, ward = ?, diagnosis = ? WHERE patient_id = ?";
        const values = [name, age, gender, ward, diagnosis, id];
        const [rows] = await db.query(query, values);
        res.status(200).json({
            message: "Patient updated successfully",
            patientId: id
        });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const deletePatient = async (req, res) => {
    try {
        const { id } = req.body;
        const query = "DELETE FROM patients WHERE patient_id = ?";
        const values = [id];
        const [rows] = await db.query(query, values);
        res.status(200).json({
            message: "Patient deleted successfully",
            patientId: id
        });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getAllPatients, createPatient, updatePatient, deletePatient };

