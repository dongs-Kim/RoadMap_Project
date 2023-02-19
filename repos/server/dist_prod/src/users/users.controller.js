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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const logged_in_guard_1 = require("../auth/logged-in.guard");
const not_logged_in_guard_1 = require("../auth/not-logged-in.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_entity_1 = require("../entities/user.entity");
const store_roadmap_dto_1 = require("./dto/store-roadmap.dto");
const platform_express_1 = require("@nestjs/platform-express");
const image_upload_option_1 = require("./image-upload.option");
const duplicate_user_dto_1 = require("./dto/duplicate-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async login(user) {
        return user;
    }
    logout(req, res) {
        req.logOut(() => {
            res.clearCookie('connect.sid', { httpOnly: true });
            res.send();
        });
    }
    async create(createUserDto, req) {
        const user = await this.usersService.create(createUserDto);
        await new Promise((resolve) => {
            req.login(user, (err) => {
                resolve();
            });
        });
        return true;
    }
    getUser(user) {
        return user;
    }
    getDuplicateID(DuplicateUserDto) {
        return this.usersService.findEmail(DuplicateUserDto.email);
    }
    update(user, updateUserDto) {
        return this.usersService.update(user.id, updateUserDto);
    }
    remove(user) {
        return this.usersService.remove(user.id);
    }
    changePassword(user, changePasswordDto) {
        return this.usersService.changePassword(user, changePasswordDto);
    }
    storeRoadmap(user, storeRoadmapDto) {
        return this.usersService.storeRoadmap(user, storeRoadmapDto.roadmap_id);
    }
    unstoreRoadmap(user, storeRoadmapDto) {
        return this.usersService.unstoreRoadmap(user, storeRoadmapDto.roadmap_id);
    }
    isStore(user, roadmap_id) {
        return this.usersService.isStore(user, roadmap_id);
    }
    findFavorite(id) {
        return this.usersService.getFavoriteRoadmaps(id);
    }
    findRoadmapByUser(id) {
        return this.usersService.findUserRoadmap(id);
    }
    async uploadProfileImage(file, user) {
        const url = `/${image_upload_option_1.UPLOAD_PROFILE_PATH}/${file.filename}`;
        return url;
    }
    async deleteProfileImage(user) {
        await this.usersService.deleteProfileImage(user);
        return true;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.UseGuards)(not_logged_in_guard_1.NotLoggedInGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자 생성' }),
    (0, common_1.UseGuards)(not_logged_in_guard_1.NotLoggedInGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '내 정보 조회' }),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'ID 중복체크' }),
    (0, common_1.UseGuards)(not_logged_in_guard_1.NotLoggedInGuard),
    (0, common_1.Post)('email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [duplicate_user_dto_1.DuplicateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getDuplicateID", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자 수정' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자 삭제' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Delete)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Patch)('change-password'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 저장' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)('store-roadmap'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        store_roadmap_dto_1.StoreRoadmapDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "storeRoadmap", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 저장 취소' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)('unstore-roadmap'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        store_roadmap_dto_1.StoreRoadmapDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unstoreRoadmap", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로드맵 저장 여부' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Get)('isStore/:roadmap_id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('roadmap_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "isStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '즐겨찾기 로드맵' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Get)('favoriteList/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findFavorite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자별 로드맵' }),
    (0, common_1.Get)('roadMapListbyUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findRoadmapByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '프로필 이미지 업로드' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', image_upload_option_1.profileImageOption)),
    (0, common_1.Post)('profile-image'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfileImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '프로필 이미지 삭제' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Delete)('profile-image'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteProfileImage", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map