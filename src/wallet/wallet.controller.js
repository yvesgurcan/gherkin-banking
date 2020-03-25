import { ApolloError } from 'apollo-server';
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

export async function getWalletById(_, { id }, { companyId }) {
    try {
        const result = await WalletModel.findOne({ id, companyId });
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

export async function updateWallet(_, update, { companyId }) {
    try {
        const wallet = await getWalletById(undefined, update, { companyId });

        if (!wallet) {
            throw new ApolloError('Wallet not found.');
        }

        const updatedBalance = (wallet.balance + update.amount).toFixed(2);
        const result = await WalletModel.findOneAndUpdate(
            { id: update.id },
            { balance: updatedBalance },
            { new: true }
        );

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function updateMasterWallet(_, update) {
    try {
        const masterWallet = await WalletModel.findOne({
            currency: update.currency,
            isMaster: true
        });

        if (!masterWallet) {
            throw new ApolloError('Master wallet not found.');
        }

        console.log(masterWallet.balance + update.amount);
        const updatedBalance = (masterWallet.balance + update.amount).toFixed(
            2
        );
        const result = await WalletModel.findOneAndUpdate(
            { id: masterWallet.id },
            { balance: updatedBalance },
            { new: true }
        );

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createMasterWallets() {
    try {
        const currencies = ['USD', 'EUR', 'GBP'];
        let results = [];
        for (let i = 0; i < currencies.length; i++) {
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
