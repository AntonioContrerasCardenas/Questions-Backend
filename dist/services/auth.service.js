"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutAllS = exports.logOutS = exports.loginS = exports.registerS = void 0;
const Users_1 = require("../models/Users");
const registerS = async (name, email, password) => {
    const existUser = await Users_1.User.findOne({ email });
    if (existUser) {
        throw new Error('User already exists');
    }
    const user = new Users_1.User({ name, email, password });
    await user.save();
    return user.toObject();
};
exports.registerS = registerS;
const loginS = async (email, password) => {
    const user = await Users_1.User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = await user.generateAuthToken();
    console.log({ token });
    return { user: user.toObject(), token };
};
exports.loginS = loginS;
const logOutS = async (tokenS, user) => {
    user.tokens = user.tokens.filter((token) => token.token !== tokenS);
    await user.save();
};
exports.logOutS = logOutS;
const logOutAllS = async (user) => {
    user.tokens = [];
    await user.save();
};
exports.logOutAllS = logOutAllS;
