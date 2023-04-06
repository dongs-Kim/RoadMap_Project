import axios from 'axios';
import { LearnResourceCreateDto } from '../Interface/learnResource';

export const createLearnResourceAsync = async (saveDto: LearnResourceCreateDto) => {
  const { data } = await axios.post<boolean>('/api/learn-resource', saveDto);
  return data;
};

export const likeLearnResourceAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/learn-resource/${id}/like`);
  return data;
};

export const unlikeLearnResourceAsync = async (id: string) => {
  const { data } = await axios.post<boolean>(`/api/learn-resource/${id}/unlike`);
  return data;
};
