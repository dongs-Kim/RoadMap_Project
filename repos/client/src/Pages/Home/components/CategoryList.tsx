import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CardItem } from '../../../Components/List/CardItem';
import { RoadmapCategoryDto } from '../../../Interface/roadmap';

interface CategoryListProps {
  category: string;
}

export const CategoryList = ({ category }: CategoryListProps) => {
  const [roadmaps, setRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>(`/api/roadmaps/list/${category}`);
      setRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    loadRoadmaps();
  }, [loadRoadmaps]);

  return <CardItem loading={loading} roadmaps={roadmaps}></CardItem>;
};
