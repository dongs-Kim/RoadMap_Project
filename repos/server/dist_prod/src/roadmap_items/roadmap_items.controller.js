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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapItemsController = void 0;
const common_1 = require("@nestjs/common");
const roadmap_items_service_1 = require("./roadmap_items.service");
const create_roadmap_item_dto_1 = require("./dto/create-roadmap_item.dto");
const update_roadmap_item_dto_1 = require("./dto/update-roadmap_item.dto");
const swagger_1 = require("@nestjs/swagger");
let RoadmapItemsController = class RoadmapItemsController {
    constructor(roadmapItemsService) {
        this.roadmapItemsService = roadmapItemsService;
    }
    create(createRoadmapItemDto) {
        return this.roadmapItemsService.create(createRoadmapItemDto);
    }
    findAll() {
        return this.roadmapItemsService.findAll();
    }
    findOne(id) {
        return this.roadmapItemsService.findOne(+id);
    }
    update(id, updateRoadmapItemDto) {
        return this.roadmapItemsService.update(+id, updateRoadmapItemDto);
    }
    remove(id) {
        return this.roadmapItemsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_roadmap_item_dto_1.CreateRoadmapItemDto]),
    __metadata("design:returntype", void 0)
], RoadmapItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoadmapItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoadmapItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_roadmap_item_dto_1.UpdateRoadmapItemDto]),
    __metadata("design:returntype", void 0)
], RoadmapItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoadmapItemsController.prototype, "remove", null);
RoadmapItemsController = __decorate([
    (0, swagger_1.ApiTags)('roadmap-items'),
    (0, common_1.Controller)('roadmap-items'),
    __metadata("design:paramtypes", [roadmap_items_service_1.RoadmapItemsService])
], RoadmapItemsController);
exports.RoadmapItemsController = RoadmapItemsController;
//# sourceMappingURL=roadmap_items.controller.js.map