import { Roadmap } from './roadmap.entity';
import { User } from './user.entity';
export declare class Reply {
    id: string;
    contents?: string;
    created_at: Date;
    User: User;
    Roadmap: Roadmap;
}
