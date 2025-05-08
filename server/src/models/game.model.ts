import mongoose, {Schema, Document} from 'mongoose';

export enum Category {
  onSale = 'On Sale',
  new = 'New',
  recommended = 'Recommended',
}

export interface IGame extends Document {
  name: string,
  platform: string[],
  release: string,
  genre: string[],
  image: string[],
  description: string,
  companies: string[],
  screenshots: string[],
  similars: string[],
  price: number,
  amount: number,
  category: Category,
  stock: number,
}

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    platform: [{type: String}],
    release: String,
    genre: [{type: String}],
    image: [{type: String}],
    description: String,
    companies: [{type: String}],
    screenshots: [{type: String}],
    similars: [{type: String}],
    price: Number,
    amount: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      default: Category.onSale,
    },
    stock: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Game = mongoose.model<IGame>('Game', GameSchema);

export default Game;
