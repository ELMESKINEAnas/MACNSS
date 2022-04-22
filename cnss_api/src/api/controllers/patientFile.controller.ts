import {Request, Response} from 'express';
import Patient from '../models/patientFile';
import Cnam from "../models/cnam";
import {sendMail} from "../../utils/sendMail";

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
    const {firstName, lastName, email, medicine, fileRef, address, city , state} = req.body
    try {
        const patient = new Patient({
            firstName,
            lastName,
            email,
            medicine,
            fileRef,
            address,
            city,
            state,
            file: req.file?.filename
        });
        await patient.save();
        res.status(201).json(patient);
    } catch (err: any) {
        res.status(500).json({message: err.message});
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

