import {Request, Response} from 'express';
import Patient from '../models/patientFile';
import Cnam from "../models/cnam";
import {sendMail} from "../../utils/sendMail";
const { randomUUID } = require('crypto'); // Added in: node v14.17.0;
import {comparePassword} from "../../helpers/jwtVerification";
import bcrypt from "bcryptjs";

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
    
    const {firstName, lastName, email, medicine, fileRef, address, city , state , file , phone} = req.body
    try {
        const existingPatient = await Patient.findOne({ email })

        if (existingPatient) return res.status(400).json({ message: "Patient already exists" })

        let password = "1234";
        const hashedPassword = await bcrypt.hash(password, 10)
        const patient = new Patient({
            firstName,
            lastName,
            email,
            medicine,
            fileRef,
            address,
            phone,
            password : hashedPassword,
            city,
            state,
            immatriculation: randomUUID(),
            file
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

        await Patient.findByIdAndUpdate(req.params.id,{
            $set: {
                status: "refunded",
                refundedPrice : price
            }
        })
        await sendMail(email, firstName, lastName, price, fileRef)

        res.json({total: patientMedicine, price: price, receiver: patientInfo})


    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export const GetPatientFiles = async (req: Request, res: Response) => {

    try {
        const patientFiles = await Patient.findById(req.params.id).populate('patientFile');
        res.json(patientFiles);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}