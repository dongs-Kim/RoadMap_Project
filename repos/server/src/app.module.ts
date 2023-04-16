import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isProduction } from './config/configuration';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { Roadmap } from './entities/roadmap.entity';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { AuthModule } from './auth/auth.module';
import { RoadmapItemsModule } from './roadmap_items/roadmap_items.module';
import { RoadmapItem } from './entities/roadmap_item.entity';
import { RepliesModule } from './replies/replies.module';
import { Reply } from './entities/reply.entity';
import { RoadmapEdge } from './entities/roadmap_edge.entity';
import { LearnResource } from './entities/learn_resource';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LearnResourceModule } from './learn_resource/learn_resource.module';
import { LearnResourceReply } from './entities/learn_resource_reply.entity';
import { LearnResourceRepliesModule } from './learn_resource_replies/learn_resource_replies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isProduction() ? '.env.production' : '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Roadmap,
        RoadmapItem,
        RoadmapEdge,
        Reply,
        LearnResource,
        LearnResourceReply,
      ],
      charset: 'utf8mb4_general_ci',
      synchronize: isProduction() ? false : true,
      logging: isProduction() ? false : true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    UsersModule,
    RoadmapsModule,
    AuthModule,
    RoadmapItemsModule,
    RepliesModule,
    LearnResourceModule,
    LearnResourceRepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
