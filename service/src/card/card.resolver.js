import { getCards, createCard } from './card.controller';

export default {
    Query: {
        cards: getCards
    },
    Mutation: {
        createCard
    }
};
