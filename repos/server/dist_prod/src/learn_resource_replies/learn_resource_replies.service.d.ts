import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetLearnResourceReplyDto } from './dto/get-learn-resource-reply.dto';
import { LearnResourceReply } from 'src/entities/learn_resource_reply.entity';
import { LearnResource } from 'src/entities/learn_resource';
export declare class LearnResourceRepliesService {
    private learnResourceRepliesRepository;
    private learnResourceRepository;
    constructor(learnResourceRepliesRepository: Repository<LearnResourceReply>, learnResourceRepository: Repository<LearnResource>);
    saveReply(id: string, user: User, contents: string): Promise<boolean>;
    getReplies(id: string): Promise<GetLearnResourceReplyDto[]>;
    update(id: string, contents: string, user: User): Promise<boolean>;
    remove(id: string, user: User): Promise<boolean>;
}
