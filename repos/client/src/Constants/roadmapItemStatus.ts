const roadmapItemStatus = {
  todo: '예정',
  ing: '진행중',
  completed: '완료',
} as const;

export type RoadmapItemStatus = keyof typeof roadmapItemStatus;

export const getRoadmapItemStatusName = (id?: RoadmapItemStatus) => {
  return id ? roadmapItemStatus[id] : '';
};
