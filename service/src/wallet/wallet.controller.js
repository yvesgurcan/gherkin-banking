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
