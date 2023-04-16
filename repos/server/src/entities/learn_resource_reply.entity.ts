import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { LearnResource } from './learn_resource';

@Entity()
export class LearnResourceReply {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @Column('text', { nullable: true })
  contents?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.Replies)
  User: User;

  @ManyToOne(() => LearnResource, (learnResource) => learnResource.Replies, {
    onDelete: 'CASCADE',
  })
  LearnResource: LearnResource;
}
