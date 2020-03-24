import { getTransfers, createTransfer } from './transfer.controller';

export default {
    Query: {
        transfers: getTransfers
    },
    Mutation: {
        createTransfer
    }
};
