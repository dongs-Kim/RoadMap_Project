"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnResourceModule = void 0;
const common_1 = require("@nestjs/common");
const learn_resource_service_1 = require("./learn_resource.service");
const learn_resource_controller_1 = require("./learn_resource.controller");
const typeorm_1 = require("@nestjs/typeorm");
const learn_resource_1 = require("../entities/learn_resource");
const user_entity_1 = require("../entities/user.entity");
let LearnResourceModule = class LearnResourceModule {
};
LearnResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([learn_resource_1.LearnResource, user_entity_1.User])],
        controllers: [learn_resource_controller_1.LearnResourceController],
        providers: [learn_resource_service_1.LearnResourceService],
    })
], LearnResourceModule);
exports.LearnResourceModule = LearnResourceModule;
//# sourceMappingURL=learn_resource.module.js.map