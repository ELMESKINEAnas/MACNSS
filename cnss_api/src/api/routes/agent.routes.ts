import express from 'express';
import {AgentLogin, AgentRegister} from "../controllers/agent.controller";

const Arouter = express.Router();


Arouter.get('/login', AgentLogin);
Arouter.post('/register', AgentRegister);



export default Arouter;