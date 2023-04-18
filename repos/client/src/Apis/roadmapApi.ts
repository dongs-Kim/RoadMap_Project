import axios from 'axios';
import { IReply } from '../Interface/db';
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

export const bookmarkRoadmapAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/users/store-roadmap/`, { roadmap_id: id });
  return data;
};

export const unbookmarkRoadmapAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/users/unstore-roadmap/`, { roadmap_id: id });
  return data;
};

export const likeRoadmapAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/roadmaps/${id}/like`);
  return data;
};

export const unlikeRoadmapAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/roadmaps/${id}/unlike`);
  return data;
};

export const saveReplyAsync = async (id: string, contents: string) => {
  const { data } = await axios.post<IReply[]>(`/api/replies`, { roadmap_id: id, contents });
  return data;
};

export const deleteReplyAsync = async (id: string) => {
  const { data } = await axios.delete<boolean>(`/api/replies/${id}`);
  return data;
};

export const updateReplyAsync = async (id: string, contents: string) => {
  const { data } = await axios.patch<boolean>(`/api/replies/${id}`, { contents });
  return data;
};

export const saveTempImageAsync = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axios.post<string>(`/api/roadmaps/tempImage`, formData);
  return data;
};
