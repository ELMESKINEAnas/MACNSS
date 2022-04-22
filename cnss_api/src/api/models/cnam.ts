import mongoose from 'mongoose';

export interface CnamInput {
    Name: string;
    Price: number;
    refundable: boolean;
    class: string;
}


// export interface CnamDocument extends CnamInput, mongoose.Document {
//     createdAt: Date;
//     updatedAt: Date;
// }

export const CnamSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
        },
        Price: {
            type: Number,
        },
        refundable: {
            type: Boolean,
        },
        class: {
            type: String,
        },

    },
    {timestamps: true}
);

const CnamModel = mongoose.model<CnamInput>('Cnam', CnamSchema);


export default CnamModel;