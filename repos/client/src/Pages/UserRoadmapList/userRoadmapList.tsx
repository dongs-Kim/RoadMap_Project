import { Link as RouterLink, useParams } from 'react-router-dom';
import { Avatar, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';
import { RoadmapDto, RoadmapLikeDto, RoadmapSetDto, User } from '../../Interface/roadmap';
import { userRoadMap } from '../../Interface/db';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTitle } from '../../Hooks/useTitle';

const UserRoadMapList = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [Roadmaps, setRoadmaps] = useState<RoadmapLikeDto[]>([]);
  const [loading, setLoading] = useState(false);
  useTitle(`${user?.nickname} 로드맵 - Dev Roadmap`);

  const loadUserRoadmaps = useCallback(async () => {
    try {
      const { data: userData } = await axios.get<User>(`/api/users/roadMapListbyUser/${id}`);
      const { data: roadmapData } = await axios.get<RoadmapLikeDto[]>(`/api/roadmaps/list/User/${id}`);
      setUser(userData);
      setRoadmaps(roadmapData);
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
      <Heading color="gray.700" pb="5" fontSize="md">
        {user && (
          <div>
            <Flex alignItems="center" gap={5} pb="4" height="140px">
              <Avatar size="xl" name={user.nickname} src={user.image} />
              <Flex flexDir="column" gap={3}>
                <Text fontWeight="bold" fontSize="xl">
                  {user.nickname}
                </Text>
                <Text fontSize="md">{user.comment}</Text>
              </Flex>
            </Flex>
            <Divider border="1px solid #ccc"></Divider>
          </div>
        )}
      </Heading>
      <CardItem roadMapInfo={Roadmaps} loading={loading}></CardItem>
    </div>
  );
};

export default UserRoadMapList;
