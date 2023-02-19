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
exports.Reply = void 0;
const typeorm_1 = require("typeorm");
const roadmap_entity_1 = require("./roadmap.entity");
const user_entity_1 = require("./user.entity");
let Reply = class Reply {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 22 }),
    __metadata("design:type", String)
], Reply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP', update: false }),
    __metadata("design:type", Date)
], Reply.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.Replies),
    __metadata("design:type", user_entity_1.User)
], Reply.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roadmap_entity_1.Roadmap, (roadmap) => roadmap.Replies, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", roadmap_entity_1.Roadmap)
], Reply.prototype, "Roadmap", void 0);
Reply = __decorate([
    (0, typeorm_1.Entity)()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=reply.entity.js.map