export const ROADMAP_ITEM_STATUS = {
  todo: '예정',
  ing: '진행중',
  completed: '완료',
} as const;

export type RoadmapItemStatus = keyof typeof ROADMAP_ITEM_STATUS | '';

export const getRoadmapItemStatusName = (id?: RoadmapItemStatus) => {
  return id ? ROADMAP_ITEM_STATUS[id] : '';
};
