import mongoose from 'mongoose';
import {
    castId,
    autoIncrement,
    generateRandomNumber,
    generateExpirationDate
} from '../util';

export const cardSchema = new mongoose.Schema(
    {
        walletId: {
            type: castId(),
            required: [true, 'Wallet identifier is required.']
        },
        userId: {
            type: castId(),
            required: [true, 'User identifier is required.']
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
        // should be encrypted
        number: {
            type: String,
            default: () => generateRandomNumber(16),
            minlength: 16,
            maxlength: 16
        },
        expiration: {
            type: Date,
            default: generateExpirationDate()
        },
        ccv: {
            type: String,
            default: () => generateRandomNumber(3),
            minlength: 3,
            maxlength: 3
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

autoIncrement(cardSchema, 'card_id');

export default mongoose.model('Card', cardSchema);
