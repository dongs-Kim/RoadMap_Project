import { Edge, Node } from 'reactflow';
import { RoadmapItemRequired, RoadmapItemStatus } from '../Constants/roadmapItem';

export interface RoadmapItem {
  name: string;
  description: string;
  bgcolor: string;
  border: boolean;
  status?: RoadmapItemStatus;
  url?: string;
  required?: RoadmapItemRequired;
}

export enum EN_ROADMAP_NODE_TYPE {
  StartNode = 'startNode',
  DownNode = 'downNode',
  LeftNode = 'leftNode',
  RigthNode = 'rightNode',
  StickerNode = 'stickerNode',
}

export enum EN_ROADMAP_EDGE_TYPE {
  RoadmapEdge = 'roadmapEdge',
}

export enum EN_ROADMAP_HANDLE_ID {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export interface User {
  id: string;
  email: string;
  password?: string;
  nickname?: string;
  comment: string;
  image: string;
  created_at: Date;
}

export enum EN_EDGE_LINE_TYPE {
  solid = '실선',
  dash = '점선',
}
export type EdgeLineType = keyof typeof EN_EDGE_LINE_TYPE;

export type RoadmapWriteMode = 'new' | 'copy' | 'modify';

export interface RoadmapSetDto {
  roadmap: RoadmapDto;
  nodes: Node<RoadmapItem>[];
  edges: Edge<EdgeData>[];
  user?: User;
  mode?: RoadmapWriteMode;
}

export interface RoadmapDto {
  id?: string;
  title: string;
  category: string;
  public: boolean;
  contents: string;
  like?: number;
  thumbnail?: string;
  created_at?: string;
}

export interface RoadmapLikeDto extends RoadmapDto {
  LikeUsers: User[];
  User: User;
}

export interface RoadmapCategoryDto extends RoadmapDto {
  User: User;
  like: number;
  reply: number;
}

export interface EdgeData {
  color: string;
  lineType: EdgeLineType;
}

export type NodeMode = 'write' | 'view';
