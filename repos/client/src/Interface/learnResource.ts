export interface LearnResourceCreateDto {
  name: string;
  contents: string;
  category: string;
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
  created_at: string;
  url?: string;
}
