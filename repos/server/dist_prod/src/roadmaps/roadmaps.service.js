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
exports.RoadmapsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
const short_uuid_1 = __importDefault(require("short-uuid"));
const roadmap_entity_1 = require("../entities/roadmap.entity");
const roadmap_edge_entity_1 = require("../entities/roadmap_edge.entity");
const roadmap_item_entity_1 = require("../entities/roadmap_item.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const save_roadmap_dto_1 = require("./dto/save-roadmap.dto");
const thumbnail_upload_option_1 = require("./thumbnail-upload.option");
const configuration_1 = require("../config/configuration");
const learn_resource_1 = require("../entities/learn_resource");
const util_1 = require("../common/util");
const lodash_1 = __importDefault(require("lodash"));
const UPLOAD_CONTENTS_PATH = process.env.NODE_ENV === 'production'
    ? 'static/contents'
    : 'static-dev/contents';
const UPLOAD_CONTENTS_FULL_PATH = path_1.default.join(configuration_1.PUBLIC_PATH, UPLOAD_CONTENTS_PATH);
let RoadmapsService = class RoadmapsService {
    constructor(roadmapsRepository, usersRepository, dataSource) {
        this.roadmapsRepository = roadmapsRepository;
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }
    async findOneSet(id, mode, user) {
        var _a;
        const dbRoadmap = await this.roadmapsRepository.findOne({
            where: { id },
            relations: {
                RoadmapItems: {
                    LearnResources: true,
                },
                RoadmapEdges: true,
                User: true,
                LikeUsers: mode === 'view' ? true : false,
            },
        });
        if (!dbRoadmap.public && (!user || dbRoadmap.User.id !== user.id)) {
            throw new common_1.UnauthorizedException();
        }
        const roadmapDto = new save_roadmap_dto_1.SaveRoadmapDto();
        roadmapDto.user = Object.assign(Object.assign({}, dbRoadmap.User), { password: '' });
        roadmapDto.roadmap = {
            id: dbRoadmap.id,
            title: dbRoadmap.title,
            category: dbRoadmap.category,
            public: dbRoadmap.public,
            contents: dbRoadmap.contents,
            contents_images: dbRoadmap.contents_images,
            thumbnail: dbRoadmap.thumbnail,
            bgcolor: dbRoadmap.bgcolor,
            like: (_a = dbRoadmap.LikeUsers) === null || _a === void 0 ? void 0 : _a.length,
            created_at: dbRoadmap.created_at,
        };
        roadmapDto.nodes = dbRoadmap.RoadmapItems.map((item) => {
            return {
                id: item.id,
                type: item.type,
                width: item.width,
                height: item.height,
                zIndex: item.zIndex,
                data: {
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    bgcolor: item.bgcolor,
                    border: item.border,
                    url: item.url,
                    required: item.required,
                    learnResources: item.LearnResources,
                    contents_images: item.contents_images,
                },
                position: {
                    x: item.positionX,
                    y: item.positionY,
                },
            };
        });
        roadmapDto.edges = dbRoadmap.RoadmapEdges.map((edge) => ({
            id: edge.id,
            type: edge.type,
            source: edge.source,
            sourceHandle: edge.sourceHandle,
            target: edge.target,
            data: {
                color: edge.color,
                lineType: edge.lineType,
            },
        }));
        return roadmapDto;
    }
    async findMyAll(user) {
        const result = await this.roadmapsRepository.find({
            where: {
                User: {
                    id: user.id,
                },
            },
            relations: {
                LikeUsers: true,
                Replies: true,
                User: true,
            },
            order: {
                updated_at: 'desc',
            },
        });
        return result.map((roadmap) => {
            const { LikeUsers, Replies, User } = roadmap, restRoadmap = __rest(roadmap, ["LikeUsers", "Replies", "User"]);
            const { password } = User, restUser = __rest(User, ["password"]);
            return Object.assign(Object.assign({}, restRoadmap), { User: restUser, like: LikeUsers.length, reply: Replies.length });
        });
    }
    async findHomeListByCount(category) {
        const result = await this.roadmapsRepository.find({
            where: {
                category: category,
                public: true,
            },
            relations: {
                LikeUsers: true,
                Replies: true,
                User: true,
            },
            order: {
                updated_at: 'desc',
            },
            take: 5,
            skip: 0,
        });
        return result.map((roadmap) => {
            const { LikeUsers, Replies, User } = roadmap, restRoadmap = __rest(roadmap, ["LikeUsers", "Replies", "User"]);
            const { password } = User, restUser = __rest(User, ["password"]);
            return Object.assign(Object.assign({}, restRoadmap), { User: restUser, like: LikeUsers.length, reply: Replies.length });
        });
    }
    async findCategory(category) {
        const result = await this.roadmapsRepository.find({
            where: {
                category: category,
                public: true,
            },
            relations: {
                LikeUsers: true,
                Replies: true,
                User: true,
            },
            order: {
                updated_at: 'desc',
            },
        });
        return result.map((roadmap) => {
            const { LikeUsers, Replies, User } = roadmap, restRoadmap = __rest(roadmap, ["LikeUsers", "Replies", "User"]);
            const { password } = User, restUser = __rest(User, ["password"]);
            return Object.assign(Object.assign({}, restRoadmap), { User: restUser, like: LikeUsers.length, reply: Replies.length });
        });
    }
    async findByUser(Userid) {
        const result = await this.roadmapsRepository.find({
            where: {
                User: {
                    id: Userid,
                },
                public: true,
            },
            relations: {
                LikeUsers: true,
                Replies: true,
                User: true,
            },
            order: {
                updated_at: 'desc',
            },
        });
        return result.map((roadmap) => {
            const { LikeUsers, Replies, User } = roadmap, restRoadmap = __rest(roadmap, ["LikeUsers", "Replies", "User"]);
            const { password } = User, restUser = __rest(User, ["password"]);
            return Object.assign(Object.assign({}, restRoadmap), { User: restUser, like: LikeUsers.length, reply: Replies.length });
        });
    }
    async remove(id, user) {
        const roadmap = await this.roadmapsRepository.findOne({
            where: { id },
            relations: { User: true },
        });
        if (!roadmap) {
            throw new common_1.BadRequestException();
        }
        if (roadmap.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.roadmapsRepository.delete(id);
        if (roadmap.thumbnail) {
            await this.removeThumbnail(id);
        }
        await (0, util_1.removeContentsImage)(id);
        return true;
    }
    async like(id, user) {
        const roadmap = await this.roadmapsRepository.findOne({
            where: { id },
            relations: {
                LikeUsers: true,
            },
        });
        if (!roadmap) {
            return;
        }
        if (roadmap.LikeUsers.some((x) => x.id === user.id)) {
            return;
        }
        roadmap.LikeUsers.push(user);
        await this.roadmapsRepository.save(roadmap);
    }
    async unlike(roadmap_id, user) {
        const roadmap = await this.roadmapsRepository.findOne({
            where: { id: roadmap_id },
            relations: {
                LikeUsers: true,
            },
        });
        if (!roadmap) {
            return;
        }
        if (!roadmap.LikeUsers.some((x) => x.id === user.id)) {
            return;
        }
        roadmap.LikeUsers = roadmap.LikeUsers.filter((x) => x.id !== user.id);
        await this.roadmapsRepository.save(roadmap);
    }
    async isLike(id, user) {
        const likeUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: { LikeRoadmaps: true },
        });
        if (!likeUser) {
            return false;
        }
        return likeUser.LikeRoadmaps.some((roadmap) => roadmap.id === id);
    }
    async save(user, { roadmap, nodes, edges, mode }) {
        var _a;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const roadmapsRepository = queryRunner.manager.getRepository(roadmap_entity_1.Roadmap);
        if (mode === 'modify') {
            const existRoadmap = await roadmapsRepository.findOne({
                where: { id: roadmap.id },
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
        if (mode === 'copy') {
            if (roadmap.thumbnail) {
                const originFile = roadmap.thumbnail.split('?')[0];
                const ext = path_1.default.extname(originFile);
                const thumbnail = (0, thumbnail_upload_option_1.getThumbnailFilename)(roadmap.id, ext);
                fs_extra_1.default.copySync(path_1.default.join(configuration_1.PUBLIC_PATH, originFile), path_1.default.join(thumbnail_upload_option_1.UPLOAD_THUMBNAIL_FULL_PATH, thumbnail));
                roadmap.thumbnail = `/${thumbnail_upload_option_1.UPLOAD_THUMBNAIL_PATH}/${thumbnail}`;
            }
            const idMap = new Map();
            nodes = nodes.map((_a) => {
                var { id } = _a, rest = __rest(_a, ["id"]);
                idMap.set(id, short_uuid_1.default.generate());
                return Object.assign(Object.assign({}, rest), { id: idMap.get(id) });
            });
            edges = edges.map((_a) => {
                var { id, source, target } = _a, rest = __rest(_a, ["id", "source", "target"]);
                return Object.assign(Object.assign({}, rest), { id: short_uuid_1.default.generate(), source: idMap.get(source), target: idMap.get(target) });
            });
            if (!lodash_1.default.isEmpty(roadmap.contents_images)) {
                roadmap.contents_images = roadmap.contents_images.map((image) => {
                    const originFile = image;
                    const ext = path_1.default.extname(originFile);
                    const filename = (0, util_1.getContentsImageFilename)(roadmap.id, ext);
                    fs_extra_1.default.copySync(path_1.default.join(configuration_1.PUBLIC_PATH, originFile), path_1.default.join(UPLOAD_CONTENTS_FULL_PATH, filename));
                    const newContentsImage = `/${UPLOAD_CONTENTS_PATH}/${filename}`;
                    roadmap.contents = roadmap.contents.replace(new RegExp(originFile, 'g'), newContentsImage);
                    return newContentsImage;
                });
            }
            nodes.forEach((node) => {
                if (!lodash_1.default.isEmpty(node.data.contents_images)) {
                    node.data.contents_images = node.data.contents_images.map((image) => {
                        const originFile = image;
                        const ext = path_1.default.extname(originFile);
                        const filename = (0, util_1.getContentsImageFilename)(roadmap.id, ext);
                        fs_extra_1.default.copySync(path_1.default.join(configuration_1.PUBLIC_PATH, originFile), path_1.default.join(UPLOAD_CONTENTS_FULL_PATH, filename));
                        const newContentsImage = `/${UPLOAD_CONTENTS_PATH}/${filename}`;
                        node.data.description = node.data.description.replace(new RegExp(originFile, 'g'), newContentsImage);
                        return newContentsImage;
                    });
                }
            });
        }
        const { contents, contentsImages } = (0, util_1.moveTempImageToContents)(roadmap.id, roadmap.temp_images, roadmap.contents);
        roadmap.contents = contents;
        roadmap.contents_images = (0, util_1.getImagesInContents)([...((_a = roadmap.contents_images) !== null && _a !== void 0 ? _a : []), ...contentsImages], roadmap.contents);
        nodes.map((node) => {
            var _a;
            const { contents, contentsImages } = (0, util_1.moveTempImageToContents)(roadmap.id, node.data.temp_images, node.data.description);
            node.data.description = contents;
            console.log(node.data.description);
            console.log(node.data.contents_images);
            console.log(contentsImages);
            node.data.contents_images = (0, util_1.getImagesInContents)([...((_a = node.data.contents_images) !== null && _a !== void 0 ? _a : []), ...contentsImages], node.data.description);
            console.log(node.data.contents_images);
        });
        try {
            const newRoadmapItems = nodes.map((node) => {
                var _a;
                const roadmapItem = new roadmap_item_entity_1.RoadmapItem();
                roadmapItem.id = node.id;
                roadmapItem.name = node.data.name;
                roadmapItem.description = node.data.description;
                roadmapItem.status = node.data.status;
                roadmapItem.bgcolor = node.data.bgcolor;
                roadmapItem.border = node.data.border;
                roadmapItem.type = node.type;
                roadmapItem.positionX = node.position.x;
                roadmapItem.positionY = node.position.y;
                roadmapItem.url = node.data.url;
                roadmapItem.width = node.width;
                roadmapItem.height = node.height;
                roadmapItem.zIndex = node.zIndex;
                roadmapItem.required = node.data.required;
                roadmapItem.contents_images = node.data.contents_images;
                const newLearnResources = (_a = node.data.learnResources) === null || _a === void 0 ? void 0 : _a.map((learnResource) => {
                    const newLearnResource = new learn_resource_1.LearnResource();
                    newLearnResource.id = learnResource.id;
                    return newLearnResource;
                });
                roadmapItem.LearnResources = newLearnResources;
                return roadmapItem;
            });
            await queryRunner.manager
                .getRepository(roadmap_item_entity_1.RoadmapItem)
                .save(newRoadmapItems);
            const newRoadmapEdges = edges.map((edge) => {
                const roadmapEdge = new roadmap_edge_entity_1.RoadmapEdge();
                roadmapEdge.id = edge.id;
                roadmapEdge.type = edge.type;
                roadmapEdge.source = edge.source;
                roadmapEdge.sourceHandle = edge.sourceHandle;
                roadmapEdge.target = edge.target;
                roadmapEdge.color = edge.data.color;
                roadmapEdge.lineType = edge.data.lineType;
                return roadmapEdge;
            });
            await queryRunner.manager
                .getRepository(roadmap_edge_entity_1.RoadmapEdge)
                .save(newRoadmapEdges);
            if (!roadmap.title) {
                throw new common_1.BadRequestException();
            }
            const newRoadmap = new roadmap_entity_1.Roadmap();
            newRoadmap.id = roadmap.id || short_uuid_1.default.generate();
            newRoadmap.category = roadmap.category;
            newRoadmap.public = roadmap.public;
            newRoadmap.title = roadmap.title;
            newRoadmap.contents = roadmap.contents;
            newRoadmap.thumbnail = roadmap.thumbnail;
            newRoadmap.bgcolor = roadmap.bgcolor;
            newRoadmap.contents_images = roadmap.contents_images;
            newRoadmap.User = user;
            newRoadmap.RoadmapItems = newRoadmapItems;
            newRoadmap.RoadmapEdges = newRoadmapEdges;
            await queryRunner.manager.getRepository(roadmap_entity_1.Roadmap).save(newRoadmap);
            await queryRunner.commitTransaction();
            if (!newRoadmap.thumbnail) {
                await this.removeThumbnail(newRoadmap.id);
            }
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async removeThumbnail(id) {
        const files = await (0, glob_1.glob)(`${thumbnail_upload_option_1.UPLOAD_THUMBNAIL_FULL_PATH}/${id}*`.replace(/\\/g, '/'));
        files.forEach((file) => {
            fs_extra_1.default.removeSync(file);
        });
    }
};
RoadmapsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roadmap_entity_1.Roadmap)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RoadmapsService);
exports.RoadmapsService = RoadmapsService;
//# sourceMappingURL=roadmaps.service.js.map