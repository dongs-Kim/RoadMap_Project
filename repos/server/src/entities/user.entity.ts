import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { LearnResource } from './learn_resource';
import { Reply } from './reply.entity';
import { Roadmap } from './roadmap.entity';

@Entity()
export class User {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @Index({ unique: true })
  @Column({ length: 30, update: false })
  email: string;

  @Column({ length: 100 })
  password: string;

  @IsNotEmpty()
  @Column({ length: 50 })
  nickname: string;

  @Column('text', { nullable: true })
  comment?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Roadmap, (roadmap) => roadmap.User)
  Roadmaps: Roadmap[];

  @OneToMany(() => Reply, (reply) => reply.User)
  Replies: Reply[];

  @OneToMany(() => LearnResource, (learn_resource) => learn_resource.User)
  LearnResources: LearnResource[];

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.LikeUsers)
  LikeRoadmaps: Roadmap[];

  @ManyToMany(() => LearnResource, (learnResource) => learnResource.LikeUsers)
  LikeLearnResources: LearnResource[];

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.StoringUsers)
  StoredRoadmaps: Roadmap[];
}
