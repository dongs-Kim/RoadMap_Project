import {
  background,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Link,
  List,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { RoadmapDto, RoadmapLikeDto } from '../../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';

interface Props {
  category: string | undefined;
  sort: string | undefined;
}

export const CardItem = ({ category, sort }: Props) => {
  const [roadmaps, setRoadmaps] = useState<RoadmapLikeDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapLikeDto[]>(`/api/roadmaps/list/${category}`);
      if (data && sort == 'like') {
        data.sort((a, b) => {
          if (a.LikeUsers.length > b.LikeUsers.length) {
            return -1;
          }
          if (a.LikeUsers.length < b.LikeUsers.length) {
            return 1;
          }
          return 0;
        });
      }
      setRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  // useEffect(() => {
  //   setRoadmaps(roadmaps.sort());
  // },[sort])

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
                  <Tooltip label={roadmap.contents}>
                    <CardBody
                      position="relative"
                      _hover={{
                        background: 'teal.500',
                        color: 'white',
                        transition: 'opacity 0.35s ease-in-out',
                        opacity: '1',
                      }}
                    >
                      <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{roadmap.title}</Heading>
                      </Stack>
                    </CardBody>
                  </Tooltip>
                )}
                {roadmap.thumbnail && (
                  <Tooltip label={roadmap.contents}>
                    <CardBody
                      position="relative"
                      _hover={{
                        background: 'teal.300',
                        color: 'white',
                        transition: 'opacity 0.35s ease-in-out',
                        opacity: '1',
                      }}
                    >
                      <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{roadmap.title}</Heading>
                      </Stack>
                    </CardBody>
                  </Tooltip>
                )}
              </Link>
              <Divider />
              <CardFooter>
                <AiFillHeart className="icon" size="15" color="red" />
                <Text pl="1" fontSize="small">
                  {roadmap.LikeUsers.length}
                </Text>
              </CardFooter>
            </Card>
          </List>
        ))}
    </List>
  );
};
