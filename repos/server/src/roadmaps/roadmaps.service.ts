import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs-extra';
import path from 'path';
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
import {
  getThumbnailFilename,
  UPLOAD_THUMBNAIL_FULL_PATH,
  UPLOAD_THUMBNAIL_PATH,
} from './thumbnail-upload.option';
import { PUBLIC_PATH } from 'src/config/configuration';

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
      bgcolor: dbRoadmap.bgcolor,
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

  async findMyAll(user: User) {
    const result = await this.roadmapsRepository.find({
      where: {
        User: {
          id: user.id,
        },
      },
      relations: {
        LikeUsers: true,
        Replies: true,
        User: true,
      },
      order: {
        updated_at: 'desc',
      },
    });

    return result.map((roadmap) => {
      const { LikeUsers, Replies, User, ...restRoadmap } = roadmap;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...restUser } = User;
      return {
        ...restRoadmap,
        User: restUser,
        like: LikeUsers.length,
        reply: Replies.length,
      };
    });
  }

  async findHomeListByCount(category: string) {
    const result = await this.roadmapsRepository.find({
      where: {
        category: category,
        public: true,
      },
      relations: {
        LikeUsers: true,
        Replies: true,
        User: true,
      },
      order: {
        updated_at: 'desc',
      },
      take: 5,
      skip: 0,
    });

    return result.map((roadmap) => {
      const { LikeUsers, Replies, User, ...restRoadmap } = roadmap;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...restUser } = User;
      return {
        ...restRoadmap,
        User: restUser,
        like: LikeUsers.length,
        reply: Replies.length,
      };
    });
  }

  async findCategory(category: string) {
    const result = await this.roadmapsRepository.find({
      where: {
        category: category,
        public: true,
      },
      relations: {
        LikeUsers: true,
        Replies: true,
        User: true,
      },
      order: {
        updated_at: 'desc',
      },
    });

    return result.map((roadmap) => {
      const { LikeUsers, Replies, User, ...restRoadmap } = roadmap;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...restUser } = User;
      return {
        ...restRoadmap,
        User: restUser,
        like: LikeUsers.length,
        reply: Replies.length,
      };
    });
  }

  async findByUser(Userid: string) {
    const result = await this.roadmapsRepository.find({
      where: {
        User: {
          id: Userid,
        },
        public: true,
      },
      relations: {
        LikeUsers: true,
        Replies: true,
        User: true,
      },
      order: {
        updated_at: 'desc',
      },
    });

    return result.map((roadmap) => {
      const { LikeUsers, Replies, User, ...restRoadmap } = roadmap;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...restUser } = User;
      return {
        ...restRoadmap,
        User: restUser,
        like: LikeUsers.length,
        reply: Replies.length,
      };
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
    // roadmap ??????
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // ?????? like ????????? ??????
    if (roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers??? ??????
    roadmap.LikeUsers.push(user);
    await this.roadmapsRepository.save(roadmap);
  }

  async unlike(roadmap_id: string, user: User) {
    // roadmap ??????
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id: roadmap_id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // like ?????? ????????? ??????
    if (!roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers?????? ??????
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

  async save(user: User, { roadmap, nodes, edges, mode }: SaveRoadmapDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const roadmapsRepository = queryRunner.manager.getRepository(Roadmap);

    // ????????? ??????
    if (mode === 'modify') {
      // ??????????????? ??????
      const existRoadmap = await roadmapsRepository.findOne({
        where: { id: roadmap.id },
        relations: {
          User: true,
        },
      });
      if (!existRoadmap) {
        throw new BadRequestException();
      }

      // ??? ???????????? ????????? ??????
      if (existRoadmap.User.id !== user.id) {
        throw new ForbiddenException();
      }
    }
    if (mode === 'copy') {
      // ????????? ??????
      if (roadmap.thumbnail) {
        const originFile = roadmap.thumbnail.split('?')[0];
        const ext = path.extname(originFile);
        const thumbnail = getThumbnailFilename(roadmap.id, ext);

        fs.copySync(
          path.join(PUBLIC_PATH, originFile),
          path.join(UPLOAD_THUMBNAIL_FULL_PATH, thumbnail),
        );

        roadmap.thumbnail = `/${UPLOAD_THUMBNAIL_PATH}/${thumbnail}`;
      }

      // id ?????? ??????
      const idMap = new Map<string, string>();
      nodes = nodes.map(({ id, ...rest }) => {
        idMap.set(id, shortUUID.generate());
        return { ...rest, id: idMap.get(id) };
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      edges = edges.map(({ id, source, target, ...rest }) => {
        return {
          ...rest,
          id: shortUUID.generate(),
          source: idMap.get(source),
          target: idMap.get(target),
        };
      });
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

      // roadmap ??????
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
      newRoadmap.bgcolor = roadmap.bgcolor;
      newRoadmap.User = user;
      newRoadmap.RoadmapItems = newRoadmapItems;
      newRoadmap.RoadmapEdges = newRoadmapEdges;
      await queryRunner.manager.getRepository(Roadmap).save(newRoadmap);
      await queryRunner.commitTransaction();

      //??????????????? ?????? ?????? ??????
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
    const files = glob.sync(`${UPLOAD_THUMBNAIL_FULL_PATH}/${id}*`);
    files.forEach((file) => {
      fs.removeSync(file);
    });
  }
}
