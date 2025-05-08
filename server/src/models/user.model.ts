import mongoose, {Schema, Document} from 'mongoose';
import { IGame } from './game.model';

export enum Role {
  user = 'user',
  admin = 'admin',
}

export interface Address extends Document {
  name: string;
  street: string;
  buildingNumber: number;
  floor: number;
  zipCode: number;
  country: string;
  city: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  surname: string;
  role: Role;
  image: string;
  email: string;
  phone: string;
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
