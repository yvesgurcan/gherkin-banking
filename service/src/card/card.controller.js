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
