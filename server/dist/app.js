"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const package_json_1 = require("../package.json");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const games_js_1 = __importDefault(require("./routes/games.js"));
const igdbApi_js_1 = __importDefault(require("./routes/igdbApi.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const AppError_js_1 = require("./utils/AppError.js");
require("./services/passport.js");
dotenv_1.default.config();
const MongoStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const { MONGO_URL } = process.env;
mongoose_1.default.Promise = Promise;
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    console.log(`Connected to ${package_json_1.name} Mongo DB`);
})
    .catch((err) => {
    console.error(`Error connecting to ${package_json_1.name} Mongo DB`, err);
});
// const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
const whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://gamesfall.herokuapp.com',
];
const corsOptions = {
    origin: function (origin, callback) {
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use((0, cookie_parser_1.default)());
const express_session = (0, express_session_1.default)({
    secret: `${package_json_1.name} react auth passport secret shh`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 2419200000,
        // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    },
    store: new MongoStore({
        uri: MONGO_URL,
        collection: 'Game Fall Session Store Collection',
    }),
});
app.use(express_session);
app.use(passport_1.default.initialize());
app.use(passport_1.default.authenticate('session'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, 'public', 'favicon.ico')));
app.locals.title = `Backend ${package_json_1.name}`;
app.use('/api/auth', auth_1.default);
app.use('/api/db', igdbApi_js_1.default);
app.use('/api/games', games_js_1.default);
app.use('/api/user', user_js_1.default);
app.all('*', (req, res, next) => {
    next(new AppError_js_1.NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});
app.use(errorHandler_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map