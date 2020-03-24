import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const transferSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            default: 0
        },
        conversionFee: {
            type: Number,
            default: 0
        },
        originCurrency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
            default: 'USD'
        },
        originEntityId: {
            type: ObjectId,
            required: [true, 'Origin entity identifier is required.']
        },
        originEntityType: {
            type: String,
            enum: ['CARD', 'WALLET'],
            required: [true, 'Origin entity type is required.']
        },
        targetCurrency: {
            type: String,
            enum: ['USD', 'GBP', 'EUR'],
            default: 'USD'
        },
        targetEntityId: {
            type: ObjectId,
            required: [true, 'Target entity identifier is required.']
        },
        targetEntityType: {
            type: String,
            enum: ['CARD', 'WALLET'],
            required: [true, 'Target entity type is required.']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

transferSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model('Transfer', transferSchema);
