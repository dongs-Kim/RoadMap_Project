import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
export default class RoadmapSeeder implements Seeder {
    run(dataSource: DataSource): Promise<any>;
}
