import mongoose, {Schema, Document} from 'mongoose';

export interface IGame extends Document {
  _id: string;
}

export enum Role {
  user = 'user',
  admin = 'admin',
}

export interface Address extends Document {
  name: String;
  street: String;
  buildingNumber: Number;
  floor: Number;
  zipCode: Number;
  country: String;
  city: String;
}

export interface IUser extends Document {
  username: String;
  password: String;
  name: String;
  surname: String;
  role: Role;
  image: String;
  email: String;
  phone: String;
  address: Address;
  chart: IGame['_id'][];
  purchases: IGame['_id'][];
  wishlist: IGame['_id'][];
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    name: String,
    surname: String,
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.user,
    },
    image: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,

    address: {
      name: String,
      street: String,
      buildingNumber: Number,
      floor: Number,
      zipCode: Number,
      country: String,
      city: String,
    },
    chart: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    purchases: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any): void {
        delete ret.password;
        ret.id = doc._id;
        delete ret._id;
      },
    },
  },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
