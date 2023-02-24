import { useParams } from 'react-router-dom';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import { RoadmapCategoryDto, User } from '../../Interface/roadmap';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTitle } from '../../Hooks/useTitle';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { CardItem } from '../../Components/List/CardItem';

const UserRoadMapList = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [roadmaps, setRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('recently');
  useTitle(`${user?.nickname} 로드맵 - Dev Roadmap`);

  const loadUserRoadmaps = useCallback(async () => {
    try {
      const { data: userData } = await axios.get<User>(`/api/users/roadMapListbyUser/${id}`);
      const { data: roadmapData } = await axios.get<RoadmapCategoryDto[]>(`/api/roadmaps/list/User/${id}`);
      if (roadmapData && sort == 'like') {
        roadmapData.sort((a, b) => {
          if (a.like > b.like) {
            return -1;
          }
          if (a.like < b.like) {
            return 1;
          }
          return 0;
        });
      }
      setUser(userData);
      setRoadmaps(roadmapData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, sort]);

  useEffect(() => {
    setLoading(true);
    loadUserRoadmaps();
  }, [loadUserRoadmaps]);

  const onClickSort = useCallback((id: string) => {
    setSort(id);
  }, []);

  return (
    <RoadmapSortList
      title={
        <Heading color="gray.700" fontSize="md">
          {user && (
            <div>
              <Flex alignItems="center" gap={5} height="140px">
                <Avatar size="xl" name={user.nickname} src={user.image} />
                <Flex flexDir="column" gap={3}>
                  <Text fontWeight="bold" fontSize="xl">
                    {user.nickname}
                  </Text>
                  <Text fontSize="md">{user.comment}</Text>
                </Flex>
              </Flex>
            </div>
          )}
        </Heading>
      }
      sort={sort}
      onClickSort={onClickSort}
    >
      <CardItem loading={loading} roadmaps={roadmaps}></CardItem>
    </RoadmapSortList>
  );
};

export default UserRoadMapList;
