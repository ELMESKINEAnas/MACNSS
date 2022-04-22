import Agent from '../models/agent';
import {Request, Response} from 'express';
import {comparePassword} from "../../helpers/jwtVerification";
import bcrypt from "bcryptjs";

export const AgentLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        if (!email || !password)
            return res.status(404).json({ message: "Please fill all the fields" })
        const existingAgent = await Agent.findOne({ email })
        if (!existingAgent) return res.status(404).json({ message: "Agent not found" })
        await comparePassword(password, existingAgent, res)
        // res.status(200).json({ message: "Login Successful" })
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}

export const AgentRegister = async (req: Request, res: Response) => {
    const { email, fullName , password } = req.body
    try {
        if (!email || !fullName || !password)
            return res.status(400).json({ message: "Please fill all the fields" })

        const existingAgent = await Agent.findOne({ email })

        if (existingAgent) return res.status(400).json({ message: "Agent already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAgent = await Agent.create({
            email: email,
            fullName: fullName,
            password: hashedPassword,
        })

        res.status(200).json({ newAgent })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}