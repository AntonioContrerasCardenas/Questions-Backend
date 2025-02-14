"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const UsersSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        validate: {
            validator: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: 'Name must only contain letters and spaces',
        },
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        match: [/\d/, 'Password must contain at least one number'],
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});
UsersSchema.virtual('question', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'userId',
});
UsersSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const saltRounds = 10;
        const hash = await bcrypt_1.default.hash(user.password, saltRounds);
        user.password = hash;
    }
    next();
});
UsersSchema.methods.comparePassword = async function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
UsersSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({ _id: user._id.toString(), email: user.email }, config_1.JWT_SECRET || 'secreto', { expiresIn: '2d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
exports.User = (0, mongoose_1.model)('User', UsersSchema);
