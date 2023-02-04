import { Button } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';
import axios from 'axios';

const Home = () => {
  return (
    <div>
      <header style={{ backgroundColor: 'white' }}>로드맵 페이지</header>
      <span>첫화면 / 요약페이지</span>
      <div></div>
    </div>
  );
};

export default Home;
