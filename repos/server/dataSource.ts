import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Roadmap } from './src/entities/roadmap.entity';
import { RoadmapItem } from './src/entities/roadmap_item.entity';
import { Reply } from './src/entities/reply.entity';
import { User } from './src/entities/user.entity';
import { RoadmapEdge } from './src/entities/roadmap_edge.entity';
import path from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.production') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '.env.development') });
}

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Roadmap, RoadmapItem, RoadmapEdge, Reply],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
});

export default dataSource;
