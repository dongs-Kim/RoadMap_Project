import { Edge, Node } from 'reactflow';

export interface RoadmapItem {
  name: string;
  description: string;
  status?: EN_ROADMAP_ITEM_STATUS;
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

export enum EN_ROADMAP_ITEM_STATUS {
  Todo = 'todo',
  Ing = 'ing',
  Completed = 'completed',
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
}
