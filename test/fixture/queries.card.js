export const GET_CARDS = `
query {
    cards {
        walletId
        userId
        currency
        balance
        number
        expiration
        ccv
        isBlocked
    }
}`;

export const CREATE_CARD = `
mutation createCard($walletId: ID!, $balance: Float, $currency: Currency) {
    createCard(walletId: $walletId, balance: $balance, currency: $currency) {
        walletId
        userId
        currency
        balance
        number
        expiration
        ccv
        isBlocked
    }
}`;

export const BLOCK_CARD = `
mutation blockCard($id: ID!) {
    blockCard(id: $id) {
        userId
        currency
        balance
        number
        expiration
        ccv
        isBlocked
    }
}`;

export const UNBLOCK_CARD = `
mutation unblockCard($id: ID!) {
    unblockCard(id: $id) {
        userId
        currency
        balance
        number
        expiration
        ccv
        isBlocked
    }
}`;
