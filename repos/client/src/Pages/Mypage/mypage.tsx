import { useEffect, useState, useCallback } from 'react';
import { Button, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';

const Mypage = () => {
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const { data } = await axios.get<RoadmapDto[]>('/api/roadmaps/list/my');
        setMyRoadmaps(data);
      } catch {
        toastError('내 로드맵을 불러오지 못했습니다');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onClickCreate = useCallback(() => {
    navigate('/Roadmap/write');
  }, [navigate]);

  return (
    <div>
      <Heading as="h2" size="xl">
        마이 페이지
      </Heading>
      <Button colorScheme="teal" onClick={onClickCreate}>
        로드맵 만들기
      </Button>
      <div>
        <Heading as="h3" size="lg">
          내 로드맵
        </Heading>
        {loading && <div>...loading...</div>}
        {!loading && (
          <ul>
            {myRoadmaps.map((roadmap) => (
              <li key={roadmap.id}>
                <Link as={RouterLink} to={`/Roadmap/write/${roadmap.id}`}>
                  {roadmap.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Mypage;
