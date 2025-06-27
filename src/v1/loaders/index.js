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
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("../../express"));
const logging_1 = __importDefault(require("../config/logging"));
const initApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        logging_1.default.info(`Mongoose initiated.`);
        yield (0, express_1.default)(app);
        logging_1.default.info(`Express app initiated.`);
    }
    catch (error) {
        console.error('Error initializing app:', error);
        throw error;
    }
});
exports.default = initApp;
