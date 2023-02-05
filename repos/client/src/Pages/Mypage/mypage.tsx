import { useEffect, useState, useCallback } from 'react';
import { Button, Heading, Link, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError, toastSuccess } from '../../Utils/toast';
import { RoadmapDeleteDialog } from '../../Components/Dialog/RoadmapDeleteDialog';

const Mypage = () => {
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>('/api/roadmaps/list/my');
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

  const onClickCreate = useCallback(() => {
    navigate('/Roadmap/write');
  }, [navigate]);

  const onClickDelete = useCallback(
    (roadmapId?: string) => {
      if (roadmapId) {
        setToDeleteId(roadmapId);
        onOpen();
      }
    },
    [onOpen],
  );

  const onRoadmapDelete = useCallback(async () => {
    if (toDeleteId) {
      await axios.delete(`/api/roadmaps/${toDeleteId}`);
      onClose();
      toastSuccess('삭제했습니다');
      setToDeleteId(null);
      loadMyRoadmaps();
    }
  }, [onClose, toDeleteId, loadMyRoadmaps]);

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
              <li style={{ listStyle: 'none' }} key={roadmap.id}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                    {!roadmap.thumbnail && <img src={'/img/NoImage.png'} alt="" width="250"></img>}
                    {roadmap.thumbnail && <img src={roadmap.thumbnail} alt="" width="250"></img>}
                  </Link>
                  <Link as={RouterLink} to={`/Roadmap/write/${roadmap.id}`}>
                    수정
                  </Link>
                  <Button colorScheme="teal" size="xs" onClick={() => onClickDelete(roadmap.id)}>
                    삭제
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <RoadmapDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onRoadmapDelete} />
    </div>
  );
};

export default Mypage;
