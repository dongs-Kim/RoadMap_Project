import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { Button, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { CardItem } from '../Home/Components/CardItem';

const RoadMapList = () => {
  const { category } = useParams();
  const title = category == 'back_end' ? '백엔드' : '프론트엔드';

  return (
    <div>
      <Heading as="h2" size="xl" color="teal.400" pb="7">
        {title}
      </Heading>
      <CardItem category={category}></CardItem>
    </div>
  );
};

export default RoadMapList;
