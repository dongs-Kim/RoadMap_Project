import { User as UserEntity } from 'src/entities/user.entity';
import { SaveLearnResourceReplyDto } from './dto/save-learn-resource-reply.dto';
import { UpdateLearnResourceReplyDto } from './dto/update-learn-resource-reply.dto';
import { LearnResourceRepliesService } from './learn_resource_replies.service';
export declare class LearnResourceRepliesController {
    private readonly learnResourceRepliesService;
    constructor(learnResourceRepliesService: LearnResourceRepliesService);
    saveReply(user: UserEntity, reply: SaveLearnResourceReplyDto): Promise<boolean>;
    getReplies(id: string): Promise<import("./dto/get-learn-resource-reply.dto").GetLearnResourceReplyDto[]>;
    update(user: UserEntity, id: string, updateLearnResourceReplyDto: UpdateLearnResourceReplyDto): Promise<boolean>;
    remove(user: UserEntity, id: string): Promise<boolean>;
}
