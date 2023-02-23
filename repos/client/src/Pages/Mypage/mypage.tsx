import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CardItem } from '../../Components/List/CardItem';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { useTitle } from '../../Hooks/useTitle';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';

const Mypage = () => {
  useTitle('내 로드맵 - Dev Roadmap');
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
    <RoadmapSortList title="내 로드맵" sort={sort} onClickSort={onClickSort}>
      <CardItem loading={loading} roadmaps={myRoadmaps}></CardItem>
    </RoadmapSortList>
  );
};

export default Mypage;
