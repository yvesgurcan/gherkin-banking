import { parseDatabaseErrors } from '../database';
import WalletModel from './wallet.model.js';

export async function getWallets() {
    try {
        const result = await WalletModel.find();
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createWallet(_, wallet) {
    // prevent negative balance
    try {
        const result = await WalletModel.create(wallet);
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function addToWallet(_, amount) {
    try {
        // find card first, then add amount to balance
        const updatedBalance = amount;
        const result = await WalletModel.findByIdAndUpdate(id, {
            balance: updatedBalance
        });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}
