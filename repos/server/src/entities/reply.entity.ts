import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roadmap } from './roadmap.entity';
import { User } from './user.entity';

@Entity()
export class Reply {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @Column({ length: 50 })
  user_nickname: string;

  @Column('text', { nullable: true })
  contents?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.Replies)
  User: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.Replies, {
    onDelete: 'CASCADE',
  })
  Roadmap: Roadmap;
}
