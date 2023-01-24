import { IsDefined, IsIn } from 'class-validator';
import { EN_CATEGORY } from 'src/common/enums';
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
export class Roadmap {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @IsIn(Object.values(EN_CATEGORY))
  @Column({ length: 10 })
  category: string;

  @IsDefined()
  @Column()
  public: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.Roadmaps)
  User: User;

  @ManyToMany(() => User, (user) => user.LikeRoadmaps)
  @JoinTable()
  LikeUsers: User[];
}
