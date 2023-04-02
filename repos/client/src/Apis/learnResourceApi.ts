import axios from 'axios';
import { LearnResourceCreateDto } from '../Interface/learnResource';

export const createLearnResourceAsync = async (saveDto: LearnResourceCreateDto) => {
  const { data } = await axios.post<boolean>('/api/learn-resource', saveDto);
  return data;
};
