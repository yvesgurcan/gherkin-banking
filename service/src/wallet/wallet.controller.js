import { connect, close, parseMongooseErrors } from '../util';
import WalletModel from './wallet.model.js';

export async function getWallets() {
    connect();
    try {
        const result = await WalletModel.find();
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function createWallet(_, wallet) {
    // prevent negative balance
    connect();
    try {
        const result = await WalletModel.create(wallet);
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function addToWallet(_, amount) {
    connect();
    try {
        // find card first, then add amount to balance
        const updatedBalance = amount;
        const result = await WalletModel.findByIdAndUpdate(id, {
            balance: updatedBalance
        });
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}
