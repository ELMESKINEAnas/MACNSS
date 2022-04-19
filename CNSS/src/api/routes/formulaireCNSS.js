import express from "express";
const router = express.Router()


import {
    createformulaireCNSS,
} from "../controllers";


router.post("/createformulaireCNSS", createformulaireCNSS);

export {router}