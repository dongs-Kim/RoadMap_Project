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
      entities: [User, Roadmap, RoadmapItem, Reply],
      charset: 'utf8mb4_general_ci',
      synchronize: isProduction() ? false : true,
      logging: isProduction() ? false : true,
    }),
    UsersModule,
    RoadmapsModule,
    AuthModule,
    RoadmapItemsModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
