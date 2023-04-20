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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnResourceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const short_uuid_1 = __importDefault(require("short-uuid"));
const lodash_1 = __importDefault(require("lodash"));
const learn_resource_1 = require("../entities/learn_resource");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const util_1 = require("../common/util");
const PAGE_SIZE = 10;
let LearnResourceService = class LearnResourceService {
    constructor(learnResourceRepository, usersRepository) {
        this.learnResourceRepository = learnResourceRepository;
        this.usersRepository = usersRepository;
    }
    async create(user, createLearnResourceDto) {
        var _a, _b;
        const id = (_a = createLearnResourceDto.id) !== null && _a !== void 0 ? _a : short_uuid_1.default.generate();
        if (createLearnResourceDto.mode === 'modify') {
            const existRoadmap = await this.learnResourceRepository.findOne({
                where: { id: createLearnResourceDto.id },
                relations: {
                    User: true,
                },
            });
            if (!existRoadmap) {
                throw new common_1.BadRequestException();
            }
            if (existRoadmap.User.id !== user.id) {
                throw new common_1.ForbiddenException();
            }
        }
        if (!createLearnResourceDto.name || !createLearnResourceDto.category) {
            throw new common_1.BadRequestException();
        }
        const { contents, contentsImages } = (0, util_1.moveTempImageToContents)(id, createLearnResourceDto.temp_images, createLearnResourceDto.contents);
        createLearnResourceDto.contents = contents;
        createLearnResourceDto.contents_images = (0, util_1.getImagesInContents)([...((_b = createLearnResourceDto.contents_images) !== null && _b !== void 0 ? _b : []), ...contentsImages], createLearnResourceDto.contents);
        const learnResource = new learn_resource_1.LearnResource();
        learnResource.id = id;
        learnResource.name = createLearnResourceDto.name;
        learnResource.contents = createLearnResourceDto.contents;
        learnResource.url = createLearnResourceDto.url;
        learnResource.category = createLearnResourceDto.category;
        learnResource.contents_images = createLearnResourceDto.contents_images;
        learnResource.User = user;
        await this.learnResourceRepository.save(learnResource);
        return true;
    }
    async getLearnResources(category, keyword, user_id, sort, sortType, page, pageSize) {
        page = page !== null && page !== void 0 ? page : 1;
        pageSize = pageSize !== null && pageSize !== void 0 ? pageSize : PAGE_SIZE;
        const where = [];
        if (keyword) {
            where.push({ category: (0, typeorm_2.ILike)(`%${keyword}%`) });
            where.push({ name: (0, typeorm_2.ILike)(`%${keyword}%`) });
            where.push({ contents: (0, typeorm_2.ILike)(`%${keyword}%`) });
            where.push({ User: { id: (0, typeorm_2.ILike)(`%${keyword}%`) } });
        }
        if (category) {
            if (lodash_1.default.isEmpty(where)) {
                where.push({ category: category });
            }
            else {
                lodash_1.default.remove(where, (w) => {
                    const keys = lodash_1.default.keys(w);
                    return keys.length === 1 && keys[0] === 'category';
                });
                where.forEach((w) => (w.category = category));
            }
        }
        if (user_id) {
            if (lodash_1.default.isEmpty(where)) {
                where.push({ User: { id: user_id } });
            }
            else {
                lodash_1.default.remove(where, (w) => {
                    const keys = lodash_1.default.keys(w);
                    return keys.length === 1 && keys[0] === 'User';
                });
                where.forEach((w) => (w.User = { id: user_id }));
            }
        }
        if (sort === 'like') {
            const learnResources = await this.learnResourceRepository.find({
                where: lodash_1.default.isEmpty(where) ? undefined : where,
                relations: {
                    LikeUsers: true,
                    User: true,
                },
            });
            const ascSorted = lodash_1.default.sortBy(learnResources.map((resource) => {
                const { LikeUsers, User } = resource, rest = __rest(resource, ["LikeUsers", "User"]);
                return Object.assign(Object.assign({}, rest), { like: LikeUsers.length, user_id: User.id, user_nickname: User.nickname });
            }), 'like');
            return {
                items: (sortType === 'asc' ? ascSorted : ascSorted.reverse()).slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize),
                totalCount: ascSorted.length,
            };
        }
        const [learnResources, total] = await this.learnResourceRepository.findAndCount({
            where: lodash_1.default.isEmpty(where) ? undefined : where,
            relations: {
                LikeUsers: true,
                User: true,
            },
            order: {
                created_at: sortType ? 'asc' : 'desc',
            },
            skip: pageSize * (page - 1),
            take: pageSize,
        });
        return {
            items: learnResources.map((resource) => {
                const { LikeUsers, User } = resource, rest = __rest(resource, ["LikeUsers", "User"]);
                return Object.assign(Object.assign({}, rest), { like: LikeUsers.length, user_id: User.id, user_nickname: User.nickname, user_image: User.image });
            }),
            totalCount: total,
        };
    }
    async getOne(id) {
        const learnResource = await this.learnResourceRepository.findOne({
            where: {
                id,
            },
            relations: {
                LikeUsers: true,
                User: true,
            },
        });
        if (!learnResource) {
            return null;
        }
        const { LikeUsers, User } = learnResource, rest = __rest(learnResource, ["LikeUsers", "User"]);
        return Object.assign(Object.assign({}, rest), { like: LikeUsers.length, user_id: User.id, user_nickname: User.nickname });
    }
    async isLike(id, user) {
        const likeUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: { LikeLearnResources: true },
        });
        if (!likeUser) {
            return false;
        }
        return likeUser.LikeLearnResources.some((resource) => resource.id === id);
    }
    async like(id, user) {
        const resource = await this.learnResourceRepository.findOne({
            where: { id },
            relations: {
                LikeUsers: true,
            },
        });
        if (!resource) {
            return;
        }
        if (resource.LikeUsers.some((x) => x.id === user.id)) {
            return;
        }
        resource.LikeUsers.push(user);
        await this.learnResourceRepository.save(resource);
    }
    async unlike(roadmap_id, user) {
        const resource = await this.learnResourceRepository.findOne({
            where: { id: roadmap_id },
            relations: {
                LikeUsers: true,
            },
        });
        if (!resource) {
            return;
        }
        if (!resource.LikeUsers.some((x) => x.id === user.id)) {
            return;
        }
        resource.LikeUsers = resource.LikeUsers.filter((x) => x.id !== user.id);
        await this.learnResourceRepository.save(resource);
    }
    async delete(id, user) {
        const learnResource = await this.learnResourceRepository.findOne({
            where: {
                id,
            },
            relations: {
                User: true,
            },
        });
        if (!learnResource) {
            throw new common_1.BadRequestException();
        }
        if (learnResource.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.learnResourceRepository.delete(id);
        await (0, util_1.removeContentsImage)(id);
        return true;
    }
};
LearnResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(learn_resource_1.LearnResource)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LearnResourceService);
exports.LearnResourceService = LearnResourceService;
//# sourceMappingURL=learn_resource.service.js.map