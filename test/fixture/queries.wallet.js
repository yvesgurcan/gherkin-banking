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

export const CREATE_WALLET = `
mutation createWallet($balance: Float, $currency: Currency, $isMaster: Boolean) {
    createWallet(balance: $balance, currency: $currency, isMaster: $isMaster) {
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
