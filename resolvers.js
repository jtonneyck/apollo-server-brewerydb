const {mockBeer} = require("./mocks/beer");

module.exports.resolvers = {
    Query: {
        searchBeer: (_,__,{searchTerm})=> [mockBeer]
    }
}