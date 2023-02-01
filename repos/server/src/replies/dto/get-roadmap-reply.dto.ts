import { PickType } from '@nestjs/swagger';
import { Reply } from 'src/entities/reply.entity';

export class GetRoadmapReplyDto extends PickType(Reply, [
  'id',
  'contents',
  'created_at',
]) {
  user_id: string;
  user_nickname: string;
}
