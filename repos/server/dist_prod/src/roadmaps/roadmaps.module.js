"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapsModule = void 0;
const common_1 = require("@nestjs/common");
const roadmaps_service_1 = require("./roadmaps.service");
const roadmaps_controller_1 = require("./roadmaps.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const roadmap_item_entity_1 = require("../entities/roadmap_item.entity");
const roadmap_edge_entity_1 = require("../entities/roadmap_edge.entity");
let RoadmapsModule = class RoadmapsModule {
};
RoadmapsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, roadmap_entity_1.Roadmap, roadmap_item_entity_1.RoadmapItem, roadmap_edge_entity_1.RoadmapEdge]),
        ],
        controllers: [roadmaps_controller_1.RoadmapsController],
        providers: [roadmaps_service_1.RoadmapsService],
    })
], RoadmapsModule);
exports.RoadmapsModule = RoadmapsModule;
//# sourceMappingURL=roadmaps.module.js.map