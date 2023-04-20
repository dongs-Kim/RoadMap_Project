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
exports.LearnResourceController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const learn_resource_service_1 = require("./learn_resource.service");
const create_learn_resource_dto_1 = require("./dto/create-learn_resource.dto");
const user_decorator_1 = require("../common/decorators/user.decorator");
const logged_in_guard_1 = require("../auth/logged-in.guard");
let LearnResourceController = class LearnResourceController {
    constructor(learnResourceService) {
        this.learnResourceService = learnResourceService;
    }
    create(user, createLearnResourceDto) {
        return this.learnResourceService.create(user, createLearnResourceDto);
    }
    getList(category, keyword, user_id, sort, sortType, page, pageSize) {
        return this.learnResourceService.getLearnResources(category, keyword, user_id, sort, sortType, page, pageSize);
    }
    getOne(id) {
        return this.learnResourceService.getOne(id);
    }
    isLike(user, id) {
        return this.learnResourceService.isLike(id, user);
    }
    like(user, id) {
        return this.learnResourceService.like(id, user);
    }
    unlike(user, id) {
        return this.learnResourceService.unlike(id, user);
    }
    delete(user, id) {
        return this.learnResourceService.delete(id, user);
    }
};
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_learn_resource_dto_1.CreateLearnResourceDto]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('keyword')),
    __param(2, (0, common_1.Query)('user_id')),
    __param(3, (0, common_1.Query)('sort')),
    __param(4, (0, common_1.Query)('sortType')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Get)(':id/isLike'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "isLike", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(':id/like'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "like", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(':id/unlike'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "unlike", null);
__decorate([
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], LearnResourceController.prototype, "delete", null);
LearnResourceController = __decorate([
    (0, common_1.Controller)('api/learn-resource'),
    __metadata("design:paramtypes", [learn_resource_service_1.LearnResourceService])
], LearnResourceController);
exports.LearnResourceController = LearnResourceController;
//# sourceMappingURL=learn_resource.controller.js.map