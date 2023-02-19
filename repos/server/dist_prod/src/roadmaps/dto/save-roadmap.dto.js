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
exports.RoadmapEdgeDto = exports.RoadmapNodeDto = exports.SaveRoadmapDto = void 0;
const class_validator_1 = require("class-validator");
const create_roadmap_dto_1 = require("./create-roadmap.dto");
class SaveRoadmapDto {
}
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", create_roadmap_dto_1.CreateRoadmapDto)
], SaveRoadmapDto.prototype, "roadmap", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Array)
], SaveRoadmapDto.prototype, "nodes", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Array)
], SaveRoadmapDto.prototype, "edges", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Boolean)
], SaveRoadmapDto.prototype, "isUpdate", void 0);
exports.SaveRoadmapDto = SaveRoadmapDto;
class RoadmapNodeDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapNodeDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", Object)
], RoadmapNodeDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapNodeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoadmapNodeDto.prototype, "zIndex", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", Object)
], RoadmapNodeDto.prototype, "data", void 0);
exports.RoadmapNodeDto = RoadmapNodeDto;
class RoadmapEdgeDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapEdgeDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapEdgeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapEdgeDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapEdgeDto.prototype, "sourceHandle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoadmapEdgeDto.prototype, "target", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", Object)
], RoadmapEdgeDto.prototype, "data", void 0);
exports.RoadmapEdgeDto = RoadmapEdgeDto;
//# sourceMappingURL=save-roadmap.dto.js.map