import { Reply } from 'src/entities/reply.entity';
declare const GetRoadmapReplyDto_base: import("@nestjs/common").Type<Pick<Reply, "id" | "created_at" | "contents">>;
export declare class GetRoadmapReplyDto extends GetRoadmapReplyDto_base {
    user_id: string;
    user_nickname: string;
    user_image?: string;
}
export {};
