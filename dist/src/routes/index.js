"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { Router } = require('express');
const logIn_1 = __importDefault(require("./logIn"));
const user_1 = __importDefault(require("./user"));
const toDos_1 = __importDefault(require("./toDos"));
const report_1 = __importDefault(require("./report"));
const paginated_1 = __importDefault(require("./paginated"));
const logout_1 = __importDefault(require("./logout"));
const verification_1 = __importDefault(require("./verification"));
const environment_1 = __importDefault(require("./environment"));
const email_1 = __importDefault(require("./email"));
const router = Router();
router.use('/logout', logout_1.default);
router.use('/login', logIn_1.default);
router.use('/user', user_1.default);
router.use('/todos', toDos_1.default);
router.use('/report', report_1.default);
router.use('/paginated', paginated_1.default);
router.use('/verification', verification_1.default);
router.use('/environment', environment_1.default);
router.use('/email', email_1.default);
module.exports = router;
