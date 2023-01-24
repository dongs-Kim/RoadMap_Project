import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
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

  @Column({ length: 100, select: false })
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

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.LikeUsers)
  LikeRoadmaps: Roadmap[];
}
