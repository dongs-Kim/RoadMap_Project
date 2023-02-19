"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_PATH = exports.isProduction = void 0;
const path_1 = __importDefault(require("path"));
function isProduction() {
    return process.env.NODE_ENV === 'production';
}
exports.isProduction = isProduction;
exports.PUBLIC_PATH = process.env.NODE_ENV === 'production'
    ? path_1.default.join(__dirname, '../../public')
    : path_1.default.join(__dirname, '../public');
//# sourceMappingURL=configuration.js.map