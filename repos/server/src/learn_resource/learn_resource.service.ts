import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { LearnResource } from 'src/entities/learn_resource';
import { User } from 'src/entities/user.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';

const PAGE_SIZE = 10;

@Injectable()
export class LearnResourceService {
  constructor(
    @InjectRepository(LearnResource)
    private learnResourceRepository: Repository<LearnResource>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User, createLearnResourceDto: CreateLearnResourceDto) {
    // 수정인 경우
    if (createLearnResourceDto.mode === 'modify') {
      // 존재하는지 확인
      const existRoadmap = await this.learnResourceRepository.findOne({
        where: { id: createLearnResourceDto.id },
        relations: {
          User: true,
        },
      });
      if (!existRoadmap) {
        throw new BadRequestException();
      }

      // 내 리소스가 맞는지 확인
      if (existRoadmap.User.id !== user.id) {
        throw new ForbiddenException();
      }
    }

    if (!createLearnResourceDto.name || !createLearnResourceDto.category) {
      throw new BadRequestException();
    }
    const learnResource = new LearnResource();
    learnResource.id = createLearnResourceDto.id ?? shortUUID.generate();
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
    user_id?: string,
    sort?: string,
    sortType?: string,
    page?: number,
    pageSize?: number,
  ) {
    //초기화
    page = page ?? 1;
    pageSize = pageSize ?? PAGE_SIZE;

    //검색조건
    const where: FindOptionsWhere<LearnResource>[] = [];
    if (keyword) {
      where.push({ category: ILike(`%${keyword}%`) });
      where.push({ name: ILike(`%${keyword}%`) });
      where.push({ contents: ILike(`%${keyword}%`) });
      where.push({ User: { id: ILike(`%${keyword}%`) } });
    }
    if (category) {
      if (_.isEmpty(where)) {
        where.push({ category: category });
      } else {
        _.remove(where, (w) => {
          const keys = _.keys(w);
          return keys.length === 1 && keys[0] === 'category';
        });
        where.forEach((w) => (w.category = category));
      }
    }
    if (user_id) {
      if (_.isEmpty(where)) {
        where.push({ User: { id: user_id } });
      } else {
        _.remove(where, (w) => {
          const keys = _.keys(w);
          return keys.length === 1 && keys[0] === 'User';
        });
        where.forEach((w) => (w.User = { id: user_id }));
      }
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
          pageSize * (page - 1),
          pageSize * (page - 1) + pageSize,
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
        skip: pageSize * (page - 1),
        take: pageSize,
      });
    return {
      items: learnResources.map((resource) => {
        const { LikeUsers, User, ...rest } = resource;
        return {
          ...rest,
          like: LikeUsers.length,
          user_id: User.id,
          user_nickname: User.nickname,
          user_image: User.image,
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

  async delete(id: string, user: User) {
    const learnResource = await this.learnResourceRepository.findOne({
      where: {
        id,
      },
      relations: {
        User: true,
      },
    });
    if (!learnResource) {
      throw new BadRequestException();
    }
    if (learnResource.User.id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.learnResourceRepository.delete(id);
    return true;
  }
}
