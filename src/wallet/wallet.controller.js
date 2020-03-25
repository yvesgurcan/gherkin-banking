import { parseDatabaseErrors } from '../database';
import WalletModel from './wallet.model.js';

export async function getWallets(_, __, { companyId }) {
    try {
        const result = await WalletModel.find({ companyId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createWallet(_, wallet, { companyId }) {
    try {
        const result = await WalletModel.create({ ...wallet, companyId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function addToWallet(_, amount, { companyId }) {
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
