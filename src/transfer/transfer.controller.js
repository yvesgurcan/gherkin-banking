import { connect, close, parseMongooseErrors } from '../util';
import TransferModel from './transfer.model.js';

export async function getTransfers() {
    connect();
    try {
        const result = await TransferModel.find();
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function createTransfer(_, transfer) {
    connect();
    try {
        const result = await TransferModel.create(transfer);
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}
