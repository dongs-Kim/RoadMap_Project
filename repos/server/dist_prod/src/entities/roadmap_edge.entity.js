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
exports.RoadmapEdge = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const roadmap_entity_1 = require("./roadmap.entity");
let RoadmapEdge = class RoadmapEdge {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 22 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 22 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "sourceHandle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 22 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "target", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('char', { length: 7 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], RoadmapEdge.prototype, "lineType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roadmap_entity_1.Roadmap, (roadmap) => roadmap.RoadmapEdges, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", roadmap_entity_1.Roadmap)
], RoadmapEdge.prototype, "Roadmap", void 0);
RoadmapEdge = __decorate([
    (0, typeorm_1.Entity)()
], RoadmapEdge);
exports.RoadmapEdge = RoadmapEdge;
//# sourceMappingURL=roadmap_edge.entity.js.map