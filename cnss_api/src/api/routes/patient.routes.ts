import express from 'express';
import {
    checkFileAndSendMain,
    createPatient,
    getAllPatient,
    getPatientById,
} from "../controllers/patientFile.controller";
import {upload} from "../../middleware/upload.middleware";



const Prouter = express.Router();


Prouter.get('/all', getAllPatient);
Prouter.post('/create' , upload, createPatient);
// router.delete('/delete/:id', patientFileController.deletePatient);
Prouter.get('/one/:id', getPatientById);
Prouter.post('/checkFile/:id', checkFileAndSendMain)


export default Prouter;