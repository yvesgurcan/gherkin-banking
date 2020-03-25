import { parseDatabaseErrors } from '../database';
import CardModel from './card.model.js';
import { ApolloError } from 'apollo-server';
import { updateWallet } from '../wallet/wallet.controller';

export async function getCards(_, __, { userId }) {
    try {
        const result = await CardModel.find({ userId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function getCardById(_, { id }, { userId }) {
    try {
        const result = await CardModel.findOne({ id, userId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createCard(_, card, { userId }) {
    try {
        const result = await CardModel.create({ ...card, userId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function updateCard(_, update, { userId }) {
    try {
        const card = await getCardById(undefined, update, { userId });

        if (!card) {
            throw new ApolloError('Card not found.');
        }

        const updatedBalance = (card.balance + update.amount).toFixed(2);
        const result = await CardModel.findOneAndUpdate(
            { id: update.id },
            { balance: updatedBalance },
            { new: true }
        );

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function blockCard(_, { id }, { userId, companyId }) {
    try {
        const card = await CardModel.findOne({ id, userId });

        if (!card) {
            throw new ApolloError('Card not found.');
        }

        if (card.isBlocked) {
            throw new ApolloError('Card is already blocked.');
        }

        const updatedWallet = await updateWallet(
            undefined,
            { id: card.walletId, amount: card.balance },
            { companyId }
        );

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
