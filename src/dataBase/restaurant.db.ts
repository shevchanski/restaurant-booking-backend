import {
  SubDocumentType,
  getModelForClass,
  modelOptions,
  mongoose,
  prop
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { _id: false } })
export class Address {
  @prop({ type: () => String, required: true, trim: true })
  public city!: string;

  @prop({ type: () => String, required: true, trim: true })
  public country!: string;

  @prop({ type: () => String, required: true, trim: true })
  public post_code!: string;

  @prop({ type: () => String, required: true, trim: true })
  public street_address!: string;

  @prop({ type: () => String, trim: true })
  public region?: string;
}

@modelOptions({
  schemaOptions: {
    id: false,
    versionKey: false,
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform: (doc, ret, options) => {
        delete ret.updatedAt;
        return ret;
      }
    },
    toObject: {
      flattenObjectIds: true
    }
  }
})
export class Restaurant extends TimeStamps {
  @prop({ type: () => String, required: true, trim: true })
  public title!: string;

  @prop({ type: () => String, trim: true })
  public description?: string;

  @prop({ type: () => String, trim: true })
  public website?: string | undefined;

  @prop({ type: () => Address, required: true })
  public address!: SubDocumentType<Address>;

  @prop({ type: () => [String], required: true, default: [] })
  public cuisine!: mongoose.Types.Array<string>;

  @prop({ type: () => Number, required: true, min: 0, max: 5 })
  public rating!: number;

  @prop({ type: () => String })
  public phoneNumber?: string;
}

const RestaurantModel = getModelForClass(Restaurant);

export default RestaurantModel;
