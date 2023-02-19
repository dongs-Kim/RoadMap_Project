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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const short_uuid_1 = __importDefault(require("short-uuid"));
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const roadmap_entity_1 = require("../entities/roadmap.entity");
const path_1 = __importDefault(require("path"));
let UsersService = class UsersService {
    constructor(usersRepository, roadmapsRepository) {
        this.usersRepository = usersRepository;
        this.roadmapsRepository = roadmapsRepository;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User();
        user.id = short_uuid_1.default.generate();
        user.email = createUserDto.email;
        user.password = await hashPassword(createUserDto.password_origin);
        user.nickname = createUserDto.nickname;
        user.comment = createUserDto.comment;
        user.image = createUserDto.image;
        await this.usersRepository.save(user);
        return user;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    findEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async getFavoriteRoadmaps(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                StoredRoadmaps: true,
            },
        });
        return user.StoredRoadmaps;
    }
    async update(id, updateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        return true;
    }
    async remove(id) {
        await this.usersRepository.delete(id);
        return true;
    }
    async changePassword(user, changePasswordDto) {
        if (!bcrypt_1.default.compareSync(changePasswordDto.password_prev, user.password)) {
            throw new common_1.BadRequestException('비밀번호가 틀렸습니다');
        }
        const updateParam = {
            password: await hashPassword(changePasswordDto.password_origin),
        };
        await this.usersRepository.update(user.id, updateParam);
        return true;
    }
    async storeRoadmap(user, roadmap_id) {
        const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
        if (!roadmap) {
            throw new common_1.BadRequestException('로드맵이 존재하지 않습니다');
        }
        const storeUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: {
                StoredRoadmaps: true,
            },
        });
        if (storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
            return true;
        }
        storeUser.StoredRoadmaps.push(roadmap);
        await this.usersRepository.save(storeUser);
        return true;
    }
    async unstoreRoadmap(user, roadmap_id) {
        const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
        if (!roadmap) {
            throw new common_1.BadRequestException('로드맵이 존재하지 않습니다');
        }
        const storeUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: {
                StoredRoadmaps: true,
            },
        });
        if (!storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
            return true;
        }
        storeUser.StoredRoadmaps = storeUser.StoredRoadmaps.filter((x) => x.id !== roadmap_id);
        await this.usersRepository.save(storeUser);
        return true;
    }
    async isStore(user, roadmap_id) {
        const storeUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: { StoredRoadmaps: true },
        });
        if (!storeUser) {
            return false;
        }
        return storeUser.StoredRoadmaps.some((roadmap) => roadmap.id === roadmap_id);
    }
    async uploadProfileImage(user, url) {
        await this.usersRepository.update(user.id, { image: url });
    }
    async deleteProfileImage(user) {
        if (!user.image) {
            return;
        }
        await fs_extra_1.default.remove(path_1.default.join(__dirname, '../../public', user.image));
        await this.usersRepository.update(user.id, { image: null });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roadmap_entity_1.Roadmap)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
function hashPassword(password) {
    return bcrypt_1.default.hash(password, 12);
}
//# sourceMappingURL=users.service.js.map