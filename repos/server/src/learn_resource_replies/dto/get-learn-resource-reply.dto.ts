import { PickType } from '@nestjs/swagger';
import { LearnResourceReply } from 'src/entities/learn_resource_reply.entity';

export class GetLearnResourceReplyDto extends PickType(LearnResourceReply, [
  'id',
  'contents',
  'created_at',
]) {
  user_id: string;
  user_nickname: string;
  user_image?: string;
}
