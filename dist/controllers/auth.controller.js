"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAll = exports.logout = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { tokens, _id, password: _, ...user } = await (0, auth_service_1.registerS)(name, email, password);
        res.status(201).send(user);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map((err) => err.message)[0];
            return res.status(400).send({ error: errorMessages });
        }
        res.status(400).send({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginS)(email, password);
        const { password: _, tokens, _id, ...restUser } = user;
        res.status(200).send({ user: restUser, token });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        const { token, user } = req;
        if (!token || !user) {
            res.status(400).send({ error: 'No user foun' });
            return;
        }
        await (0, auth_service_1.logOutS)(token, user);
        res.status(200).send({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
exports.logout = logout;
const logoutAll = async (req, res) => {
    try {
        const { user } = req;
        if (!user) {
            res.status(400).send({ error: 'No user foun' });
            return;
        }
        await (0, auth_service_1.logOutAllS)(user);
        res.status(200).send({ message: 'Logged out all successfully' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
exports.logoutAll = logoutAll;
