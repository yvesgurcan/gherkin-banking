import { ApolloError } from 'apollo-server';
import axios from 'axios';
import { parseDatabaseErrors } from '../database';
import TransferModel from './transfer.model.js';
import { getCardById, updateCard } from '../card/card.controller';
import {
    getWalletById,
    updateWallet,
    updateMasterWallet
} from '../wallet/wallet.controller';

const EXCHANGE_RATE_API = 'https://api.exchangeratesapi.io';

export async function getTransfers(_, __, { userId }) {
    try {
        const result = await TransferModel.find({ userId });

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createTransfer(_, transfer, { userId, companyId }) {
    try {
        let originEntity = await getEntity({
            type: transfer.originEntityType,
            id: transfer.originEntityId,
            userId,
            companyId
        });

        if (!originEntity) {
            throw new ApolloError('Origin entity not found.');
        }

        let targetEntity = await getEntity({
            type: transfer.targetEntityType,
            id: transfer.targetEntityId,
            userId,
            companyId
        });

        if (!targetEntity) {
            throw new ApolloError('Target entity not found.');
        }

        const originCurrency = originEntity.currency;
        const targetCurrency = targetEntity.currency;

        const { amountToAdd, conversionFee } = await handleConversion(
            transfer.amount,
            originCurrency,
            targetCurrency
        );

        await updateEntity({
            amount: transfer.amount * -1,
            type: transfer.originEntityType,
            id: transfer.originEntityId,
            userId,
            companyId
        });

        await updateEntity({
            amount: amountToAdd,
            type: transfer.targetEntityType,
            id: transfer.targetEntityId,
            userId,
            companyId
        });

        const result = await TransferModel.create({
            ...transfer,
            amount: amountToAdd,
            originCurrency,
            targetCurrency,
            conversionFee,
            userId
        });

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

async function getEntity(entity) {
    switch (entity.type) {
        default: {
            throw new ApolloError('Unknown entity type.');
        }
        case 'CARD': {
            return await getCardById(undefined, entity, {
                userId: entity.userId
            });
        }
        case 'WALLET': {
            return await getWalletById(undefined, entity, {
                companyId: entity.companyId
            });
        }
    }
}

async function updateEntity(entity) {
    switch (entity.type) {
        default: {
            throw new ApolloError('Unknown entity type.');
        }
        case 'CARD': {
            return await updateCard(undefined, entity, {
                userId: entity.userId
            });
        }
        case 'WALLET': {
            return await updateWallet(undefined, entity, {
                companyId: entity.companyId
            });
        }
    }
}

async function handleConversion(amount, originCurrency, targetCurrency) {
    let amountToAdd = amount;
    let conversionFee = 0;
    if (originCurrency !== targetCurrency) {
        const convertedAmount = await convertAmount(
            amount,
            originCurrency,
            targetCurrency
        );
        conversionFee = calculateFee(convertedAmount);
        amountToAdd = parseFloat(
            (convertedAmount - conversionFee).toFixed(2),
            10
        );

        const update = {
            amount: amountToAdd,
            currency: targetCurrency
        };
        const updated = await updateMasterWallet(undefined, update);
    }

    return {
        amountToAdd,
        conversionFee
    };
}

async function convertAmount(amount, originCurrency, targetCurrency) {
    let endpoint = `${EXCHANGE_RATE_API}/latest`;
    if (process.env.TEST) {
        endpoint = `${EXCHANGE_RATE_API}/2020-03-25`;
    }

    const { data } = await axios(`${endpoint}?base=${originCurrency}`);
    const conversionRate = data.rates[targetCurrency];
    return amount * conversionRate;
}

function calculateFee(amount) {
    return parseFloat(((amount / 100) * 2.9).toFixed(2), 10);
}
