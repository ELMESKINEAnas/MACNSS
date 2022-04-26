import {Request, Response} from 'express';
import Patient from '../models/patientFile';
import Cnam from "../models/cnam";
import {sendMail} from "../../utils/sendMail";
const { randomUUID } = require('crypto'); // Added in: node v14.17.0;
import {comparePassword} from "../../helpers/jwtVerification";
import bcrypt from "bcryptjs";


// '89rct5ac2-8493-49b0-95d8-de843d90e6ca

interface patientType {
    firstName: {
        type: string,
    },
    lastName: {
        type: string,
    },
    email: {
        type: string,
    },
    price: {
        type: number
    }
    fileRef: {
        type: number
    },
    immatriculation : {
        type : string
    },
    password: {
        type: string
    }
}


export const getAllPatient = async (req: Request, res: Response) => {
    try {
        const patient = await Patient.find();
        res.json(patient);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getPatientById = async (req: Request, res: Response) => {
    
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const createPatient = async (req: Request, res: Response) => {
    
    const {firstName, lastName, email,password, medicine, fileRef, address, city , state} = req.body
    try {
        const existingPatient = await Patient.findOne({ email })

        if (existingPatient) return res.status(400).json({ message: "Patient already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)
        // generate unique token
        const patient = new Patient({
            firstName,
            lastName,
            email,
            medicine,
            fileRef,
            address,
            password : hashedPassword,
            city,
            state,
            immatriculation: randomUUID(),
            file: req.file?.filename
        });
        await patient.save();
        res.status(201).json(patient);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export const PatientLogin = async (req: Request, res: Response) => {
    const { immatriculation, password } = req.body
    try {
        if (!immatriculation || !password)
            return res.status(404).json({ message: "Please fill all the fields" })
        const existingPatient = await Patient.findOne({ immatriculation })
        if (!existingPatient) return res.status(404).json({ message: "Patient not found" })
        await comparePassword(password, existingPatient, res)
        // res.status(200).json({ message: "Login Successful" })
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}


export const checkFileAndSendMain = async (req: Request, res: Response) => {
    try {
        const patient = await Patient.findById(req.params.id).populate("medicine");
        const patientInfo = await Patient.findById(req.params.id)
        if (!patient) return res.status(404).json({message: 'Patient not found'});

        // get the object medicine array inside patient object
        // @ts-ignore
        const patientMedicine = patient["medicine"];
        let price = 0

        patientMedicine.map((el: any) => {
            if (el.refundable) {
                price += el.Price
            }
        })
        const {firstName, lastName, email, fileRef} = patientInfo


        await sendMail(email, firstName, lastName, price, fileRef)

        res.json({total: patientMedicine, price: price, receiver: patientInfo})


    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

