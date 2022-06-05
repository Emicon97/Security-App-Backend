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
const app_1 = __importDefault(require("./src/app"));
const index_1 = __importDefault(require("./src/db/index"));
// import dotenv from 'dotenv'
// dotenv.config()
// const port = process.env.PORT || 3000;
app_1.default.set('port', process.env.PORT || 3001);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, index_1.default)();
        // app.listen(app.get('port'), () => {
        app_1.default.listen(app_1.default.get("port"), () => {
            console.log(`server on port`);
            // console.log(`server on port`, app.get('port'))
        });
    });
}
main();
