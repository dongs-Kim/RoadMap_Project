export const ROADMAP_ITEM_STATUS = {
  todo: '예정',
  ing: '진행중',
  completed: '완료',
} as const;
export type RoadmapItemStatus = keyof typeof ROADMAP_ITEM_STATUS | '';
export const getRoadmapItemStatusName = (id?: RoadmapItemStatus) => {
  return id ? ROADMAP_ITEM_STATUS[id] : '';
};

export const ROADMAP_ITEM_REQUIRED = {
  required: '필수',
  optional: '선택',
} as const;
export type RoadmapItemRequired = keyof typeof ROADMAP_ITEM_REQUIRED | '';
export const getRoadmapItemRequiredName = (id?: RoadmapItemRequired) => {
  return id ? ROADMAP_ITEM_REQUIRED[id] : '';
};
