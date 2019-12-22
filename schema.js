const {gql} = require("apollo-server");

module.exports.typeDefs = gql`

    type Query {
        searchBeer(searchTerm: String, page: String): SearchResult!
    }
    type SearchResult {
        beers: [Beer]!
        filters: Filters
        hasMore: Boolean!
    }
    
    type Beer {
        id: String!
        name: String!
        abv: String!
        styleId: Int!
        createDate: String!
        breweries: [Brewery]!
        type: BeerType
    }

    type Location {
        region: String!
        coordinates:  Coordinate!
        country: Country!
    }

    type Coordinate {
        longitude: Float
        latitude: Float
    }
    type Country {
        isoCode: String!
        name: String!
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

    type Filters {
        regions: [String]!
        coordinates: [Coordinate]!
        countries: [Country]!
        types: [BeerType]!
    }
`;