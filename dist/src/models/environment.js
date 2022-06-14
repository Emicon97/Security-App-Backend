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
exports.Environment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
class Environment {
}
__decorate([
    (0, typegoose_1.prop)({ unique: true, required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Environment.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_1.Supervisor }),
    __metadata("design:type", Object)
], Environment.prototype, "supervisor", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_1.Watcher }),
    __metadata("design:type", Object)
], Environment.prototype, "watcher", void 0);
exports.Environment = Environment;
const environmentModel = (0, typegoose_1.getModelForClass)(Environment);
exports.default = environmentModel;
// controles 
// -crear
// -Borrar
// -Añadir sup or watch (by:Id)
