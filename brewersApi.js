const { RESTDataSource } = require('apollo-datasource-rest');

class BrewersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.baseURL}`;
  }

  async searchBeers({searchTerm}) {
    const beers = await this.get("/beers", {
        params: {
            name: searchTerm,
            withBreweries: "Y"
        }
    })
  }

  beerReducer({id, name, abv, styleId, createDate, breweries}) {
    let mappedBeer = {
        id,
        name,
        abv,
        styleId,
        createDate,
        breweries: breweries.map(this.breweriesReducer)
    }
  }

  breweriesReducer({id,name,description,locations,...brewery}){
      return({
            id,
            name,
            description,
            images: {
                icon: brewery.images.icon,
                medium: brewery.images.medium,
                large: brewery.images.large,
            },
            locations: locations.map(this.locationReducer)
        });
  }

  locationReducer({region, countryIsoCode, longitude, latitude}){
      return ({
            region,
            coordinates:  {
                longitude,
                latitude            
            },
            countryIsoCode
        });
  }
  
  willSendRequest(request) {
    request.params.set('key', process.env.API_KEY);
  }
  
}