import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { LearnResource } from 'src/entities/learn_resource';
import { User } from 'src/entities/user.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';

const PAGE_SIZE = 3;

@Injectable()
export class LearnResourceService {
  constructor(
    @InjectRepository(LearnResource)
    private learnResourceRepository: Repository<LearnResource>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User, createLearnResourceDto: CreateLearnResourceDto) {
    const learnResource = new LearnResource();
    learnResource.id = shortUUID.generate();
    learnResource.name = createLearnResourceDto.name;
    learnResource.contents = createLearnResourceDto.contents;
    learnResource.url = createLearnResourceDto.url;
    learnResource.category = createLearnResourceDto.category;
    learnResource.User = user;
    await this.learnResourceRepository.save(learnResource);
    return true;
  }

  async getLearnResources(
    category?: string,
    keyword?: string,
    sort?: string,
    sortType?: string,
    page?: number,
  ) {
    //초기화
    page = page ?? 1;

    //검색조건
    const where: FindOptionsWhere<LearnResource>[] = [];
    if (category) {
      where.push({ category });
    }
    if (keyword) {
      where.push({ ...where[0], name: ILike(`%${keyword}%`) });
      where.push({ ...where[0], contents: ILike(`%${keyword}%`) });
    }

    //좋아요 정렬
    if (sort === 'like') {
      const learnResources = await this.learnResourceRepository.find({
        where: _.isEmpty(where) ? undefined : where,
        relations: {
          LikeUsers: true,
          User: true,
        },
      });

      const ascSorted = _.sortBy(
        learnResources.map((resource) => {
          const { LikeUsers, User, ...rest } = resource;
          return {
            ...rest,
            like: LikeUsers.length,
            user_id: User.id,
            user_nickname: User.nickname,
          };
        }),
        'like',
      );
      return {
        items: (sortType === 'asc' ? ascSorted : ascSorted.reverse()).slice(
          PAGE_SIZE * (page - 1),
          PAGE_SIZE * (page - 1) + PAGE_SIZE,
        ),
        totalCount: ascSorted.length,
      };
    }

    //최신순 정렬
    const [learnResources, total] =
      await this.learnResourceRepository.findAndCount({
        where: _.isEmpty(where) ? undefined : where,
        relations: {
          LikeUsers: true,
          User: true,
        },
        order: {
          created_at: sortType ? 'asc' : 'desc',
        },
        skip: PAGE_SIZE * (page - 1),
        take: PAGE_SIZE,
      });
    return {
      items: learnResources.map((resource) => {
        const { LikeUsers, User, ...rest } = resource;
        return {
          ...rest,
          like: LikeUsers.length,
          user_id: User.id,
          user_nickname: User.nickname,
        };
      }),
      totalCount: total,
    };
  }

  async getOne(id: string) {
    const learnResource = await this.learnResourceRepository.findOne({
      where: {
        id,
      },
      relations: {
        LikeUsers: true,
        User: true,
      },
    });
    if (!learnResource) {
      return null;
    }

    const { LikeUsers, User, ...rest } = learnResource;
    return {
      ...rest,
      like: LikeUsers.length,
      user_id: User.id,
      user_nickname: User.nickname,
    };
  }

  async isLike(id: string, user: User) {
    const likeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: { LikeLearnResources: true },
    });
    if (!likeUser) {
      return false;
    }
    return likeUser.LikeLearnResources.some((resource) => resource.id === id);
  }

  async like(id: string, user: User) {
    // resource 조회
    const resource = await this.learnResourceRepository.findOne({
      where: { id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!resource) {
      return;
    }

    // 이미 like 했는지 체크
    if (resource.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에 추가
    resource.LikeUsers.push(user);
    await this.learnResourceRepository.save(resource);
  }

  async unlike(roadmap_id: string, user: User) {
    // resource 조회
    const resource = await this.learnResourceRepository.findOne({
      where: { id: roadmap_id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!resource) {
      return;
    }

    // like 되어 있는지 확인
    if (!resource.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에서 삭제
    resource.LikeUsers = resource.LikeUsers.filter((x) => x.id !== user.id);
    await this.learnResourceRepository.save(resource);
  }
}
