import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs-extra';
import glob from 'glob';
import shortUUID from 'short-uuid';
import {
  EN_ROADMAP_ITEM_REQUIRED,
  EN_ROADMAP_ITEM_STATUS,
} from 'src/common/enums';
import { Roadmap } from 'src/entities/roadmap.entity';
import { RoadmapEdge } from 'src/entities/roadmap_edge.entity';
import { RoadmapItem } from 'src/entities/roadmap_item.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { SaveRoadmapDto } from './dto/save-roadmap.dto';
import { UPLOAD_THUMBNAIL_PATH } from './thumbnail-upload.option';

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectRepository(Roadmap)
    private roadmapsRepository: Repository<Roadmap>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll() {
    return this.roadmapsRepository.find({
      where: {
        public: true,
      },
    });
  }

  async findOneSet(id: string, mode?: string, user?: User) {
    const dbRoadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: {
        RoadmapItems: true,
        RoadmapEdges: true,
        User: true,
        LikeUsers: mode === 'view' ? true : false,
      },
    });

    if (!dbRoadmap.public && (!user || dbRoadmap.User.id !== user.id)) {
      throw new UnauthorizedException();
    }

    const roadmapDto = new SaveRoadmapDto();
    roadmapDto.user = { ...dbRoadmap.User, password: '' };
    roadmapDto.roadmap = {
      id: dbRoadmap.id,
      title: dbRoadmap.title,
      category: dbRoadmap.category,
      public: dbRoadmap.public,
      contents: dbRoadmap.contents,
      thumbnail: dbRoadmap.thumbnail,
      like: dbRoadmap.LikeUsers?.length,
      created_at: dbRoadmap.created_at,
    };
    roadmapDto.nodes = dbRoadmap.RoadmapItems.map((item) => ({
      id: item.id,
      type: item.type,
      width: item.width,
      height: item.height,
      zIndex: item.zIndex,
      data: {
        name: item.name,
        description: item.description,
        status: item.status as EN_ROADMAP_ITEM_STATUS | null,
        bgcolor: item.bgcolor,
        border: item.border,
        url: item.url,
        required: item.required as EN_ROADMAP_ITEM_REQUIRED | null,
      },
      position: {
        x: item.positionX,
        y: item.positionY,
      },
    }));
    roadmapDto.edges = dbRoadmap.RoadmapEdges.map((edge) => ({
      id: edge.id,
      type: edge.type,
      source: edge.source,
      sourceHandle: edge.sourceHandle,
      target: edge.target,
      data: {
        color: edge.color,
        lineType: edge.lineType,
      },
    }));

    return roadmapDto;
  }

  findMyAll(user: User) {
    return this.roadmapsRepository.find({
      where: {
        User: {
          id: user.id,
        },
      },
    });
  }

  findCategory(category: string) {
    return this.roadmapsRepository.find({
      where: {
        category: category,
        public: true,
      },
      relations: {
        LikeUsers: true,
        User: true,
      },
      order: {
        updated_at: 'desc',
      },
    });
  }

  findByUser(Userid: string) {
    return this.roadmapsRepository.find({
      where: {
        User: {
          id: Userid,
        },
        public: true,
      },
      order: {
        updated_at: 'desc',
      },
    });
  }

  async remove(id: string, user: User) {
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: { User: true },
    });
    if (!roadmap) {
      throw new BadRequestException();
    }
    if (roadmap.User.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.roadmapsRepository.delete(id);
    if (roadmap.thumbnail) {
      this.removeThumbnail(id);
    }
    return true;
  }

  async like(id: string, user: User) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // 이미 like 했는지 체크
    if (roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에 추가
    roadmap.LikeUsers.push(user);
    await this.roadmapsRepository.save(roadmap);
  }

  async unlike(roadmap_id: string, user: User) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id: roadmap_id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // like 되어 있는지 확인
    if (!roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에서 삭제
    roadmap.LikeUsers = roadmap.LikeUsers.filter((x) => x.id !== user.id);
    await this.roadmapsRepository.save(roadmap);
  }

  async isLike(id: string, user: User) {
    const likeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: { LikeRoadmaps: true },
    });
    if (!likeUser) {
      return false;
    }
    return likeUser.LikeRoadmaps.some((roadmap) => roadmap.id === id);
  }

  async save(user: User, { roadmap, nodes, edges, isUpdate }: SaveRoadmapDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const roadmapsRepository = queryRunner.manager.getRepository(Roadmap);

    // 수정인 경우
    if (isUpdate) {
      // 존재하는지 확인
      const existRoadmap = await roadmapsRepository.findOne({
        where: { id: roadmap.id },
        relations: {
          User: true,
        },
      });
      if (!existRoadmap) {
        throw new BadRequestException();
      }

      // 내 로드맵이 맞는지 확인
      if (existRoadmap.User.id !== user.id) {
        throw new ForbiddenException();
      }
    }

    try {
      // nodes
      const newRoadmapItems = nodes.map((node) => {
        const roadmapItem = new RoadmapItem();
        roadmapItem.id = node.id;
        roadmapItem.name = node.data.name;
        roadmapItem.description = node.data.description;
        roadmapItem.status = node.data.status;
        roadmapItem.bgcolor = node.data.bgcolor;
        roadmapItem.border = node.data.border;
        roadmapItem.type = node.type;
        roadmapItem.positionX = node.position.x;
        roadmapItem.positionY = node.position.y;
        roadmapItem.url = node.data.url;
        roadmapItem.width = node.width;
        roadmapItem.height = node.height;
        roadmapItem.zIndex = node.zIndex;
        roadmapItem.required = node.data.required;
        return roadmapItem;
      });
      await queryRunner.manager
        .getRepository(RoadmapItem)
        .save(newRoadmapItems);

      // edges
      const newRoadmapEdges = edges.map((edge) => {
        const roadmapEdge = new RoadmapEdge();
        roadmapEdge.id = edge.id;
        roadmapEdge.type = edge.type;
        roadmapEdge.source = edge.source;
        roadmapEdge.sourceHandle = edge.sourceHandle;
        roadmapEdge.target = edge.target;
        roadmapEdge.color = edge.data.color;
        roadmapEdge.lineType = edge.data.lineType;
        return roadmapEdge;
      });
      await queryRunner.manager
        .getRepository(RoadmapEdge)
        .save(newRoadmapEdges);

      // roadmap 저장
      if (!roadmap.title) {
        throw new BadRequestException();
      }
      const newRoadmap = new Roadmap();
      newRoadmap.id = roadmap.id || shortUUID.generate();
      newRoadmap.category = roadmap.category;
      newRoadmap.public = roadmap.public;
      newRoadmap.title = roadmap.title;
      newRoadmap.contents = roadmap.contents;
      newRoadmap.thumbnail = roadmap.thumbnail;
      newRoadmap.User = user;
      newRoadmap.RoadmapItems = newRoadmapItems;
      newRoadmap.RoadmapEdges = newRoadmapEdges;
      await queryRunner.manager.getRepository(Roadmap).save(newRoadmap);
      await queryRunner.commitTransaction();

      //썸네일없는 경우 파일 삭제
      if (!newRoadmap.thumbnail) {
        this.removeThumbnail(newRoadmap.id);
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async uploadThumbnail(id: string, url: string) {
    await this.roadmapsRepository.update(id, { thumbnail: url });
  }

  removeThumbnail(id: string) {
    const files = glob.sync(`public/${UPLOAD_THUMBNAIL_PATH}/${id}*`);
    files.forEach((file) => {
      fs.removeSync(file);
    });
  }
}
