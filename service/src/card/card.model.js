import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { generateRandomNumber } from '../util';

const cardSchema = new mongoose.Schema(
    {
        walletId: {
            type: ObjectId,
            required: [true, 'Wallet identifier is required.']
        },
        userId: {
            type: ObjectId,
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
            default: new Date() // add 1 month
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

cardSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model('Card', cardSchema);
