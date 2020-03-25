import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server';

// use the findAndModify() function from MongoDB under the hood instead of the findOneAndUpdate() function from Mongoose;
mongoose.set('useFindAndModify', false);

export async function createDatabaseConnection(dbName = 'gherkin-banking') {
    try {
        const url = `mongodb://35.164.133.55/${dbName}`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`🌿  Mongoose Database ready at ${url}.`);
    } catch (error) {
        console.error('Could not connect to database', error);
    }
}

export async function closeDatabaseConnection() {
    await mongoose.connection.close();
    console.log('👋  Disconnected from Mongoose Database.');
}

export function dropDatabase() {
    mongoose.connection.db.dropDatabase();
}

export function parseDatabaseErrors(error) {
    if (error.errors) {
        const messages = Object.keys(error.errors).map(key => {
            const { message, path } = error.errors[key];
            return { message, path };
        });
        throw new ApolloError('ValidationError', messages);
    }

    if (error) {
        return error;
    }

    return null;
}
