import { User } from './user.entity';
import { LearnResource } from './learn_resource';
export declare class LearnResourceReply {
    id: string;
    contents?: string;
    created_at: Date;
    User: User;
    LearnResource: LearnResource;
}
