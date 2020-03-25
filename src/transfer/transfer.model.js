import mongoose from 'mongoose';
import { castId, autoIncrement } from '../util';

export const transferSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            default: 0
        },
        conversionFee: {
            type: Number,
            default: 0
        },
        originEntityId: {
            type: castId(),
            required: [true, 'Origin entity identifier is required.']
        },
        originEntityType: {
            type: String,
            enum: ['CARD', 'WALLET'],
            required: [true, 'Origin entity type is required.']
        },
        originCurrency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
            default: 'USD'
        },
        targetEntityId: {
            type: castId(),
            required: [true, 'Target entity identifier is required.']
        },
        targetEntityType: {
            type: String,
            enum: ['CARD', 'WALLET'],
            required: [true, 'Target entity type is required.']
        },

        targetCurrency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
            default: 'USD'
        },
        userId: {
            type: castId(),
            required: [true, 'User identifier is required.']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

autoIncrement(transferSchema, 'transfer_id');

export default mongoose.model('Transfer', transferSchema);
