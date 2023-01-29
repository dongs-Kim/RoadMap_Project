import { Edge, Node } from 'reactflow';
import { RoadmapItemStatus } from '../Constants/roadmapItemStatus';

export interface RoadmapItem {
  name: string;
  description: string;
  status?: RoadmapItemStatus;
}

export enum EN_ROADMAP_NODE_TYPE {
  StartNode = 'startNode',
  DownNode = 'downNode',
  LeftNode = 'leftNode',
  RigthNode = 'rightNode',
}

export enum EN_ROADMAP_HANDLE_ID {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export interface RoadmapSetDto {
  roadmap: RoadmapDto;
  nodes: Node<RoadmapItem>[];
  edges: Edge[];
}

export interface RoadmapDto {
  id?: string;
  title: string;
  category: string;
  public: boolean;
  contents: string;
  like?: number;
}