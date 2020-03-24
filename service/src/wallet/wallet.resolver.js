import { getWallets, createWallet } from './wallet.controller';

export default {
    Query: {
        wallets: getWallets
    },
    Mutation: {
        createWallet
    }
};
