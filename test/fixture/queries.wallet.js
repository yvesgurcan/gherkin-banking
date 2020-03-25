export const GET_WALLETS = `
query {
    wallets {
        id
        companyId
        balance
        currency
        isMaster
    }
}`;

export const GET_WALLET_BY_ID = `
query walletById($id: ID!) {
    walletById(id: $id) {
        id
        companyId
        balance
        currency
        isMaster
    }
}`;

export const CREATE_WALLET = `
mutation createWallet($balance: Float, $currency: Currency) {
    createWallet(balance: $balance, currency: $currency) {
        id
        companyId
        balance
        currency
        isMaster
    }
}`;

export const CREATE_MASTER_WALLETS = `
mutation {
    createMasterWallets {
        id
        companyId
        balance
        currency
        isMaster    
    }
}`;
