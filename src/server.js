"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
// Import the 'express' module
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
// Create an Express application
const app = (0, express_1.default)();
exports.app = app;
// Set the port number for the server
const port = 3000;
const logger = (0, pino_1.default)({ name: "server start" });
exports.logger = logger;
// Define a route for the root path ('/')
app.get('/', (req, res) => {
    // Send a response to the client
    res.send('Hello, TypeScript + Node.js + Express!');
});
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
