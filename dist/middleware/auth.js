"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Users_1 = require("../models/Users");
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        const user = await Users_1.User.findOne({
            _id: decoded._id,
            'tokens.token': token,
        });
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        console.log(error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).send({ error: 'Token expired' });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }
        res.status(401).send({ error: 'Authentication failed' });
    }
};
exports.auth = auth;
