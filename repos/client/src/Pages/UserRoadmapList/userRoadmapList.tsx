import { Link as RouterLink, useParams } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';
import { RoadmapSetDto, User } from '../../Interface/roadmap';

interface Props {
  roadmapInfo: RoadmapSetDto;
}

const UserRoadMapList = ({ roadmapInfo }: Props) => {
  const { user } = roadmapInfo;

  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="teal.400" pb="5" pt="3">
        {user?.nickname}
        {user?.comment}
      </Heading>
      <CardItem id={user?.id}></CardItem>
    </div>
  );
};

export default UserRoadMapList;
