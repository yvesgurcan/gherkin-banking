export const GET_TRANSFERS = `
query {
    transfers {
        amount
        conversionFee
        originEntityId
        originEntityType
        originCurrency
        targetEntityId
        targetEntityType
        targetCurrency
    }
}`;

export const CREATE_TRANSFER = `
mutation createTransfer($amount: Float!, $originEntityId: ID!, $originEntityType: EntityType!, $targetEntityId: ID!, $targetEntityType: EntityType!) {
    createTransfer(amount: $amount, originEntityId: $originEntityId, originEntityType: $originEntityType, targetEntityId: $targetEntityId, targetEntityType: $targetEntityType) {
        amount
        conversionFee
        originEntityId
        originEntityType
        originCurrency
        targetEntityId
        targetEntityType
        targetCurrency
    }
}`;
