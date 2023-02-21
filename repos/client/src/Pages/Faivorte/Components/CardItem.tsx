import { Card, CardBody, CardFooter, Flex, Heading, Image, Link, List, ListItem, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toastError } from '../../../Utils/toast';
import { RoadmapDto, RoadmapLikeDto } from '../../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';
import { Loading } from '../../../Components/Page/Loading';
import { BsPatchExclamation } from 'react-icons/bs';

interface Props {
  id?: string;
}

export const CardItem = ({ id }: Props) => {
  const [favoriteRoadmaps, setFavoriteRoadmaps] = useState<RoadmapLikeDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadfavoriteRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapLikeDto[]>(`/api/users/favoriteList/${id}`);
      setFavoriteRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    loadfavoriteRoadmaps();
  }, [loadfavoriteRoadmaps]);

  return (
    <div>
      <Loading isOpen={loading} />
      {!loading && favoriteRoadmaps.length == 0 && (
        <Flex justifyContent="center" marginTop="40px" flexDir="column" alignItems="center" gap="3">
          <BsPatchExclamation size="30px"></BsPatchExclamation>
          등록된 로드맵이 없습니다
        </Flex>
      )}
      <List display="flex" flexWrap="wrap">
        {favoriteRoadmaps &&
          favoriteRoadmaps.map((roadmap) => (
            <ListItem display="flex" key={roadmap.id} margin="10px">
              <Card
                w="200px"
                boxShadow="none"
                alignContent="center"
                backgroundColor="none"
                border="1px solid #ccc"
                borderRadius="lg"
                padding="10px"
                transition="box-shadow 0.1s ease-in 0s, transform 0.1s ease-in 0s"
                _hover={{
                  background: 'gray.100',
                  color: 'black',
                  opacity: '1',
                  transform: 'translateY(-8px)',
                  boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 2px 0px',
                }}
              >
                <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`} _hover={{ textDecoration: 'none' }}>
                  {!roadmap.thumbnail && (
                    <CardBody borderBottom="1px solid #ccc" padding="0">
                      <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" margin="0 auto" />
                      <Stack mt="6" spacing="3">
                        <h3
                          style={{
                            display: '-webkit-box',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            verticalAlign: 'top',
                            wordBreak: 'break-all',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            height: '56px',
                          }}
                        >
                          {roadmap.title}
                        </h3>
                      </Stack>
                    </CardBody>
                  )}
                  {roadmap.thumbnail && (
                    <CardBody borderBottom="1px solid #ccc" padding="0">
                      <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" margin="0 auto" />
                      <Stack mt="6" spacing="3">
                        <h3
                          style={{
                            display: '-webkit-box',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            verticalAlign: 'top',
                            wordBreak: 'break-all',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            height: '56px',
                          }}
                        >
                          {roadmap.title}
                        </h3>
                      </Stack>
                    </CardBody>
                  )}
                </Link>
                <CardFooter justifyContent="space-between" padding="10px">
                  <Flex alignItems="center">
                    <Text fontSize="3" ml="2">
                      by. {roadmap.User?.nickname}
                    </Text>
                  </Flex>
                </CardFooter>
              </Card>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
