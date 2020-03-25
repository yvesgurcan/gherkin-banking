import { gql } from 'apollo-server';

const CreateWalletFields = `
    balance: Float
    currency: Currency
`;

const WalletFields = `
    ${CreateWalletFields}
    id: ID
    companyId: ID
    isMaster: Boolean
    createdAt: String
    updatedAt: String
`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Wallet {
        ${WalletFields}
    }

    type Query {
        wallets: [Wallet]
    }

    type Mutation {
        createWallet(${CreateWalletFields}): Wallet
        createMasterWallets: [Wallet]
        addToWallet(amount: Float): Card
    }
`;
