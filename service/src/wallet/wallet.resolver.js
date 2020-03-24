import { getWallets, createWallet, addToWallet } from './wallet.controller';

export default {
    Query: {
        wallets: getWallets
    },
    Mutation: {
        createWallet,
        addToWallet
    }
};
