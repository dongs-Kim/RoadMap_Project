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
exports.RoadmapsController = void 0;
const common_1 = require("@nestjs/common");
const roadmaps_service_1 = require("./roadmaps.service");
const swagger_1 = require("@nestjs/swagger");
const logged_in_guard_1 = require("../auth/logged-in.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_entity_1 = require("../entities/user.entity");
const save_roadmap_dto_1 = require("./dto/save-roadmap.dto");
const platform_express_1 = require("@nestjs/platform-express");
const thumbnail_upload_option_1 = require("./thumbnail-upload.option");
const temp_image_upload_option_1 = require("./temp-image-upload.option");
let RoadmapsController = class RoadmapsController {
    constructor(roadmapsService) {
        this.roadmapsService = roadmapsService;
    }
    create(user, saveRoadmapDto) {
        return this.roadmapsService.save(user, saveRoadmapDto);
    }
    findMyAll(user) {
        return this.roadmapsService.findMyAll(user);
    }
    findHomeByLimit(category) {
        return this.roadmapsService.findHomeListByCount(category);
    }
    findCategory(category) {
        return this.roadmapsService.findCategory(category);
    }
    findByUser(id) {
        return this.roadmapsService.findByUser(id);
    }
    findOne(id, mode, user) {
        return this.roadmapsService.findOneSet(id, mode, user);
    }
    remove(user, id) {
        return this.roadmapsService.remove(id, user);
    }
    like(user, id) {
        return this.roadmapsService.like(id, user);
    }
    unlike(user, id) {
        return this.roadmapsService.unlike(id, user);
    }
    isLike(user, id) {
        return this.roadmapsService.isLike(id, user);
    }
    async uploadThumbnail(file) {
        const url = `/${thumbnail_upload_option_1.UPLOAD_THUMBNAIL_PATH}/${file.filename}`;
        return url;
    }
    async uploadTempImage(file) {
        const url = `/${temp_image_upload_option_1.UPLOAD_TEMP_IMAGE_PATH}/${file.filename}`;
        return url;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 저장' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, save_roadmap_dto_1.SaveRoadmapDto]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '내 로드맵 조회' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Get)('list/my'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "findMyAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 홈화면 조회' }),
    (0, common_1.Get)('list/home/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "findHomeByLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 카테고리별 조회' }),
    (0, common_1.Get)('list/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "findCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저별 로드맵 조회' }),
    (0, common_1.Get)('list/User/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "findByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 로드맵 조회' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('mode')),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 삭제' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 좋아요 체크' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(':id/like'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "like", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 좋아요 해제' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)(':id/unlike'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "unlike", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 좋아요 여부' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Get)(':id/isLike'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], RoadmapsController.prototype, "isLike", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '썸네일 업로드' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', thumbnail_upload_option_1.thumbnailOption)),
    (0, common_1.Post)(':id/thumbnail'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoadmapsController.prototype, "uploadThumbnail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '임시 이미지 업로드' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', temp_image_upload_option_1.tempImageOption)),
    (0, common_1.Post)('tempImage'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoadmapsController.prototype, "uploadTempImage", null);
RoadmapsController = __decorate([
    (0, swagger_1.ApiTags)('roadmaps'),
    (0, common_1.Controller)('api/roadmaps'),
    __metadata("design:paramtypes", [roadmaps_service_1.RoadmapsService])
], RoadmapsController);
exports.RoadmapsController = RoadmapsController;
//# sourceMappingURL=roadmaps.controller.js.map