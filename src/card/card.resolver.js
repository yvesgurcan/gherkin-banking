import {
    getCards,
    createCard,
    blockCard,
    unblockCard,
    addToCard
} from './card.controller';

export default {
    Query: {
        cards: getCards
    },
    Mutation: {
        createCard,
        blockCard,
        unblockCard,
        addToCard
    }
};
