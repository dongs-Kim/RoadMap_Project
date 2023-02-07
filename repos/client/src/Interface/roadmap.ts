import { Edge, Node } from 'reactflow';
import { RoadmapItemStatus } from '../Constants/roadmapItemStatus';
import { Roadmap } from '../Pages/RoadmapWrite/components/Roadmap';

export interface RoadmapItem {
  name: string;
  description: string;
  bgcolor: string;
  border: boolean;
  status?: RoadmapItemStatus;
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

export interface RoadmapSetDto {
  roadmap: RoadmapDto;
  nodes: Node<RoadmapItem>[];
  edges: Edge[];
  isUpdate?: boolean;
}

export interface RoadmapDto {
  id?: string;
  title: string;
  category?: string;
  public: boolean;
  contents: string;
  like?: number;
  thumbnail?: string;
}


export interface RoadmapLikeDto extends RoadmapDto{
  LikeUsers : User[]
}
