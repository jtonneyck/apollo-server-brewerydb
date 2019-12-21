const {gql} = require("apollo-server");

module.exports.typeDefs = gql`

    type Query {
        searchBeer(searchTerm: String): [Beer]!
    }

    type Beer {
        id: String!
        name: String!
        abv: String!
        styleId: Int!
        createDate: String!,
        breweries: [Brewery]!
    }

    type Location {
        region: String!
        coordinates:  Coordinate!
        countryIsoCode: String!
    }

    type Coordinate {
        longitude: Float
        latitude: Float
    }

    type Brewery {
        id: String!
        name: String!
        description: String!
        images: Label
        locations: [Location]!
    }

    type BeerType {
        isOrganic: Boolean
        isRetired: Boolean
        category: String
    }

    type Label {
        icon: String
        medium: String
        large: String
    }
`;