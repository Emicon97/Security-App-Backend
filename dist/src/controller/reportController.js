"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = __importDefault(require("../models/Report"));
function sendReport(title, sender, receiver) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('entré');
        const report = yield Report_1.default.create({
            title,
            sender,
            receiver
        });
        yield report.save();
        return report;
    });
}
function getReportsById(id, relation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (relation === 'sender') {
            console.log('acá');
            return yield Report_1.default.find({ sender: id });
        }
        else if (relation === 'receiver') {
            return yield Report_1.default.find({ receiver: id });
        }
        else {
            let sent = yield Report_1.default.find({ sender: id });
            let received = yield Report_1.default.find({ receiver: id });
            return [...sent, ...received];
        }
    });
}
function getSenderOrReceiver(id, relation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (relation === 'sender')
            return yield getSender(id);
        else if (relation === 'receiver')
            return yield getReceiver(id);
    });
}
function getSender(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sender = yield Report_1.default.findById(id).populate({ path: 'sender' });
        return sender;
    });
}
function getReceiver(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const receiver = yield Report_1.default.findById(id).populate({ path: 'receiver' });
        return receiver;
    });
}
exports.default = {
    sendReport,
    getReportsById,
    getSenderOrReceiver
};
