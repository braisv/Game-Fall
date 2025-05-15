"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Category;
(function (Category) {
    Category["onSale"] = "On Sale";
    Category["new"] = "New";
    Category["recommended"] = "Recommended";
})(Category || (exports.Category = Category = {}));
const GameSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    platform: [{ type: String }],
    release: String,
    genre: [{ type: String }],
    image: [{ type: String }],
    description: String,
    companies: [{ type: String }],
    screenshots: [{ type: String }],
    similars: [{ type: String }],
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
const Game = mongoose_1.default.model('Game', GameSchema);
exports.default = Game;
//# sourceMappingURL=game.model.js.map