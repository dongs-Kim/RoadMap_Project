import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

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

  @Column({ nullable: true })
  url?: string;

  @Column('text', { nullable: true })
  contents?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.LearnResources)
  User: User;

  @ManyToMany(() => User, (user) => user.LikeLearnResources, { cascade: true })
  @JoinTable()
  LikeUsers: User[];
}
