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
exports.Report = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
class Report {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Report.prototype, "picture", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.Watcher || user_1.Supervisor }),
    __metadata("design:type", Object)
], Report.prototype, "sender", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.Supervisor || user_1.Boss }),
    __metadata("design:type", Object)
], Report.prototype, "receiver", void 0);
exports.Report = Report;
const reportModel = (0, typegoose_1.getModelForClass)(Report);
exports.default = reportModel;
