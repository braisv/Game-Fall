import mongoose, { Document } from 'mongoose';
import { IGame } from './game.model';
export declare enum Role {
    user = "user",
    admin = "admin"
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
    cart: IGame['_id'][];
    purchases: IGame['_id'][];
    wishlist: IGame['_id'][];
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
