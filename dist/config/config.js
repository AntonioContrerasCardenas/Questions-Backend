"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = void 0;
process.loadEnvFile();
_a = process.env, exports.PORT = _a.PORT, exports.MONGO_URI = _a.MONGO_URI, _b = _a.JWT_SECRET, exports.JWT_SECRET = _b === void 0 ? 'JHSBDkajhsdb832bre!@#213bhsjdbasl//' : _b;
