"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tracker_routes_1 = __importDefault(require("./v1/routes/tracker.routes"));
const config_1 = require("./v1/config/config");
const logging_1 = __importDefault(require("./v1/config/logging"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
function setup(app) {
    return __awaiter(this, void 0, void 0, function* () {
        if (config_1.NODE_ENV === 'production') {
            app.use((0, cors_1.default)({ origin: 'url' }));
            app.options('*', (0, cors_1.default)({ origin: 'url' }));
        }
        else {
            app.use((0, cors_1.default)());
            app.all('/*splat', (0, cors_1.default)());
        }
        app.use(express_1.default.json());
        app.use("/api/v1/tracking", tracker_routes_1.default);
        app.get('/', (req, res) => {
            res.send('wecome to the API world');
        });
        app.use('/404', (req, res) => {
            res.status(404).send({ message: 'Route not found' });
        });
        // app.all('/{*any}', async (req, res) => {
        //   res.status(404).send({ message: 'Not Found' });
        // });
        app.use((req, res, next) => {
            logging_1.default.info(`incomming -> method: [${req.method}] - url: [${req.url}] - ip: [${req.socket.remoteAddress}]`);
            res.on('finish', () => {
                logging_1.default.info(`incomming -> method: [${req.method}] - url: [${req.url}] - ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
            });
            next();
        });
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((req, res, next) => {
            try {
                // Allow requests from all origins
                // Will be configured for App specific domain later.
                res.header('Access-Control-Allow-Origin', '*');
                // Allow specific HTTP methods
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                // Allow specific custom headers (if needed)
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                // Allow credentials (if your app uses credentials)
                res.header('Access-Control-Allow-Credentials', 'true');
                // Handle preflight requests by responding with 200 status
                if (req.method === 'OPTIONS') {
                    res.status(200).end();
                }
                else {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
        return app;
    });
}
