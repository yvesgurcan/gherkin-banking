import {
    getWallets,
    getWalletById,
    createWallet,
    updateWallet,
    createMasterWallets
} from './wallet.controller';

export default {
    Query: {
        wallets: getWallets,
        walletById: getWalletById
    },
    Mutation: {
        createWallet,
        updateWallet,
        createMasterWallets
    }
};
