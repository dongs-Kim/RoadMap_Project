import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Link, List, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { RoadmapDto } from '../../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';

interface Props {
  category: string | undefined;
}

export const CardItem = ({ category }: Props) => {
  const [roadmaps, setRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>(`/api/roadmaps/list/${category}`);
      setRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadRoadmaps();
  }, [loadRoadmaps]);

  return (
    <List display="flex">
      {loading && <div>Loading....</div>}
      {!loading &&
        roadmaps.map((roadmap) => (
          <List display="flex" key={roadmap.id} paddingLeft="5">
            <Card w="200px" alignContent="center">
              <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
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
              </Link>
              <Divider />
              <CardFooter>
                <AiFillHeart className="icon" size="15" color="red" />
              </CardFooter>
            </Card>
          </List>
        ))}
    </List>
  );
};
