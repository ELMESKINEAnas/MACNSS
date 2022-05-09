import mongoose from 'mongoose';


// export interface CnamDocument extends patientFile, mongoose.Document {
//     createdAt: Date;
//     updatedAt: Date;
// }

export const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        fileRef: {
            type: Number,
        },
        status: {
            type: String,
            default: 'pending'
        },
        address: {
            type: String,
        },
        refundedPrice : {
            type: Number,
            default: 0
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        file: {
            type: String
        },
        immatriculation: {
            type: String
        },
        password: {
            type: String
        },
        medicine: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cnam',
        }],


    },
    {timestamps: true}
);

const PatientModel = mongoose.model('PatientFile', patientSchema);


export default PatientModel;