import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';
import { useTitle } from '../../Hooks/useTitle';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { CardItem } from '../../Components/List/CardItem';

const FavoriteList = () => {
  useTitle('북마크 - Dev Roadmap');
  const { id } = useParams();
  const [roadmaps, setRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('recently');

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>(`/api/users/favoriteList/${id}`);
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
      setRoadmaps(data);
    } catch {
      toastError('로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [id, sort]);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  const onClickSort = useCallback((id: string) => {
    setSort(id);
  }, []);

  return (
    <RoadmapSortList title="북마크" sort={sort} onClickSort={onClickSort}>
      <CardItem loading={loading} roadmaps={roadmaps}></CardItem>
    </RoadmapSortList>
  );
};

export default FavoriteList;
