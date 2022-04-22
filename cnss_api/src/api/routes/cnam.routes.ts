import express from 'express';
import {createCnam, getAllCnam, getCnamById} from "../controllers/cnam.Controller";

const router = express.Router();


router.get('/all', getAllCnam);
router.post('/create', createCnam);
// router.delete('/delete/:id', cnamController.deleteCnam);
router.get('/one/:id', getCnamById);


export default router;