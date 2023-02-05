import { useEffect, useState, useCallback } from 'react';
import { List, Button, Heading, Link, Image, Card, CardBody, Stack } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';

const FavoriteList = () => {
  const { id } = useParams();
  const [favoriteRoadmaps, setFavoriteRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadfavoriteRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>(`/api/users/favoriteList/${id}`);
      setFavoriteRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadfavoriteRoadmaps();
  }, [loadfavoriteRoadmaps]);

  return (
    <div>
      <Heading as="h2" size="xl" color="teal.400" pb="8">
        저장된 로드맵
      </Heading>
      <List display="flex">
        {loading && <div>loading...</div>}
        {!loading &&
          favoriteRoadmaps.map((roadmap) => (
            <List display="flex" key={roadmap.id} paddingLeft="7">
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
    </div>
  );
};

export default FavoriteList;
