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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnResourceRepliesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const short_uuid_1 = __importDefault(require("short-uuid"));
const typeorm_2 = require("typeorm");
const learn_resource_reply_entity_1 = require("../entities/learn_resource_reply.entity");
const learn_resource_1 = require("../entities/learn_resource");
let LearnResourceRepliesService = class LearnResourceRepliesService {
    constructor(learnResourceRepliesRepository, learnResourceRepository) {
        this.learnResourceRepliesRepository = learnResourceRepliesRepository;
        this.learnResourceRepository = learnResourceRepository;
    }
    async saveReply(id, user, contents) {
        const learnResource = await this.learnResourceRepository.findOneBy({ id });
        if (!learnResource) {
            throw new common_1.BadRequestException();
        }
        const reply = new learn_resource_reply_entity_1.LearnResourceReply();
        reply.id = short_uuid_1.default.generate();
        reply.contents = contents;
        reply.User = user;
        reply.LearnResource = learnResource;
        await this.learnResourceRepliesRepository.save(reply);
        return true;
    }
    async getReplies(id) {
        const replies = await this.learnResourceRepliesRepository.find({
            where: {
                LearnResource: {
                    id: id,
                },
            },
            relations: {
                User: true,
            },
            order: {
                created_at: 'desc',
            },
        });
        return replies.map((reply) => ({
            id: reply.id,
            contents: reply.contents,
            created_at: reply.created_at,
            user_id: reply.User.id,
            user_nickname: reply.User.nickname,
            user_image: reply.User.image,
        }));
    }
    async update(id, contents, user) {
        const reply = await this.learnResourceRepliesRepository.findOne({
            where: { id },
            relations: { User: true },
        });
        if (!reply) {
            throw new common_1.BadRequestException();
        }
        if (reply.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.learnResourceRepliesRepository.update(id, { contents });
        return true;
    }
    async remove(id, user) {
        const reply = await this.learnResourceRepliesRepository.findOne({
            where: { id },
            relations: { User: true },
        });
        if (!reply) {
            throw new common_1.BadRequestException();
        }
        if (reply.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.learnResourceRepliesRepository.delete(id);
        return true;
    }
};
LearnResourceRepliesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(learn_resource_reply_entity_1.LearnResourceReply)),
    __param(1, (0, typeorm_1.InjectRepository)(learn_resource_1.LearnResource)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LearnResourceRepliesService);
exports.LearnResourceRepliesService = LearnResourceRepliesService;
//# sourceMappingURL=learn_resource_replies.service.js.map