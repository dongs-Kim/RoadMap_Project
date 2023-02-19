"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapItemsModule = void 0;
const common_1 = require("@nestjs/common");
const roadmap_items_service_1 = require("./roadmap_items.service");
const roadmap_items_controller_1 = require("./roadmap_items.controller");
const typeorm_1 = require("@nestjs/typeorm");
const roadmap_item_entity_1 = require("../entities/roadmap_item.entity");
let RoadmapItemsModule = class RoadmapItemsModule {
};
RoadmapItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([roadmap_item_entity_1.RoadmapItem])],
        controllers: [roadmap_items_controller_1.RoadmapItemsController],
        providers: [roadmap_items_service_1.RoadmapItemsService],
    })
], RoadmapItemsModule);
exports.RoadmapItemsModule = RoadmapItemsModule;
//# sourceMappingURL=roadmap_items.module.js.map