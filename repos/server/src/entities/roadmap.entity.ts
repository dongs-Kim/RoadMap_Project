import { IsDefined, IsIn, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { EN_CATEGORY } from '../common/enums';
import { Reply } from './reply.entity';
import { RoadmapItem } from './roadmap_item.entity';
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

  @IsNotEmpty()
  @Column()
  title: string;

  @Column('text', { nullable: true })
  contents: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.Roadmaps)
  User: User;

  @OneToMany(() => RoadmapItem, (roadmapItem) => roadmapItem.Roadmap)
  RoadmapItems: RoadmapItem[];

  @OneToMany(() => Reply, (reply) => reply.Roadmap)
  Replies: Reply[];

  @ManyToMany(() => User, (user) => user.LikeRoadmaps)
  @JoinTable()
  LikeUsers: User[];

  @ManyToMany(() => User, (user) => user.StoredRoadmaps)
  StoringUsers: User[];
}
