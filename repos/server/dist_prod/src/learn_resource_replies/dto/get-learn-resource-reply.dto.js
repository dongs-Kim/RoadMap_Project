"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLearnResourceReplyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const learn_resource_reply_entity_1 = require("../../entities/learn_resource_reply.entity");
class GetLearnResourceReplyDto extends (0, swagger_1.PickType)(learn_resource_reply_entity_1.LearnResourceReply, [
    'id',
    'contents',
    'created_at',
]) {
}
exports.GetLearnResourceReplyDto = GetLearnResourceReplyDto;
//# sourceMappingURL=get-learn-resource-reply.dto.js.map