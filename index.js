const { ApolloServer, gql } = require('apollo-server');
const {typeDefs} = require("./schema");
const {resolvers} = require("./resolvers");
const {BrewersApi} = require("./brewersApi");

require("dotenv").config();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers ,
    dataSources: ()=> ({
        brewersApi : new BrewersApi()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});