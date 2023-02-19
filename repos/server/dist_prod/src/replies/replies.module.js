"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesModule = void 0;
const common_1 = require("@nestjs/common");
const replies_service_1 = require("./replies.service");
const replies_controller_1 = require("./replies.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reply_entity_1 = require("../entities/reply.entity");
const roadmap_entity_1 = require("../entities/roadmap.entity");
let RepliesModule = class RepliesModule {
};
RepliesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reply_entity_1.Reply, roadmap_entity_1.Roadmap])],
        controllers: [replies_controller_1.RepliesController],
        providers: [replies_service_1.RepliesService],
    })
], RepliesModule);
exports.RepliesModule = RepliesModule;
//# sourceMappingURL=replies.module.js.map