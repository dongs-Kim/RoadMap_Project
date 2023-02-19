"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entities/user.entity");
class RoadmapSeeder {
    async run(dataSource) {
        const user1 = {
            id: 'sBbnf6oDFSXZE2oTJQkgxp',
            email: 'test@test.com',
            password: '$2b$12$EyDdG57N1vj/imB39Wdc6OzQjb6E.Nut70NNg4RY/VYDQSkxhd3y6',
            nickname: '테스트',
        };
        const usersRepository = dataSource.getRepository(user_entity_1.User);
        await usersRepository.save([user1]);
    }
}
exports.default = RoadmapSeeder;
//# sourceMappingURL=create-initial-data.js.map