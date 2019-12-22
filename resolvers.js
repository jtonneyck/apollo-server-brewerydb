const {mockBeer} = require("./mocks/beer");
 
module.exports.resolvers = {
    Query: {
        searchBeer: async (_,{searchTerm, page}, {dataSources})=> {
            return await dataSources.brewersApi.searchBeers({searchTerm, page})
        }
    }
}