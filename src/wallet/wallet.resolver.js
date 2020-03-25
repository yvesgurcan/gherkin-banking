import {
    getWallets,
    createWallet,
    createMasterWallets,
    addToWallet
} from './wallet.controller';

export default {
    Query: {
        wallets: getWallets
    },
    Mutation: {
        createWallet,
        createMasterWallets,
        addToWallet
    }
};
