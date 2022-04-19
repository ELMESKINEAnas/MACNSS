import Agent from '../models/agent.js';
// import userAdmis from '../models/userAdmis.js';
import jwt from 'jsonwebtoken';
const {
    genSaltSync,
    hashSync,
    compareSync
} = require("bcrypt");


// create admin
const createAgent = (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    Agent.findOne({ email }, (err, agent) => {
        if (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        if (agent) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);
        const newAgent = new Agent({
            username: username,
            email : email,
            password: hashedPassword
        });
        newAgent.save(async (err, agent) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            return res.status(201).json({
                message: "Admin created successfully",
                agent
            });
        });
    });
};





const authenticate = (req, res) => {
    Agent.findOne({
        email: req.body.email
    }, (err, agent) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!agent) {
            return res.status(400).send({
                message: "admin not found"
            });
        }
        if (!compareSync(req.body.password, agent.password)) {
            return res.status(400).send({
                message: "Invalid password or Email"
            });
        }
        const token = jwt.sign({
            agent
        }, process.env.SECRET_KEY_ADMIN, {
            expiresIn: "1h"
        });
        res.send({
            message: "agent authenticated",
            status:true,
            token
        });
    });
};


export {
    createAgent,
    authenticate,
    // getAllUserAdmis
};
