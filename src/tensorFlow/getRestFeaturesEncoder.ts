import { DocumentType } from '@typegoose/typegoose';
import { Restaurant } from '../dataBase/restaurant.db';

function getRestFeatureEncoder(allRestaurants: DocumentType<Restaurant>[]) {
  const uniqueCuisines = [
    ...new Set(allRestaurants.flatMap((rest) => rest.cuisine))
  ].sort((a, b) => a.localeCompare(b));

  const uniqueCities = [
    ...new Set(allRestaurants.map((rest) => rest.address.city))
  ];

  const uniqueCountries = [
    ...new Set(allRestaurants.map((rest) => rest.address.country))
  ];

  return function (restaurant: DocumentType<Restaurant>) {
    const {
      cuisine: restaurantCuisine,
      rating,
      address: { city: restCity, country: restCountry }
    } = restaurant;

    const cuisineFeatures = uniqueCuisines.map((cuisine) =>
      restaurantCuisine.includes(cuisine) ? 1 : 0
    );

    const countryFeatures = uniqueCountries.map((country) =>
      country === restCountry ? 1 : 0
    );

    const cityFeatures = uniqueCities.map((city) =>
      restCity === city ? 1 : 0
    );

    return [...cuisineFeatures, ...countryFeatures, ...cityFeatures, rating];
  };
}

export default getRestFeatureEncoder;
