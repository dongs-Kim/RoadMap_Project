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
exports.RepliesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const short_uuid_1 = __importDefault(require("short-uuid"));
const reply_entity_1 = require("../entities/reply.entity");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const typeorm_2 = require("typeorm");
let RepliesService = class RepliesService {
    constructor(repliesRepository, roadmapsRepository) {
        this.repliesRepository = repliesRepository;
        this.roadmapsRepository = roadmapsRepository;
    }
    async saveReply(id, user, contents) {
        const roadmap = await this.roadmapsRepository.findOneBy({ id });
        if (!roadmap) {
            throw new common_1.BadRequestException();
        }
        const reply = new reply_entity_1.Reply();
        reply.id = short_uuid_1.default.generate();
        reply.contents = contents;
        reply.User = user;
        reply.Roadmap = roadmap;
        await this.repliesRepository.save(reply);
        return true;
    }
    async getReplies(id) {
        const replies = await this.repliesRepository.find({
            where: {
                Roadmap: {
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
        const reply = await this.repliesRepository.findOne({
            where: { id },
            relations: { User: true },
        });
        if (!reply) {
            throw new common_1.BadRequestException();
        }
        if (reply.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.repliesRepository.update(id, { contents });
        return true;
    }
    async remove(id, user) {
        const reply = await this.repliesRepository.findOne({
            where: { id },
            relations: { User: true },
        });
        if (!reply) {
            throw new common_1.BadRequestException();
        }
        if (reply.User.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.repliesRepository.delete(id);
        return true;
    }
};
RepliesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reply_entity_1.Reply)),
    __param(1, (0, typeorm_1.InjectRepository)(roadmap_entity_1.Roadmap)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RepliesService);
exports.RepliesService = RepliesService;
//# sourceMappingURL=replies.service.js.map