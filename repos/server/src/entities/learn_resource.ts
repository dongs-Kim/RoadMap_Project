import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { RoadmapItem } from './roadmap_item.entity';
import { LearnResourceReply } from './learn_resource_reply.entity';

@Entity()
export class LearnResource {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @IsNotEmpty()
  @Column({ length: 20 })
  category: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  url?: string[];

  @Column('text', { nullable: true })
  contents?: string;

  @Column('simple-array', { nullable: true })
  contents_images?: string[];

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.LearnResources)
  User: User;

  @ManyToMany(() => User, (user) => user.LikeLearnResources, { cascade: true })
  @JoinTable()
  LikeUsers: User[];

  @ManyToMany(() => RoadmapItem, (roadmapItem) => roadmapItem.LearnResources)
  @JoinTable()
  RoadmapItems: RoadmapItem[];

  @OneToMany(() => LearnResourceReply, (reply) => reply.LearnResource, {
    cascade: true,
  })
  Replies: LearnResourceReply[];
}
