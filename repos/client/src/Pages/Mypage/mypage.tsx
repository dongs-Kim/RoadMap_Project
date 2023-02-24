import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CardItem } from '../../Components/List/CardItem';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useTitle } from '../../Hooks/useTitle';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';

const Mypage = () => {
  useTitle('내 로드맵 - Dev Roadmap');
  const { userData: user } = useUser();
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('recently');

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>('/api/roadmaps/list/my');
      if (data && sort == 'like') {
        data.sort((a, b) => {
          if (a.like > b.like) {
            return -1;
          }
          if (a.like < b.like) {
            return 1;
          }
          return 0;
        });
      }
      setMyRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

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
      <CardItem loading={loading} roadmaps={myRoadmaps}></CardItem>
    </RoadmapSortList>
  );
};

export default Mypage;
