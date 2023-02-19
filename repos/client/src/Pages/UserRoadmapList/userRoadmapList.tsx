import { Link as RouterLink, useParams } from 'react-router-dom';
import { Avatar, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';
import { RoadmapDto, RoadmapLikeDto, RoadmapSetDto, User } from '../../Interface/roadmap';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTitle } from '../../Hooks/useTitle';

const UserRoadMapList = () => {
  const { id } = useParams();
  const [userRoadmaps, setUserRoadmaps] = useState<RoadmapLikeDto[]>([]);
  const [loading, setLoading] = useState(false);
  useTitle(`${userRoadmaps[0]?.User.nickname ?? ''} 로드맵 - Dev Roadmap`);

  const loadUserRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapLikeDto[]>(`/api/roadmaps/list/User/${id}`);
      setUserRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    loadUserRoadmaps();
  }, [loadUserRoadmaps]);

  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="gray.700" pb="5" pt="3" fontSize="md">
        {userRoadmaps[0]?.User && (
          <div>
            <Flex alignItems="center" gap={5} pb="4" height="180px">
              <Avatar size="xl" name={userRoadmaps[0].User?.nickname} src={userRoadmaps[0]?.User?.image} />
              <Flex flexDir="column" gap={3}>
                <Text fontWeight="bold" fontSize="xl">
                  {userRoadmaps[0].User.nickname}
                </Text>
                <Text fontSize="md">{userRoadmaps[0].User.comment}</Text>
              </Flex>
            </Flex>
            <Divider border="1px solid #ccc"></Divider>
          </div>
        )}
      </Heading>
      <CardItem roadMapInfo={userRoadmaps} loading={loading}></CardItem>
    </div>
  );
};

export default UserRoadMapList;
