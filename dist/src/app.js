"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes = require('./routes/index');
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
// app.use(cors());
// app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//    res.header('Access-Control-Allow-Credentials', 'true');
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//    next();
//  });
app.use((req, res, next) => {
    next();
}, (0, cors_1.default)({ maxAge: 84600 }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', routes);
exports.default = app;
