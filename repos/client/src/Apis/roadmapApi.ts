import axios from 'axios';
import { RoadmapSetDto } from '../Interface/roadmap';

export const saveThumbnailAsync = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axios.post<string>(`/api/roadmaps/${id}/thumbnail`, formData);
  return data;
};

export const saveRoadmapAsync = async (saveDto: RoadmapSetDto) => {
  const { data } = await axios.post<boolean>('/api/roadmaps', saveDto);
  return data;
};
