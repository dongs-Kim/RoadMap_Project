import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roadmap } from './roadmap.entity';

@Entity()
export class RoadmapEdge {
  @PrimaryColumn('char', { length: 22 })
  id: string;

  @IsNotEmpty()
  @Column({ length: 20 })
  type: string;

  @IsNotEmpty()
  @Column({ length: 22 })
  source: string;

  @IsNotEmpty()
  @Column({ length: 10 })
  sourceHandle: string;

  @IsNotEmpty()
  @Column({ length: 22 })
  target: string;

  @IsNotEmpty()
  @Column('char', { length: 7 })
  color: string;

  @IsNotEmpty()
  @Column({ length: 10 })
  lineType: string;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.RoadmapEdges, {
    onDelete: 'CASCADE',
  })
  Roadmap: Roadmap;
}
