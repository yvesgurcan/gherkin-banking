import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import AutoIncrement from 'mongoose-sequence';

export function generateRandomNumber(length) {
    if (process.env.TEST) {
        return '1'.repeat(length);
    }

    const max = Number('9'.repeat(length));
    const min = Number('1' + '0'.repeat(length - 1));
    const numberWithinRange = Math.floor(Math.random() * (max - min) + min);
    return numberWithinRange;
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
        return new Date('2021-01-01');
    }

    return new Date(); // add 1 month
}
