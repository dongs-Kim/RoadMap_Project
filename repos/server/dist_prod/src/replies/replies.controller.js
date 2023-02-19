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
exports.RepliesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const replies_service_1 = require("./replies.service");
const logged_in_guard_1 = require("../auth/logged-in.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_entity_1 = require("../entities/user.entity");
const save_roadmap_reply_dto_1 = require("./dto/save-roadmap-reply.dto");
const update_reply_dto_1 = require("./dto/update-reply.dto");
let RepliesController = class RepliesController {
    constructor(repliesService) {
        this.repliesService = repliesService;
    }
    saveReply(user, reply) {
        return this.repliesService.saveReply(reply.roadmap_id, user, reply.contents);
    }
    getReplies(id) {
        return this.repliesService.getReplies(id);
    }
    update(user, id, updateReplyDto) {
        return this.repliesService.update(id, updateReplyDto.contents, user);
    }
    remove(user, id) {
        return this.repliesService.remove(id, user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 작성' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, save_roadmap_reply_dto_1.SaveRoadmapReplyDto]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "saveReply", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 조회' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "getReplies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 수정' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, update_reply_dto_1.UpdateReplyDto]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "remove", null);
RepliesController = __decorate([
    (0, swagger_1.ApiTags)('replies'),
    (0, common_1.Controller)('api/replies'),
    __metadata("design:paramtypes", [replies_service_1.RepliesService])
], RepliesController);
exports.RepliesController = RepliesController;
//# sourceMappingURL=replies.controller.js.map