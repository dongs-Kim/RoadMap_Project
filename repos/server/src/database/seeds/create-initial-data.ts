import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Roadmap } from '../../entities/roadmap.entity';

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

    const roadmap1 = {
      id: 'xiAja1HrEwMzGkxZG8jdcA',
      category: 'front_end',
      public: true,
      title: 'roadmap1',
      User: user1,
      LikeUsers: [user1],
      StoringUsers: [user1],
    };
    const roadmap2 = {
      id: 'xiAja1HrEwMzGkxZG8jdcB',
      category: 'front_end',
      public: true,
      title: 'roadmap2',
      User: user1,
      LikeUsers: [user1],
      StoringUsers: [user1],
    };
    const roadmap3 = {
      id: 'xiAja1HrEwMzGkxZG8jdcC',
      category: 'back_end',
      public: true,
      title: 'roadmap3',
      User: user1,
    };
    const roadmap4 = {
      id: 'xiAja1HrEwMzGkxZG8jdcD',
      category: 'back_end',
      public: true,
      title: 'roadmap4',
      User: user1,
    };
    const roadmapsRepository = dataSource.getRepository(Roadmap);
    await roadmapsRepository.save([roadmap1, roadmap2, roadmap3, roadmap4]);
  }
}
