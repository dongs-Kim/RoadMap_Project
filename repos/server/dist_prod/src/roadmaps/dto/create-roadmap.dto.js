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
exports.CreateRoadmapDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreateRoadmapDto {
}
__decorate([
    (0, class_validator_1.IsIn)(Object.values(enums_1.EN_CATEGORY)),
    __metadata("design:type", String)
], CreateRoadmapDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Boolean)
], CreateRoadmapDto.prototype, "public", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoadmapDto.prototype, "title", void 0);
exports.CreateRoadmapDto = CreateRoadmapDto;
//# sourceMappingURL=create-roadmap.dto.js.map