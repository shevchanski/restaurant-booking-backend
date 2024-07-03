import {
  DocumentType,
  Ref,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';
import { Restaurant } from './restaurant.db';

@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
})
export class Favorite {
  // here will be stored user's id from Clerk-System
  @prop({ type: () => String, required: true })
  public _user_id!: string;

  @prop({ ref: () => Restaurant, required: true })
  public _restaurant_id!: Ref<Restaurant>;

  @prop({
    ref: () => Restaurant,
    localField: '_restaurant_id',
    foreignField: '_id',
    justOne: true
  })
  public restaurant?: Ref<Restaurant>;

  public static async getAllFavorites(
    this: ReturnModelType<typeof Favorite>,
    userId: string,
    returnRestaurantsIds: boolean = false
  ) {
    const favoritesArray = await (async () => {
      const favorites = await FavoriteModel.find({ _user_id: userId });

      if (returnRestaurantsIds) {
        return favorites.map((rest) => rest._restaurant_id.toString());
      }

      if (!favorites.length) {
        return null;
      }

      const promisesArray = favorites.map(
        async (rec) => await rec.populate('restaurant')
      );

      const resultArray: DocumentType<Favorite>[] = [];

      for (const promise of promisesArray) {
        const favoriteWithRestaurant = await promise;

        resultArray.push(favoriteWithRestaurant);
      }

      return resultArray.map((favorite) => favorite.restaurant);
    })();

    if (!favoritesArray) {
      return [];
    }

    return favoritesArray;
  }
}

const FavoriteModel = getModelForClass(Favorite);

export default FavoriteModel;
