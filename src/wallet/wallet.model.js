import mongoose from 'mongoose';
import { castId, autoIncrement } from '../util';

export const walletSchema = new mongoose.Schema(
    {
        companyId: {
            type: castId()
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

autoIncrement(walletSchema, 'wallet_id');

export default mongoose.model('Wallet', walletSchema);
