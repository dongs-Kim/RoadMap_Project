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
import { RoadmapEdge } from './roadmap_edge.entity';
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

  // @IsNotEmpty()
  // @Column()
  // userId: string;

  @Column('text', { nullable: true })
  contents?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.Roadmaps)
  User: User;

  @OneToMany(() => RoadmapItem, (roadmapItem) => roadmapItem.Roadmap, {
    cascade: true,
  })
  RoadmapItems: RoadmapItem[];

  @OneToMany(() => RoadmapEdge, (roadmapEdge) => roadmapEdge.Roadmap, {
    cascade: true,
  })
  RoadmapEdges: RoadmapEdge[];

  @OneToMany(() => Reply, (reply) => reply.Roadmap, { cascade: true })
  Replies: Reply[];

  @ManyToMany(() => User, (user) => user.LikeRoadmaps, { cascade: true })
  @JoinTable()
  LikeUsers: User[];

  @ManyToMany(() => User, (user) => user.StoredRoadmaps, {
    cascade: true,
  })
  @JoinTable()
  StoringUsers: User[];
}
