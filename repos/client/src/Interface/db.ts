export interface IUser {
  user_id: string;
  email: string;
  password?: string;
  nickname?: string;
  comment: string;
  image: string;
  created_at: Date;
}

export interface IRoadMap {
  roadmap_id: string;
  roadmap_user_id: string;
  category: string;
  like: number;
  public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IRoadMapItem {
  roadmap_item_id: string;
  roadmap_id: string;
  parent_item_id?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface IReply {
  reply_id: string;
  user_id: string;
  roadmap_id: string;
  contents?: string;
  created_at: Date;
}
