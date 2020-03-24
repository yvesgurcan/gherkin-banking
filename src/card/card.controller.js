import { connect, close, parseMongooseErrors } from '../util';
import CardModel from './card.model.js';

export async function getCards() {
    connect();
    try {
        const result = await CardModel.find();
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function createCard(_, card) {
    // prevent negative balance
    connect();
    try {
        const result = await CardModel.create(card);
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function addToCard(_, amount) {
    connect();
    try {
        // find card first, then add amount to balance
        const updatedBalance = amount;
        const result = await CardModel.findByIdAndUpdate(id, {
            balance: updatedBalance
        });
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}
