import axios from 'axios';
import { IReply } from '../Interface/db';
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

export const saveLearnResourceReplyAsync = async (id: string, contents: string) => {
  const { data } = await axios.post<IReply[]>(`/api/learn-resource-replies`, { learn_resource_id: id, contents });
  return data;
};

export const deleteLearnResourceReplyAsync = async (id: string) => {
  const { data } = await axios.delete<boolean>(`/api/learn-resource-replies/${id}`);
  return data;
};

export const updateLearnResourceReplyAsync = async (id: string, contents: string) => {
  const { data } = await axios.patch<boolean>(`/api/learn-resource-replies/${id}`, { contents });
  return data;
};
