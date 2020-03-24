import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const walletSchema = new mongoose.Schema(
    {
        companyId: {
            type: ObjectId,
            required: [true, 'Company identifier is required.']
        },
        balance: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
            default: 'USD'
        },
        isMaster: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

walletSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model('Wallet', walletSchema);
