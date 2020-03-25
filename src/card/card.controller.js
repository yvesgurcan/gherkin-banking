import { parseDatabaseErrors } from '../database';
import CardModel from './card.model.js';

export async function getCards() {
    try {
        const result = await CardModel.find();
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createCard(_, card) {
    // prevent negative balance
    try {
        const result = await CardModel.create(card);
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function addToCard(_, amount) {
    try {
        // find card first, then add amount to balance
        const updatedBalance = amount;
        const result = await CardModel.findByIdAndUpdate(id, {
            balance: updatedBalance
        });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}
