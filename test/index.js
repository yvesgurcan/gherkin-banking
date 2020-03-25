import { createTestClient } from 'apollo-server-testing';
import { instantiateServer } from '../src/server';
import {
    createDatabaseConnection,
    closeDatabaseConnection,
    dropDatabase
} from '../src/database';
import {
    GET_WALLETS,
    CREATE_WALLET,
    CREATE_MASTER_WALLETS
} from './fixture/queries.wallet';
import {
    GET_CARDS,
    CREATE_CARD,
    BLOCK_CARD,
    UNBLOCK_CARD
} from './fixture/queries.card';

const TEST_DB_NAME = 'gherkin-banking-test';

let query = null;
const userId = '5e7abd771f06a07014d872c0';
const companyId = '5e7abc6792323e650e6c76e2';

describe('Gherkin Banking:', function() {
    beforeAll(async function() {
        await createDatabaseConnection(TEST_DB_NAME);
        const server = instantiateServer({
            context: () => ({
                userId,
                companyId
            })
        });
        ({ query } = createTestClient(server));
    });
    afterAll(async function() {
        await dropDatabase();
        await closeDatabaseConnection();
    });

    describe('Wallet:', function() {
        test('Create a wallet without variables', async function() {
            const result = await query({
                query: CREATE_WALLET
            });
            expect(result).toMatchSnapshot();
        });

        test('Create a wallet with a balance', async function() {
            const result = await query({
                query: CREATE_WALLET,
                variables: {
                    balance: 10.87
                }
            });
            expect(result).toMatchSnapshot();
        });

        test('Create a wallet with a currency', async function() {
            const result = await query({
                query: CREATE_WALLET,
                variables: {
                    currency: 'GBP'
                }
            });
            expect(result).toMatchSnapshot();
        });

        test('Create a wallet with a currency and a balance', async function() {
            const result = await query({
                query: CREATE_WALLET,
                variables: {
                    currency: 'EUR',
                    balance: 94.37
                }
            });
            expect(result).toMatchSnapshot();
        });

        test('Create master wallets', async function() {
            const result = await query({
                query: CREATE_MASTER_WALLETS
            });
            expect(result).toMatchSnapshot();
        });

        test('Fetch company wallets', async function() {
            const result = await query({
                query: GET_WALLETS
            }); // should include the company wallets created in the previous tests

            expect(result).toMatchSnapshot();
        });
    });

    describe('Card:', function() {
        test('Create a card with a walletId', async function() {
            const result = await query({
                query: CREATE_CARD,
                variables: {
                    walletId: '1', // this wallet was created in a previous test
                    currency: 'USD'
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Create a card with a walletId and a balance', async function() {
            const result = await query({
                query: CREATE_CARD,
                variables: {
                    walletId: '2', // this wallet was created in a previous test
                    balance: 67.94,
                    currency: 'USD'
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Create a card with a walletId, a balance, and a currency', async function() {
            const result = await query({
                query: CREATE_CARD,
                variables: {
                    walletId: '3', // this wallet was created in a previous test
                    balance: 67.94,
                    currency: 'GBP'
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Card can be blocked', async function() {
            const result = await query({
                query: BLOCK_CARD,
                variables: {
                    id: '1' // this card was created in a previous test
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Card can not be blocked again', async function() {
            const result = await query({
                query: BLOCK_CARD,
                variables: {
                    id: '1'
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Card can be unblocked', async function() {
            const result = await query({
                query: UNBLOCK_CARD,
                variables: {
                    id: '1' // this card was created in a previous test
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Card can not be unblocked again', async function() {
            const result = await query({
                query: UNBLOCK_CARD,
                variables: {
                    id: '1' // this card was created in a previous test
                }
            });

            expect(result).toMatchSnapshot();
        });

        test('Fetch user cards', async function() {
            const result = await query({
                query: GET_CARDS
            });

            expect(result).toMatchSnapshot();
        });
    });
});
