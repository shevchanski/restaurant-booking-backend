import {
  Ref,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

import { Restaurant } from './restaurant.db';

@modelOptions({
  schemaOptions: { collection: 'restaurant-photos', timestamps: true }
})
export class RestaurantPhoto {
  @prop({ ref: () => Restaurant, required: true })
  public _restaurant_id!: Ref<Restaurant>;

  @prop({ type: () => String, required: true })
  public location!: string;

  @prop({ type: () => Boolean, default: false })
  public isDefault?: boolean;

  @prop({ type: () => Boolean, default: false })
  public isDelete?: boolean;
}

const RestaurantPhotoModel = getModelForClass(RestaurantPhoto);

export default RestaurantPhotoModel;
