import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

export default class RoadmapSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const user1 = {
      id: 'sBbnf6oDFSXZE2oTJQkgxp',
      email: 'test@test.com',
      password: '$2b$12$EyDdG57N1vj/imB39Wdc6OzQjb6E.Nut70NNg4RY/VYDQSkxhd3y6',
      nickname: '테스트',
    };
    const usersRepository = dataSource.getRepository(User);
    await usersRepository.save([user1]);
  }
}
