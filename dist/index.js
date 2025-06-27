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
// import { Request, Response, NextFunction } from "express";
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./v1/config/logging"));
const config_1 = require("./v1/config/config");
const loaders_1 = __importDefault(require("./v1/loaders"));
const exitHandler = (server) => {
    if (server) {
        server.close(() => {
            logging_1.default.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unExpectedErrorHandler = (server) => {
    return function (error) {
        logging_1.default.error(error);
        exitHandler(server);
    };
};
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield (0, loaders_1.default)(app);
    const httpServer = http_1.default.createServer(app);
    const server = httpServer.listen(config_1.PORT, () => {
        logging_1.default.info(`Server listening on port ${config_1.PORT}`);
    });
    process.on("uncaughtException", unExpectedErrorHandler(server));
    process.on("unhandledRejection", unExpectedErrorHandler(server));
    process.on("SIGTERM", () => {
        logging_1.default.info("SIGTERM received");
        if (server) {
            server.close();
        }
    });
});
startServer();
