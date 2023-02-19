"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const configuration_1 = require("./config/configuration");
const user_entity_1 = require("./entities/user.entity");
const users_module_1 = require("./users/users.module");
const roadmap_entity_1 = require("./entities/roadmap.entity");
const roadmaps_module_1 = require("./roadmaps/roadmaps.module");
const auth_module_1 = require("./auth/auth.module");
const roadmap_items_module_1 = require("./roadmap_items/roadmap_items.module");
const roadmap_item_entity_1 = require("./entities/roadmap_item.entity");
const replies_module_1 = require("./replies/replies.module");
const reply_entity_1 = require("./entities/reply.entity");
const roadmap_edge_entity_1 = require("./entities/roadmap_edge.entity");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: (0, configuration_1.isProduction)() ? '.env.production' : '.env.development',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [user_entity_1.User, roadmap_entity_1.Roadmap, roadmap_item_entity_1.RoadmapItem, roadmap_edge_entity_1.RoadmapEdge, reply_entity_1.Reply],
                charset: 'utf8mb4_general_ci',
                synchronize: (0, configuration_1.isProduction)() ? false : true,
                logging: (0, configuration_1.isProduction)() ? false : true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../public'),
            }),
            users_module_1.UsersModule,
            roadmaps_module_1.RoadmapsModule,
            auth_module_1.AuthModule,
            roadmap_items_module_1.RoadmapItemsModule,
            replies_module_1.RepliesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map