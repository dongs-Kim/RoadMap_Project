import { useState, useEffect } from 'react';
import { Button, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';
import axios from 'axios';
import { CardItem } from './Components/CardItem';
import { RoadmapDto } from '../../Interface/roadmap';

const Home = () => {
  const [allRoadmaps, setAllRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>('/api/roadmaps');
      setAllRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  return (
    <Flex flexDir="column">
      <Flex flexDir="column">
        <Heading>백엔드</Heading>
        <List display="flex">
          {allRoadmaps.map((roadmap) => (
            <li style={{ listStyle: 'none' }} key={roadmap.id}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                  {!roadmap.thumbnail && <img src={'/img/NoImage.png'} alt="" width="250"></img>}
                  {roadmap.thumbnail && <img src={roadmap.thumbnail} alt="" width="250"></img>}
                </Link>
                <div>{roadmap.title}</div>
              </div>
            </li>
          ))}
        </List>
      </Flex>
      <Flex flexDir="column">
        <Heading>프론트엔드</Heading>
        <List display="flex">
          {allRoadmaps.map((roadmap) => (
            <li style={{ listStyle: 'none' }} key={roadmap.id}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                  {!roadmap.thumbnail && <img src={'/img/NoImage.png'} alt="" width="250"></img>}
                  {roadmap.thumbnail && <img src={roadmap.thumbnail} alt="" width="250"></img>}
                </Link>
                <div>{roadmap.title}</div>
              </div>
            </li>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};

export default Home;
