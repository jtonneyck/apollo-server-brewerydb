const { RESTDataSource } = require('apollo-datasource-rest');
const _ = require("lodash");
class BrewersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.base_url}`;
    this.searchBeers = this.searchBeers.bind(this);
    this.beerReducer = this.beerReducer.bind(this);
    this.breweriesReducer = this.breweriesReducer.bind(this);
    this.locationReducer = this.locationReducer.bind(this);
  }

  async searchBeers({searchTerm, page = 1}) {

    const {data: beers, currentPage, numberOfPages} = await this.get(`/beers?name=${searchTerm}&withBreweries=Y&p=${page}`);
  
    return {
            beers: beers? beers.map(this.beerReducer): [],
            filters: beers? this.filterReducer(beers): [],
            hasMore: currentPage < numberOfPages,
            page: currentPage
        }
  }

  beerReducer({id, name, abv, styleId, createDate, breweries, ...beer}) {
    let mappedBeer = {
        id,
        name,
        abv,
        styleId,
        createDate,
        breweries: breweries.map(this.breweriesReducer),
        type: this.typeReducer(beer)
    }
    return mappedBeer
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

  locationReducer({region, country, longitude, latitude}){
      return ({
            region,
            coordinates:  {
                longitude,
                latitude            
            },
            country: {
                isoCode: country.isoCode,
                name: country.name
            }
        });
  }
  typeReducer({isRetired, isOrganic, style}){
      return ({
        isRetired: isRetired === "Y",
        isOrganic: isOrganic === "Y",
        category: style && style.category && style.category.name
      })
  }

  filterReducer(beers){

      let locations = _
        .chain(beers)
        .flatMap((beer)=>beer.breweries)
        .flatMap((brewery)=> [...brewery.locations])
        .uniqWith(_.isEqual)
        .value()

        return {
            regions: _.chain(locations).uniqBy('region').map((location)=> location.region).value(),
            coordinates: _.chain(locations).map(({latitude, longitude})=> ({latitude, longitude})).value(),
            countries: _
                        .chain(locations)
                        .map((location)=> ({
                                isoCode: location.country.isoCode, 
                                name: location.country.name
                        }))
                        .uniqBy(_.isEqual)
                        .value()
        }

  }
  willSendRequest(request) {
    request.params.set('key', process.env.API_KEY);
  }
}

module.exports.BrewersApi = BrewersApi;