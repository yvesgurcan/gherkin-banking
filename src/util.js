import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import AutoIncrement from 'mongoose-sequence';

export function generateRandomNumber(desiredNumberLength) {
    if (process.env.TEST) {
        return '1'.repeat(desiredNumberLength);
    }

    const max = Number('9'.repeat(desiredNumberLength));
    const min = Number('1' + '0'.repeat(desiredNumberLength - 1));
    const number = Math.floor(Math.random() * (max - min) + min);
    return number;
}

export function castId() {
    if (process.env.TEST) {
        return String;
    }

    return ObjectId;
}

export function autoIncrement(schema, internalId) {
    if (process.env.TEST) {
        schema.plugin(AutoIncrement(mongoose), {
            id: internalId,
            inc_field: 'id'
        });
    }
}

export function generateExpirationDate() {
    if (process.env.TEST) {
        return new Date('2021-01-31');
    }

    const now = new Date();
    now.setDate(now.getDate() + 30); // expires 30 days from today
    return now;
}
