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

  @Column({ length: 100, nullable: true })
  image?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Roadmap, (roadmap) => roadmap.User)
  Roadmaps: Roadmap[];

  @OneToMany(() => Reply, (reply) => reply.User)
  Replies: Reply[];

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.LikeUsers)
  LikeRoadmaps: Roadmap[];

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.StoringUsers)
  @JoinTable()
  StoredRoadmaps: Roadmap[];
}
