import { gql } from 'apollo-server';

const WalletFields = `
    companyId: ID
    balance: Float
    currency: Currency
    isMaster: Boolean
`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Wallet {
        id: ID
        createdAt: String
        updatedAt: String
        ${WalletFields}
    }

    type Query {
        wallets: [Wallet]
    }

    type Mutation {
        createWallet(${WalletFields}): Wallet
    }
`;
