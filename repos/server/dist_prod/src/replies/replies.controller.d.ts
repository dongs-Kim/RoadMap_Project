import { RepliesService } from './replies.service';
import { User as UserEntity } from 'src/entities/user.entity';
import { SaveRoadmapReplyDto } from './dto/save-roadmap-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
export declare class RepliesController {
    private readonly repliesService;
    constructor(repliesService: RepliesService);
    saveReply(user: UserEntity, reply: SaveRoadmapReplyDto): Promise<boolean>;
    getReplies(id: string): Promise<import("./dto/get-roadmap-reply.dto").GetRoadmapReplyDto[]>;
    update(user: UserEntity, id: string, updateReplyDto: UpdateReplyDto): Promise<boolean>;
    remove(user: UserEntity, id: string): Promise<boolean>;
}
