import { Card, CardBody, Heading, Image, Link, List, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toastError } from '../../../Utils/toast';
import { RoadmapDto } from '../../../Interface/roadmap';

export const CardItem = () => {
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>('/api/users/favoriteList/1');
      setMyRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  return (
    <List display="flex">
      {loading && <div>Loading....</div>}
      {!loading &&
        myRoadmaps.map((roadmap) => (
          <List display="flex" key={roadmap.id} paddingLeft="5">
            <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
              <Card w="200px" alignContent="center">
                {!roadmap.thumbnail && (
                  <CardBody>
                    <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{roadmap.title}</Heading>
                    </Stack>
                  </CardBody>
                )}
                {roadmap.thumbnail && (
                  <CardBody>
                    <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{roadmap.title}</Heading>
                    </Stack>
                  </CardBody>
                )}
              </Card>
            </Link>
          </List>
        ))}
    </List>
  );
};
