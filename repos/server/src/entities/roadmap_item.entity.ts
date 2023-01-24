import { IsIn, IsNotEmpty } from 'class-validator';
import { EN_ROADMAP_ITEM_STATUS } from '../common/enums';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roadmap } from './roadmap.entity';

@Entity()
export class RoadmapItem {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @Column('char', { length: 22, nullable: true })
  parent_id?: string;

  @IsNotEmpty()
  @Column({ length: 20 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @IsIn(Object.values(EN_ROADMAP_ITEM_STATUS).concat(undefined))
  @Column({ length: 10, nullable: true })
  status?: string;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.RoadmapItems)
  Roadmap: Roadmap;
}
