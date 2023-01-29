/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { ROADMAP_CATEGORY } from '../../Constants/roadmap';
import { RoadmapItem, RoadmapSetDto } from '../../Interface/roadmap';
import { IUser } from '../../Interface/db';
import { toastError } from '../../Utils/toast';
import { FlowView } from './FlowView';
import { RoadmapItemViewModal } from '../../Components/Modal/RoadmapItemViewModal';

const RoadmapView = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [roadmapSet, setRoadmapSet] = useState<RoadmapSetDto | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadmapItem, setRoadmapItem] = useState<RoadmapItem | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (!roadmapId) {
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${roadmapId}`, { params: { mode: 'view' } });
        setRoadmapSet(data);
      } catch {
        toastError('로드맵을 불러오지 못했습니다');
        navigate(-1);
      }

      try {
        const { data } = await axios.get<IUser>('/api/users');
        setUser(data);

        const { data: isLikeData } = await axios.get<boolean>(`/api/roadmaps/${roadmapId}/isLike`);
        setIsLike(isLikeData);
      } catch {
        // 로그인 안 한 상태
      }
    })();
  }, [navigate, roadmapId]);

  const category = useMemo(
    () => ROADMAP_CATEGORY.find((item) => item.id === roadmapSet?.roadmap.category)?.name,
    [roadmapSet],
  );

  const openModal = useCallback(
    (data: RoadmapItem) => {
      setRoadmapItem(data);
      onOpen();
    },
    [onOpen],
  );

  const onCloseModal = useCallback(() => {
    onClose();
    setRoadmapItem(null);
  }, [onClose]);

  const onClickLike = useCallback(
    _.debounce(() => {
      if (!roadmapSet || !_.isNumber(roadmapSet.roadmap.like)) {
        return;
      }
      if (isLike) {
        axios.post(`/api/roadmaps/${roadmapId}/unlike`);
        setIsLike(false);
        setRoadmapSet({
          ...roadmapSet,
          roadmap: {
            ...roadmapSet.roadmap,
            like: roadmapSet.roadmap.like - 1,
          },
        });
      } else {
        axios.post(`/api/roadmaps/${roadmapId}/like`);
        setIsLike(true);
        setRoadmapSet({
          ...roadmapSet,
          roadmap: {
            ...roadmapSet.roadmap,
            like: roadmapSet.roadmap.like + 1,
          },
        });
      }
    }, 200),
    [roadmapSet, isLike, roadmapId],
  );

  if (!roadmapId) {
    toastError('잘못된 접근입니다');
    navigate(-1);
    return null;
  }
  if (!roadmapSet) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Heading as="h2" size="xl">
        로드맵 보기
      </Heading>
      <div>
        {user && (
          <>
            <Button colorScheme="teal" size="sm" variant={isLike ? 'solid' : 'outline'} onClick={onClickLike}>
              좋아요
            </Button>
            <Button colorScheme="teal" size="sm">
              저장
            </Button>
          </>
        )}
        <Button colorScheme="teal" size="sm">
          공유
        </Button>
        <Button colorScheme="teal" size="sm">
          이미지 다운
        </Button>
      </div>
      <div>
        <label>제목</label>
        <span>{roadmapSet.roadmap.title}</span>
      </div>
      <div>
        <label>카테고리</label>
        <span>{category}</span>
      </div>
      <div>
        <label>설명</label>
        <span>{roadmapSet.roadmap.contents}</span>
      </div>
      <div>
        <label>좋아요</label>
        <span>{roadmapSet.roadmap.like}</span>
      </div>
      <div>
        <label>로드맵</label>
        <FlowView nodes={roadmapSet.nodes} edges={roadmapSet.edges} openModal={openModal} />
      </div>
      {isOpen && roadmapItem && <RoadmapItemViewModal onClose={onCloseModal} data={roadmapItem} />}
    </div>
  );
};

export default RoadmapView;
