import { LearnResourceReply } from 'src/entities/learn_resource_reply.entity';
declare const GetLearnResourceReplyDto_base: import("@nestjs/common").Type<Pick<LearnResourceReply, "id" | "contents" | "created_at">>;
export declare class GetLearnResourceReplyDto extends GetLearnResourceReplyDto_base {
    user_id: string;
    user_nickname: string;
    user_image?: string;
}
export {};
