import mongoose, { Document } from 'mongoose';
export declare enum Category {
    onSale = "On Sale",
    new = "New",
    recommended = "Recommended"
}
export interface IGame extends Document {
    name: string;
    platform: string[];
    release: string;
    genre: string[];
    image: string[];
    description: string;
    companies: string[];
    screenshots: string[];
    similars: string[];
    price: number;
    amount: number;
    category: Category;
    stock: number;
}
declare const Game: mongoose.Model<IGame, {}, {}, {}, mongoose.Document<unknown, {}, IGame, {}> & IGame & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Game;
