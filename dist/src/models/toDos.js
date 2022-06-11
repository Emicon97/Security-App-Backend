"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDos = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
const report_1 = require("./report");
const TODO_STATUS = ['left', 'done', 'postponed'];
const PRIORITIES = ['urgent', 'high', 'regular', 'low'];
class ToDos {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ToDos.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ToDos.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: TODO_STATUS, default: 'left' }),
    __metadata("design:type", String)
], ToDos.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.Supervisor || user_1.Watcher }),
    __metadata("design:type", Object)
], ToDos.prototype, "responsible", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: PRIORITIES, required: true }),
    __metadata("design:type", String)
], ToDos.prototype, "priority", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => report_1.Report }),
    __metadata("design:type", Array)
], ToDos.prototype, "report", void 0);
exports.ToDos = ToDos;
const toDosModel = (0, typegoose_1.getModelForClass)(ToDos);
exports.default = toDosModel;
