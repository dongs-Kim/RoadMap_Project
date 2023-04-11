export interface LearnResourceCreateDto {
  id?: string;
  name: string;
  contents: string;
  category: string;
  mode: 'new' | 'modify';
  url?: string;
}

export interface LearnResourceListDto {
  items: LearnResourceListItem[];
  totalCount: number;
}

export interface LearnResourceListItem {
  id: string;
  name: string;
  contents: string;
  category: string;
  like: number;
  user_id: string;
  user_nickname: string;
  user_image?: string;
  created_at: string;
  url?: string;
}

export type RoadmapLearnResourceDto = Omit<LearnResourceListItem, 'like' | 'user_id' | 'user_nickname'>;
