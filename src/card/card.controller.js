import { parseDatabaseErrors } from '../database';
import CardModel from './card.model.js';
import { ApolloError } from 'apollo-server';

export async function getCards(_, __, { userId }) {
    try {
        const result = await CardModel.find({ userId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createCard(_, card, { userId }) {
    // prevent negative balance
    try {
        const result = await CardModel.create({ ...card, userId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function blockCard(_, { id }, { userId }) {
    try {
        console.log(id, userId);
        const card = await CardModel.findOne({ id, userId });

        if (!card) {
            throw new ApolloError('Card not found.');
        }

        if (card.isBlocked) {
            throw new ApolloError('Card is already blocked.');
        }

        // Transfer money to wallet.

        const result = await CardModel.findByIdAndUpdate(
            card._id,
            {
                balance: 0,
                isBlocked: true
            },
            { new: true }
        );

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function unblockCard(_, { id }, { userId }) {
    try {
        const card = await CardModel.findOne({ id, userId });

        if (!card) {
            throw new ApolloError('Card not found.');
        }

        if (!card.isBlocked) {
            throw new ApolloError('Card is already unblocked.');
        }

        const result = await CardModel.findByIdAndUpdate(
            card._id,
            { isBlocked: false },
            { new: true }
        );

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
