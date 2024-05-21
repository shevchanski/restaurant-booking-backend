import { getModelForClass, prop } from '@typegoose/typegoose';

export class Restaurant {
  @prop({ type: () => String, required: true, trim: true })
  public name!: string;

  @prop({ type: () => String, trim: true })
  public description?: string;

  @prop({ type: () => String, trim: true })
  public url?: string | undefined;
}

const RestaurantModel = getModelForClass(Restaurant);

export default RestaurantModel;
