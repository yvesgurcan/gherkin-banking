import { getCards, createCard, addToCard } from './card.controller';

export default {
    Query: {
        cards: getCards
    },
    Mutation: {
        createCard,
        addToCard
        // blockCard
        // unblockCard
    }
};
