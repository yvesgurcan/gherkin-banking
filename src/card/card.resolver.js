import {
    getCards,
    getCardById,
    createCard,
    updateCard,
    blockCard,
    unblockCard
} from './card.controller';

export default {
    Query: {
        cards: getCards,
        cardById: getCardById
    },
    Mutation: {
        createCard,
        updateCard,
        blockCard,
        unblockCard
    }
};
