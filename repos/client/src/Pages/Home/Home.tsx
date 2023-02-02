import React from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

const Home = () => {
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  if (!userData) {
    return <Navigate to="/login"></Navigate>;
  }

  return <div>첫화면 / 요약페이지 입니다.</div>;
};

export default Home;
