import {Request, Response} from 'express';
import Cnam from '../models/cnam';
import PatientFile from "../models/patientFile";


export const getAllCnam = async (req: Request, res: Response) => {
    try {
        const cnam = await Cnam.find();
        res.json(cnam);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getCnamById = async (req: Request, res: Response) => {
    try {
        const cnam = await Cnam.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!cnam) {
            return res.status(404).json({
                message: 'Cnam not found'
            });
        }
        return res.status(200).json(cnam);
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const createCnam = async (req: Request, res: Response) => {

    try {

        const cnam = await Cnam.create(req.body);
        return res.json(cnam);

    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}



