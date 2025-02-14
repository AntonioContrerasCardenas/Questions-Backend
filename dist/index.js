"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_1 = __importDefault(require("./routes/questions"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const db_1 = __importDefault(require("./config/db"));
const seed_1 = __importDefault(require("./config/seed"));
const category_1 = __importDefault(require("./routes/category"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/questions', questions_1.default);
app.use('/api/categories', category_1.default);
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/seed', async (req, res) => {
    await (0, seed_1.default)();
    res.send('Seeded');
});
app.listen(config_1.PORT, async () => {
    console.log(`Server is running on port ${config_1.PORT}`);
    await (0, db_1.default)();
    // descomentar esta linea en caso de querer crear la base de datos
    //await seedDatabase()
});
