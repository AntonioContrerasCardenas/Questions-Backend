"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI);
        console.log('Successfully connected to DB');
    }
    catch (error) {
        console.error('Could not connect to DB', error);
        process.exit(1);
    }
};
exports.default = connectToDatabase;
