import { Reply } from 'src/entities/reply.entity';
import { Roadmap } from 'src/entities/roadmap.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetRoadmapReplyDto } from './dto/get-roadmap-reply.dto';
export declare class RepliesService {
    private repliesRepository;
    private roadmapsRepository;
    constructor(repliesRepository: Repository<Reply>, roadmapsRepository: Repository<Roadmap>);
    saveReply(id: string, user: User, contents: string): Promise<boolean>;
    getReplies(id: string): Promise<GetRoadmapReplyDto[]>;
    update(id: string, contents: string, user: User): Promise<boolean>;
    remove(id: string, user: User): Promise<boolean>;
}
