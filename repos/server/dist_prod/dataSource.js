"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const roadmap_entity_1 = require("./src/entities/roadmap.entity");
const roadmap_item_entity_1 = require("./src/entities/roadmap_item.entity");
const reply_entity_1 = require("./src/entities/reply.entity");
const user_entity_1 = require("./src/entities/user.entity");
const roadmap_edge_entity_1 = require("./src/entities/roadmap_edge.entity");
const learn_resource_1 = require("./src/entities/learn_resource");
const path_1 = __importDefault(require("path"));
const learn_resource_reply_entity_1 = require("./src/entities/learn_resource_reply.entity");
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env.production') });
}
else {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env.development') });
}
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        user_entity_1.User,
        roadmap_entity_1.Roadmap,
        roadmap_item_entity_1.RoadmapItem,
        roadmap_edge_entity_1.RoadmapEdge,
        reply_entity_1.Reply,
        learn_resource_1.LearnResource,
        learn_resource_reply_entity_1.LearnResourceReply,
    ],
    charset: 'utf8mb4_general_ci',
    synchronize: false,
    logging: true,
});
exports.default = dataSource;
//# sourceMappingURL=dataSource.js.map