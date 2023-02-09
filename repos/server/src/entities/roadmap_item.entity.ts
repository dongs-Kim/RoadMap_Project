import { IsIn, IsNotEmpty } from 'class-validator';
import {
  EN_ROADMAP_ITEM_REQUIRED,
  EN_ROADMAP_ITEM_STATUS,
} from '../common/enums';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roadmap } from './roadmap.entity';

@Entity()
export class RoadmapItem {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @IsNotEmpty()
  @Column({ length: 20 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @IsIn(Object.values(EN_ROADMAP_ITEM_STATUS).concat(undefined))
  @Column({ length: 10, nullable: true })
  status?: string;

  @IsIn(Object.values(EN_ROADMAP_ITEM_REQUIRED).concat(undefined))
  @Column({ length: 10, nullable: true })
  required?: string;

  @Column({ length: 20 })
  type: string;

  @Column('int')
  positionX: number;

  @Column('int')
  positionY: number;

  @Column('char', { length: 7 })
  bgcolor: string;

  @Column()
  border: boolean;

  @Column('int')
  zIndex: number;

  @Column({ nullable: true })
  url?: string;

  @Column('int', { nullable: true })
  width?: number;

  @Column('int', { nullable: true })
  height?: number;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.RoadmapItems, {
    onDelete: 'CASCADE',
  })
  Roadmap: Roadmap;
}
