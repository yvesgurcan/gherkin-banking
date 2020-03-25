import { createTestClient } from 'apollo-server-testing';
import { instantiateServer } from '../src/server';
import {
    createDatabaseConnection,
    closeDatabaseConnection,
    dropDatabase
} from '../src/database';
import { GET_WALLETS, CREATE_WALLET } from './fixture/queries.wallet';
import { GET_CARDS, CREATE_CARD } from './fixture/queries.card';

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
        describe('Company wallet:', function() {
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

            test('Fetch company wallets', async function() {
                const result = await query({
                    query: GET_WALLETS
                });

                expect(result).toMatchSnapshot();
            });
        });

        describe('Master wallet:', function() {
            test('Create a master wallet', async function() {
                const result = await query({
                    query: CREATE_WALLET,
                    variables: {
                        isMaster: true
                    }
                });
                expect(result).toMatchSnapshot();
            });

            test('Create a master wallet with a balance', async function() {
                const result = await query({
                    query: CREATE_WALLET,
                    variables: {
                        balance: 48.31,
                        isMaster: true
                    }
                });
                expect(result).toMatchSnapshot();
            });

            test('Create a master wallet with a currency', async function() {
                const result = await query({
                    query: CREATE_WALLET,
                    variables: {
                        currency: 'EUR',
                        isMaster: true
                    }
                });
                expect(result).toMatchSnapshot();
            });

            test('Create a master wallet with a currency and a balance', async function() {
                const result = await query({
                    query: CREATE_WALLET,
                    variables: {
                        currency: 'GBP',
                        balance: 78.56,
                        isMaster: true
                    }
                });
                expect(result).toMatchSnapshot();
            });
        });
    });

    describe('Card:', function() {
        test('Create a card', async function() {
            const result = await query({
                query: CREATE_CARD,
                variables: {
                    walletId: '123',
                    userId: '456',
                    balance: 0,
                    currency: 'USD'
                }
            });

            console.log(result.errors[0].extensions);
            // expect(result).toMatchSnapshot();
        });

        test('Fetch user cards', async function() {
            const result = await query({
                query: GET_CARDS
            });

            // expect(result).toMatchSnapshot();
        });
    });
});
