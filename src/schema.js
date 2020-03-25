import { gql } from 'apollo-server';
import cardSchema from './card/card.schema.js';
import walletSchema from './wallet/wallet.schema.js';
import transferSchema from './transfer/transfer.schema.js';

const sharedSchema = gql`
    enum Currency {
        USD
        GBP
        EUR
    }
`;

export default [sharedSchema, cardSchema, transferSchema, walletSchema];
