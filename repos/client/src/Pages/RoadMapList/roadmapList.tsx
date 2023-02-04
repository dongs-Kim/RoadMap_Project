import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { Button, Heading, Link } from '@chakra-ui/react';

const RoadMapList = () => {
  const { categoryParam } = useParams();
  const [allRoadmaps, setAllRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>('/api/roadmaps');
      setAllRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  if (!userData) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div>
      <Heading as="h2" size="xl">
        전체 로드맵 리스트
      </Heading>
      <div>
        {loading && <div>...loading...</div>}
        {!loading && (
          <ul>
            {allRoadmaps.map((roadmap) => (
              <li style={{ listStyle: 'none' }} key={roadmap.id}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                    {!roadmap.thumbnail && <img src={'/img/NoImage.png'} alt="" width="250"></img>}
                    {roadmap.thumbnail && <img src={roadmap.thumbnail} alt="" width="250"></img>}
                  </Link>
                  <div>{roadmap.title}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoadMapList;
