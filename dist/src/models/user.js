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
exports.neighbourModel = exports.watcherModel = exports.supervisorModel = exports.bossModel = exports.Neighbour = exports.Watcher = exports.Supervisor = exports.Boss = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let User = class User {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], User.prototype, "dni", void 0);
__decorate([
    (0, typegoose_1.prop)({ lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "profilePic", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
User = __decorate([
    (0, typegoose_1.modelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } })
], User);
class Boss extends User {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => Supervisor }),
    __metadata("design:type", Array)
], Boss.prototype, "supervisor", void 0);
exports.Boss = Boss;
class Supervisor extends User {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Supervisor.prototype, "environment", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Boss }),
    __metadata("design:type", Array)
], Supervisor.prototype, "boss", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Watcher }),
    __metadata("design:type", Array)
], Supervisor.prototype, "watcher", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Supervisor.prototype, "workingHours", void 0);
exports.Supervisor = Supervisor;
class Watcher extends User {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Watcher.prototype, "environment", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Supervisor }),
    __metadata("design:type", Array)
], Watcher.prototype, "supervisor", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Watcher.prototype, "workingHours", void 0);
exports.Watcher = Watcher;
class Neighbour extends User {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Neighbour.prototype, "environment", void 0);
exports.Neighbour = Neighbour;
const bossModel = (0, typegoose_1.getModelForClass)(Boss);
exports.bossModel = bossModel;
const supervisorModel = (0, typegoose_1.getModelForClass)(Supervisor);
exports.supervisorModel = supervisorModel;
const watcherModel = (0, typegoose_1.getModelForClass)(Watcher);
exports.watcherModel = watcherModel;
const neighbourModel = (0, typegoose_1.getModelForClass)(Neighbour);
exports.neighbourModel = neighbourModel;
