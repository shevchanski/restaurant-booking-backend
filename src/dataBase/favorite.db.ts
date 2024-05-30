import {
  Ref,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';
import { Restaurant } from './restaurant.db';

@modelOptions({
  schemaOptions: {
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
    userId: string
  ) {
    const favoritesArray = await (async () => {
      const favorites = (await FavoriteModel.find({ _user_id: userId })).map(
        async (rec) => await rec.populate('restaurant')
      );
      if (!favorites.length) {
        return null;
      }

      const resultArray: Favorite[] = [];

      for (const favorite of favorites) {
        const restaurant = await favorite;

        resultArray.push(restaurant);
      }
      return resultArray;
    })();

    if (!favoritesArray) {
      return null;
    }

    const normalizedResponse = {
      _user_id: favoritesArray[0]._user_id,
      restaurants: favoritesArray.map((favorite) => favorite.restaurant)
    };

    return normalizedResponse;
  }
}

const FavoriteModel = getModelForClass(Favorite);

export default FavoriteModel;
