"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const logIn_1 = __importDefault(require("./logIn"));
const user_1 = __importDefault(require("./user"));
const toDos_1 = __importDefault(require("./toDos"));
const report_1 = __importDefault(require("./report"));
const paginated_1 = __importDefault(require("./paginated"));
const router = Router();
router.use('/login', logIn_1.default);
router.use('/user', user_1.default);
router.use('/todos', toDos_1.default);
router.use('/report', report_1.default);
router.use('/paginated', paginated_1.default);
module.exports = router;
