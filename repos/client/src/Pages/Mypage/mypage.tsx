import { Heading } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';

const Mypage = () => {
  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="#333" pb="5" pt="3">
        내 로드맵
      </Heading>
      <CardItem />
    </div>
  );
};

export default Mypage;
