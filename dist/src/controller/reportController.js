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
exports.getSenderOrReceiver = exports.getReportsById = exports.sendReport = void 0;
const reports_1 = __importDefault(require("../models/reports"));
const toDos_1 = __importDefault(require("../models/toDos"));
const userController_1 = require("./userController");
function sendReport(title, sender, id, description, picture) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var receiver = yield (0, userController_1.getSuperior)(sender);
        }
        catch (err) {
            throw new Error(err.message);
        }
        var senderType = yield (0, userController_1.roleIdentifier)(sender);
        senderType = senderType.charAt(0).toUpperCase();
        var receiverType;
        senderType === 'Watcher' ?
            receiverType = 'Supervsor' : receiverType = 'Boss';
        const report = yield reports_1.default.create({
            title,
            description: description ? description : undefined,
            picture: picture ? picture : undefined,
            senderType,
            sender,
            receiverType,
            receiver
        });
        yield report.save();
        yield toDos_1.default.findByIdAndUpdate(id, { $push: { report } });
        return report;
    });
}
exports.sendReport = sendReport;
function getReportsById(id, relation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (relation === 'sender') {
            return yield reports_1.default.find({ sender: id }).populate({ path: 'receiver' });
        }
        else if (relation === 'receiver') {
            return yield reports_1.default.find({ receiver: id }).populate({ path: 'sender' });
        }
        else {
            let sent = yield reports_1.default.find({ sender: id }).populate({ path: 'receiver' });
            let received = yield reports_1.default.find({ receiver: id }).populate({ path: 'sender' });
            return [...sent, ...received];
        }
    });
}
exports.getReportsById = getReportsById;
function getSenderOrReceiver(id, relation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (relation === 'sender')
            return yield getSender(id);
        else if (relation === 'receiver')
            return yield getReceiver(id);
    });
}
exports.getSenderOrReceiver = getSenderOrReceiver;
function getSender(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sender = yield reports_1.default.findById(id).populate({ path: 'sender' });
        return sender;
    });
}
function getReceiver(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const receiver = yield reports_1.default.findById(id).populate({ path: 'receiver' });
        return receiver;
    });
}
