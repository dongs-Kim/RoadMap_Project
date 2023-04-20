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
exports.RoadmapItem = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../common/enums");
const typeorm_1 = require("typeorm");
const roadmap_entity_1 = require("./roadmap.entity");
const learn_resource_1 = require("./learn_resource");
let RoadmapItem = class RoadmapItem {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 22 }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsIn)(Object.values(enums_1.EN_ROADMAP_ITEM_STATUS).concat(undefined)),
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsIn)(Object.values(enums_1.EN_ROADMAP_ITEM_REQUIRED).concat(undefined)),
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RoadmapItem.prototype, "positionX", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RoadmapItem.prototype, "positionY", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 7 }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "bgcolor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], RoadmapItem.prototype, "border", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RoadmapItem.prototype, "zIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoadmapItem.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], RoadmapItem.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], RoadmapItem.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], RoadmapItem.prototype, "contents_images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roadmap_entity_1.Roadmap, (roadmap) => roadmap.RoadmapItems, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", roadmap_entity_1.Roadmap)
], RoadmapItem.prototype, "Roadmap", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => learn_resource_1.LearnResource, (learnResource) => learnResource.RoadmapItems),
    __metadata("design:type", Array)
], RoadmapItem.prototype, "LearnResources", void 0);
RoadmapItem = __decorate([
    (0, typeorm_1.Entity)()
], RoadmapItem);
exports.RoadmapItem = RoadmapItem;
//# sourceMappingURL=roadmap_item.entity.js.map