import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from 'graphql-tools';
import schemas from './schema.js';
import resolvers from './resolvers.js';

const schema = mergeSchemas({
    schemas,
    resolvers
});

export const serverConfig = {
    schema,
    context: ({ req }) => ({
        userId: req.headers['user-id'],
        companyId: req.headers['company-id']
    })
};

export const instantiateServer = (customConfig = {}) =>
    new ApolloServer({
        ...serverConfig,
        ...customConfig
    });

export async function startServer(server = instantiateServer(), port = '4001') {
    try {
        const { url } = await server.listen({ port });
        console.log(`🚀  Apollo Server ready at ${url}.`);
    } catch (error) {
        console.error('Could not start server.', error);
    }
}
