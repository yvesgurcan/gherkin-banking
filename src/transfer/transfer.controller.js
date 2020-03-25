import { parseDatabaseErrors } from '../database';
import TransferModel from './transfer.model.js';

export async function getTransfers() {
    try {
        const result = await TransferModel.find();
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createTransfer(_, transfer) {
    try {
        const result = await TransferModel.create(transfer);
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}
