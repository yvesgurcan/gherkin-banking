import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from 'graphql-tools';
import schemas from './schema.js';
import resolvers from './resolvers.js';

const schema = mergeSchemas({
    schemas,
    resolvers
});

export const server = new ApolloServer({ schema, resolvers });

export async function startServer(port = '4001') {
    try {
        const { url } = await server.listen({ port });
        console.log(`🚀  Apollo Server ready at ${url}.`);
    } catch (error) {
        console.error('Could not start server.', error);
    }
}
