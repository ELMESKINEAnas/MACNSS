import express from "express";
const router = express.Router();

import {
    createAgent,
    authenticate,
    // getAllUserAdmis,

} from "../controllers";


router.post("/createAgent", createAgent);
router.post("/authenticate", authenticate);
// router.get("/getAllUserAdmis", getAllUserAdmis);


export {router}
