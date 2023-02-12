export const ROADMAP_ITEM_NAME_LIST = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Javascript' },
  { name: 'Typescript' },
  { name: 'React' },
  { name: 'Redux' },
  { name: 'Next.js' },
  { name: 'NestJS' },
  { name: 'TypeORM' },
  { name: 'Node.js' },
  { name: 'SQL' },
  { name: 'MySQL' },
  { name: 'express' },
  { name: 'Java' },
  { name: 'Python' },
  { name: 'C#' },
];

export const ROADMAP_CATEGORY = [
  { id: 'front_end', name: '프론트엔드 ' },
  { id: 'back_end', name: '백엔드' },
];
export const getRoadmapCategoryName = (id: string) => {
  return ROADMAP_CATEGORY.find((data) => data.id === id)?.name;
};
