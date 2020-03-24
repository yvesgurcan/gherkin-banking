import { ApolloError } from 'apollo-server';
import mongoose from 'mongoose';

// use the findAndModify() function from MongoDB under the hood instead of the findOneAndUpdate() function from Mongoose;
mongoose.set('useFindAndModify', false);

export async function connect() {
    try {
        await mongoose.connect('mongodb://35.164.133.55/gherkin-banking', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Could not connect to DB', error);
    }
}

export function close(result) {
    mongoose.connection.close();
    return result;
}

export function parseMongooseErrors(error) {
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

export function generateRandomNumber(length) {
    const max = Number('9'.repeat(length));
    const min = Number('1' + '0'.repeat(length - 1));
    const numberWithinRange = Math.floor(Math.random() * (max - min) + min);
    return numberWithinRange;
}
