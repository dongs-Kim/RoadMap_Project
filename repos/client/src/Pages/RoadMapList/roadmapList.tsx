import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from '../../Hooks/useTitle';
import { CardItem } from '../../Components/List/CardItem';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import axios from 'axios';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';

const RoadMapList = () => {
  const { category } = useParams();
  const title = category == 'back_end' ? '백엔드' : '프론트엔드';
  useTitle(`${title ?? ''} - Dev Roadmap`);
  const [sort, setSort] = useState('recently');
  const [roadmaps, setRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>(`/api/roadmaps/list/${category}`);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  useEffect(() => {
    setLoading(true);
    loadRoadmaps();
  }, [loadRoadmaps]);

  const onClickSort = useCallback((id: string) => {
    setSort(id);
  }, []);

  return (
    <RoadmapSortList title={title} sort={sort} onClickSort={onClickSort}>
      <CardItem loading={loading} roadmaps={roadmaps}></CardItem>
    </RoadmapSortList>
  );
};

export default RoadMapList;
