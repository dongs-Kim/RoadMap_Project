import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
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
import { LearnResource } from 'src/entities/learn_resource';
import {
  moveTempImageToContents,
  getImagesInContents,
  removeContentsImage,
  getContentsImageFilename,
} from 'src/common/util';
import _ from 'lodash';

const UPLOAD_CONTENTS_PATH =
  process.env.NODE_ENV === 'production'
    ? 'static/contents'
    : 'static-dev/contents';
const UPLOAD_CONTENTS_FULL_PATH = path.join(PUBLIC_PATH, UPLOAD_CONTENTS_PATH);

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectRepository(Roadmap)
    private roadmapsRepository: Repository<Roadmap>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findOneSet(id: string, mode?: string, user?: User) {
    const dbRoadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: {
        RoadmapItems: {
          LearnResources: true,
        },
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
      contents_images: dbRoadmap.contents_images,
      thumbnail: dbRoadmap.thumbnail,
      bgcolor: dbRoadmap.bgcolor,
      like: dbRoadmap.LikeUsers?.length,
      created_at: dbRoadmap.created_at,
    };
    roadmapDto.nodes = dbRoadmap.RoadmapItems.map((item) => {
      return {
        id: item.id,
        type: item.type,
        width: item.width,
        height: item.height,
        zIndex: item.zIndex,
        data: {
          name: item.name,
          category: item.category,
          description: item.description,
          status: item.status as EN_ROADMAP_ITEM_STATUS | null,
          bgcolor: item.bgcolor,
          border: item.border,
          url: item.url,
          required: item.required as EN_ROADMAP_ITEM_REQUIRED | null,
          learnResources: item.LearnResources,
          contents_images: item.contents_images,
          bold: item.bold,
        },
        position: {
          x: item.positionX,
          y: item.positionY,
        },
      };
    });
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
      await this.removeThumbnail(id);
    }
    await removeContentsImage(id);
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

  async save(user: User, { roadmap, nodes, edges, mode }: SaveRoadmapDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const roadmapsRepository = queryRunner.manager.getRepository(Roadmap);

    // 수정인 경우
    if (mode === 'modify') {
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
    if (mode === 'copy') {
      // 이미지 복사
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

      // id 새로 채번
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

      // 본문 컨텐츠 이미지 복사
      if (!_.isEmpty(roadmap.contents_images)) {
        roadmap.contents_images = roadmap.contents_images.map((image) => {
          const originFile = image;
          const ext = path.extname(originFile);
          const filename = getContentsImageFilename(roadmap.id, ext);

          fs.copySync(
            path.join(PUBLIC_PATH, originFile),
            path.join(UPLOAD_CONTENTS_FULL_PATH, filename),
          );

          const newContentsImage = `/${UPLOAD_CONTENTS_PATH}/${filename}`;
          roadmap.contents = roadmap.contents.replace(
            new RegExp(originFile, 'g'),
            newContentsImage,
          );

          return newContentsImage;
        });
      }

      // 노드 컨텐츠 이미지 복사
      nodes.forEach((node) => {
        if (!_.isEmpty(node.data.contents_images)) {
          node.data.contents_images = node.data.contents_images.map((image) => {
            const originFile = image;
            const ext = path.extname(originFile);
            const filename = getContentsImageFilename(roadmap.id, ext);

            fs.copySync(
              path.join(PUBLIC_PATH, originFile),
              path.join(UPLOAD_CONTENTS_FULL_PATH, filename),
            );

            const newContentsImage = `/${UPLOAD_CONTENTS_PATH}/${filename}`;
            node.data.description = node.data.description.replace(
              new RegExp(originFile, 'g'),
              newContentsImage,
            );

            return newContentsImage;
          });
        }
      });
    }

    // 임시 이미지 파일을 영구 이미지 파일로 변경
    const { contents, contentsImages } = moveTempImageToContents(
      roadmap.id,
      roadmap.temp_images,
      roadmap.contents,
    );
    roadmap.contents = contents;

    // 사용 중인 이미지 체크
    roadmap.contents_images = getImagesInContents(
      [...(roadmap.contents_images ?? []), ...contentsImages],
      roadmap.contents,
    );

    nodes.map((node) => {
      // 임시 이미지 파일을 영구 이미지 파일로 변경
      const { contents, contentsImages } = moveTempImageToContents(
        roadmap.id,
        node.data.temp_images,
        node.data.description,
      );
      node.data.description = contents;

      // 사용 중인 이미지 체크
      console.log(node.data.description);
      console.log(node.data.contents_images);
      console.log(contentsImages);
      node.data.contents_images = getImagesInContents(
        [...(node.data.contents_images ?? []), ...contentsImages],
        node.data.description,
      );
      console.log(node.data.contents_images);
    });

    try {
      // nodes
      const newRoadmapItems = nodes.map((node) => {
        const roadmapItem = new RoadmapItem();
        roadmapItem.id = node.id;
        roadmapItem.name = node.data.name;
        roadmapItem.category = node.data.category;
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
        roadmapItem.contents_images = node.data.contents_images;
        roadmapItem.bold = node.data.bold;

        // learnResources
        const newLearnResources = node.data.learnResources?.map(
          (learnResource) => {
            const newLearnResource = new LearnResource();
            newLearnResource.id = learnResource.id;
            return newLearnResource;
          },
        );
        roadmapItem.LearnResources = newLearnResources;
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
      newRoadmap.bgcolor = roadmap.bgcolor;
      newRoadmap.contents_images = roadmap.contents_images;
      newRoadmap.User = user;
      newRoadmap.RoadmapItems = newRoadmapItems;
      newRoadmap.RoadmapEdges = newRoadmapEdges;
      await queryRunner.manager.getRepository(Roadmap).save(newRoadmap);
      await queryRunner.commitTransaction();

      //썸네일없는 경우 파일 삭제
      if (!newRoadmap.thumbnail) {
        await this.removeThumbnail(newRoadmap.id);
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async removeThumbnail(id: string) {
    const files = await glob(
      `${UPLOAD_THUMBNAIL_FULL_PATH}/${id}*`.replace(/\\/g, '/'),
    );
    files.forEach((file) => {
      fs.removeSync(file);
    });
  }
}
