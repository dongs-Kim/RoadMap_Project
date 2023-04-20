"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnResourceRepliesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const learn_resource_1 = require("../entities/learn_resource");
const learn_resource_reply_entity_1 = require("../entities/learn_resource_reply.entity");
const learn_resource_replies_controller_1 = require("./learn_resource_replies.controller");
const learn_resource_replies_service_1 = require("./learn_resource_replies.service");
let LearnResourceRepliesModule = class LearnResourceRepliesModule {
};
LearnResourceRepliesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([learn_resource_reply_entity_1.LearnResourceReply, learn_resource_1.LearnResource])],
        controllers: [learn_resource_replies_controller_1.LearnResourceRepliesController],
        providers: [learn_resource_replies_service_1.LearnResourceRepliesService],
    })
], LearnResourceRepliesModule);
exports.LearnResourceRepliesModule = LearnResourceRepliesModule;
//# sourceMappingURL=learn_resource_replies.module.js.map