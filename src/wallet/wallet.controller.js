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

export async function createMasterWallets() {
    try {
        const currencies = ['USD', 'EUR', 'GBP'];
        let results = [];
        for (let i = 0; i <= currencies.length; i++) {
            const currency = currencies[i];
            const wallet = { currency, isMaster: true };
            const result = await createWallet(undefined, wallet, {
                companyId: null
            });
            results.push(result);
        }
        return results;
    } catch (error) {
        console.log({ error });
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
