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
exports.LearnResource = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const roadmap_item_entity_1 = require("./roadmap_item.entity");
const learn_resource_reply_entity_1 = require("./learn_resource_reply.entity");
let LearnResource = class LearnResource {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 22 }),
    __metadata("design:type", String)
], LearnResource.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], LearnResource.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LearnResource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], LearnResource.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], LearnResource.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], LearnResource.prototype, "contents_images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP', update: false }),
    __metadata("design:type", Date)
], LearnResource.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.LearnResources),
    __metadata("design:type", user_entity_1.User)
], LearnResource.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.LikeLearnResources, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], LearnResource.prototype, "LikeUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => roadmap_item_entity_1.RoadmapItem, (roadmapItem) => roadmapItem.LearnResources),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], LearnResource.prototype, "RoadmapItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => learn_resource_reply_entity_1.LearnResourceReply, (reply) => reply.LearnResource, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], LearnResource.prototype, "Replies", void 0);
LearnResource = __decorate([
    (0, typeorm_1.Entity)()
], LearnResource);
exports.LearnResource = LearnResource;
//# sourceMappingURL=learn_resource.js.map