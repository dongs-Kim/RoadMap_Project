"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoadmapReplyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const reply_entity_1 = require("../../entities/reply.entity");
class GetRoadmapReplyDto extends (0, swagger_1.PickType)(reply_entity_1.Reply, [
    'id',
    'contents',
    'created_at',
]) {
}
exports.GetRoadmapReplyDto = GetRoadmapReplyDto;
//# sourceMappingURL=get-roadmap-reply.dto.js.map