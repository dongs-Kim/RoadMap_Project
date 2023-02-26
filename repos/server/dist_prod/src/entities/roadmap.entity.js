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
exports.Roadmap = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const enums_1 = require("../common/enums");
const reply_entity_1 = require("./reply.entity");
const roadmap_item_entity_1 = require("./roadmap_item.entity");
const roadmap_edge_entity_1 = require("./roadmap_edge.entity");
const user_entity_1 = require("./user.entity");
let Roadmap = class Roadmap {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 22 }),
    __metadata("design:type", String)
], Roadmap.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsIn)(Object.values(enums_1.EN_CATEGORY)),
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Roadmap.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Roadmap.prototype, "public", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Roadmap.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Roadmap.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Roadmap.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Roadmap.prototype, "bgcolor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP', update: false }),
    __metadata("design:type", Date)
], Roadmap.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Roadmap.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.Roadmaps),
    __metadata("design:type", user_entity_1.User)
], Roadmap.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => roadmap_item_entity_1.RoadmapItem, (roadmapItem) => roadmapItem.Roadmap, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Roadmap.prototype, "RoadmapItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => roadmap_edge_entity_1.RoadmapEdge, (roadmapEdge) => roadmapEdge.Roadmap, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Roadmap.prototype, "RoadmapEdges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.Reply, (reply) => reply.Roadmap, { cascade: true }),
    __metadata("design:type", Array)
], Roadmap.prototype, "Replies", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.LikeRoadmaps, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Roadmap.prototype, "LikeUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.StoredRoadmaps, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Roadmap.prototype, "StoringUsers", void 0);
Roadmap = __decorate([
    (0, typeorm_1.Entity)()
], Roadmap);
exports.Roadmap = Roadmap;
//# sourceMappingURL=roadmap.entity.js.map