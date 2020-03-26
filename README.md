## Main dependencies

-   Node
-   GraphQL
-   Apollo Server
-   MongoDB
-   Mongoose

## Setup

You need `node`, `npm`, and `mongod` (see [instructions](https://docs.mongodb.com/manual/administration/install-community/)) installed globally on your machine in order to run this project.

All other dependencies are installed at the project level:

    npm i

## Development

Once you've installed all dependencies, type the following command to get started:

    npm start

-   An Apollo server will start listening to requests at `localhost:4001` and watch for file changes thanks to `nodemon`.
-   A MongoDB instance will run at `mongodb://localhost:27017` thanks to the Mongo deamon.

You can start the service on its own with `npm run start:service` or the database only at `npm run start:db`.

### API playground and documentation

Once the server is up and running, you will be able to explore the API at `http://localhost:4001/` thanks to [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)

Click on the `Schema` and `Docs` tabs on the right to find the API documentation.

Feel free to write [queries and mutations](https://graphql.org/learn/queries/) in the space on the left, see the results returned by the API, and take advantage of the auto-complete feature 😃.

Keep in mind that [GraphQL typically uses a single endpoint](https://graphql.org/learn/best-practices/#http) to handle all the requests.

## Design

This API is designed with its data at the center: cards, wallets, and transfers.

For each data type, you will find the following structure in the source code:

```
    dataType
    ├── dataType.controller.js
    ├── dataType.model.js
    ├── dataType.resolver.js
    ├── dataType.schema.js
```

### Schema

The schema is a self-documenting script that visually represents the interface and data structure exposed for each data type. In each `*.schema.js` file, you will find the following elements:

-   A definition of the fields that constitute the data type (e.g., for wallets you will find this information under the `Wallet` type in the file).
-   How this data type can be queried and what the query returns (under the `Query` type).
-   How this data type can be mutated and what the mutation returns (under the `Mutation` type).

The fact that GraphQL is a [strongly typed query language](https://blog.logrocket.com/defining-types-for-your-graphql-api/) provides the same advantage as other strongly typed languages when it comes to developing (and discovering) the API.

Additionally, the ability to carefully choose which database fields are exposed for each data type minimizes the need to sanitize the input. For example, it is safe to group together the data related to both user wallets and master wallets, since the mutation that enables to create a user wallet ignores the `isMaster` field. There is no risk that a user creates a master wallet using the `createWallet` mutation and there is no need to write more code to handle what could be a safety issue in a REST API.

[Read more on GraphQL schemas.](https://graphql.org/learn/schema/)

### Model

The model is the representation of this data type from the perspective of the database. [Mongoose](https://medium.com/chingu/an-overview-of-mongodb-mongoose-b980858a8994) allows us to go further into shaping our data and making sure that it stays tidy.

A couple of the features that help us handling data for this application are the following:

-   The ability to provide default values to fields allows to fill the gap between the fields that are not exposed by the API and yet necessary for the application. A great example of default values can be seen in `card.model.js`, where Mongoose enables us to generate card numbers, card verification codes, and expiration dates straight from the model.
-   The ability to impose tighter constraints on the data (for example, the length of a string) comes in very handy as well.
-   Even better, Mongoose plays a great role in making sure that we can write integration tests reliably without having to mock database behaviors.

### Resolver map

[Resolvers](https://www.apollographql.com/docs/graphql-tools/resolvers/) are a central piece of GraphQL. In this application, the resolver map of each data type (`*.resolver.js`) simply represents the connection between what we call the controller and the schema.

### Controller (the real resolvers)

You will find the business logic that relates to a particular data type in the controller. Typically, this is where the CRUD operations happen, including interactions with MongoDB.

The signature of each function (aka resolver) looks like this example:

```
    getTransfers(parent, arguments, context)
```

-   `parent` comes in play if the [client requests different types in a single query](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains) (which is not the case in this particular API, hence the usage of `_` instead of the parent).
-   `arguments` is obviously the sanitized input that was provided by the client.
-   `context` is very useful for middleware but, in our case, we use this variable to store the `user-id` and `company-id` headers that came from the request.

The value returned by the function is essentially the object that forms the core of the response of the Apollo Server to the client.

## Configuration

The logic that relates to the configuration of the API can be found in the various files at the root of the source folder. The following files are particularly noteworthy:

```
    src
    ├── resolvers.js
    ├── schema.js
    ├── database.js
    ├── server.js
    ├── index.js
    ├── util.js
```

-   The `resolvers` and `schema` files combine together the schema and resolvers of all the data type. The schema file also contains types that are shared among the data types.
-   The `database` file contains functions to connect to and disconnect from the data store. It also contains a function to drop the database, which is particularly useful when testing or developing the API.
-   The `server` file contains the logic you need to get the Apollo server started.
-   The `index` file brings the server and the database together and start the whole API.
-   The `util` file contains miscellani functions that can be useful in different parts of the API.

In addition to the API configuration, this project also contains at its root several config files related to the tools that are used to develop it:

-   NPM: `package.json` and `package-lock.json`
-   Babel: `babel.config.js`
-   Jest: `jest.config.js`
-   Prettier: `.prettierrc`
-   Git and GitHub: `.gitignore`, `_config.yml`, `.github`, `LICENSE`, `CNAME`

## Integration tests

    npm test

Running the tests will instantiate a separate Apollo Server and a database for test purposes. In order to pass a test, the output of the query must match the snapshot that was previously saved. To update snapshots:

    npm run test:update

Since MongoDB relies on unique identifiers to avoid collisions, tests that involve foreign keys would systematically fail (snapshots would never match). Therefore, the test database relies on traditional auto-incrementing identifiers instead. The production database still relies on unique identifiers.

Similarly, functions that rely on randomness or relative dates will return predictable results instead while running tests.

## Other things I would do with more time

-   Make sure that no more than 1 master wallet can be created per currency.
-   Handle errors if the exchange rate API was down or took too long to respond.
-   Handle the creation of users and companies in the database. Possible in a separate micro-service.
-   Check if the `user-id` and `company-id` headers are valid and the request authorized.
-   Add monitoring (with Datadog or Kibana).
-   Add a CloudFormation template to make the service deployable to AWS as an EC2 instance or a [Lambda](https://www.apollographql.com/docs/apollo-server/deployment/lambda/) (and also look into using Mongo Atlas).
- Turn the core of the API into a re-usable dependency that can be used to create other micro-services.

# Assignment

Our developers need to be experts at designing the right solution for any problem we have. As you would be a backend developper, your work will mostly be giving our user the power over their financial data, and this will be done through APIs.

This test has been made to give you an overview of some of the subjects you would work on, and we expect you to deliver a state of the art solution to the problem, including a documentation (yes, APIs come with documentation, think about the frontend team).

## The problem

Customers have wallets, each of them representing a bank account in a specific currency.

Like with your own bank, each card you create will be connected to one of your wallets. Because the cards are prepaid, they need to be loaded with money before being used to pay on a merchant's website.

You may have guessed, we need an API to manage the cards and the transfers between wallets.

As we're actually moving customers money, we need to track any movement in the database carefully, especially who executed the transfer 👀.

## Specs

In the specs, a user represents a frontend client, the API should output the entities as JSON objects.

-   [x] A user can create a wallet in USD (\$), GBP (£), or EUR (€)
-   [x] A user can create a card connected to one of his wallets
-   [x] A user can list all his cards
-   [x] A user can list all his wallets
-   [x] A user can load or unload money on his card from the wallet
-   [x] A user can block or unblock a card
-   [x] Blocking a card will unload all the money into the right wallet
-   [x] There is a master wallet per currency
-   [x] We store fees from transfers in each master wallet (see below)
-   [x] A user can transfer money between 2 wallets in different currencies
-   [x] We take a 2.9% fee on the destination currency on this transfer
-   [x] This fee will go into our master wallet for the given currency
-   [x] Of course you need to convert the amount (you can user fixer.io or any free API)
-   You don't need to manage users and authentication, just pass both a User-Id and a Company-Id headers with each request and use it to track the money transfers / wallets or cards ownerships.
-   As you can't use real money, you can load the wallet directly when you
    create it (setting the balance property), it does not work in real life but
    whatever!

## Data structures

These are the mandatory fields for each entity, you can add as many as you want (even other entities if you need).

### Wallet 💰

-   Unique identifier
-   Current balance
-   Currency
-   Company identifier
-   Is master wallet (a boolean to know if it's ours for the fees)

### Card 💳

-   Unique identifier
-   Wallet identifier
-   Currency
-   Current balance
-   Random 16 digits number
-   Expiration date (creation + 1 month)
-   Random CCV
-   User identifier (a card is associated to a user)
-   Status (blocked or not)

### Transfer

-   Unique identifier
-   Timestamp
-   Amount transfered
-   Origin currency
-   Target currency
-   Optional conversion fee
-   Origin entity identifier
-   Origin entity type (card or wallet)
-   Target entity identifier
-   Target entity type (card or wallet)

## Expected output

You can write your code in any language and with any framework, we are mostly working with Javascript. Don't scratch your head too hard, a classic MVC architecture works well, just make sure to have everything ready so we can install your application and start testing it.

-   Your source code, ideally on a Github repository but a ZIP works as well
-   A getting-started guide, how to install your API, the technologies we may need (database, runtime...)
-   A documentation of the endpoints

Bonus:

-   You handle the errors correctly on the API if we send random data
-   You wrote some tests

## Advice

-   If you struggle on a specific point don't spend 2 hours on it, leave it aside and get back to it at the end
-   If you have a question please send your contact an email
-   This test is a real use case, put the same attention to this test that you would in your real work
