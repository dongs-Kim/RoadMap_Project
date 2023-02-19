import { Divider, Heading } from '@chakra-ui/react';
import { useTitle } from '../../Hooks/useTitle';
import { CardItem } from './Components/CardItem';

const Mypage = () => {
  useTitle('내 로드맵 - Dev Roadmap');

  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="#333" pb="5" fontSize="2xl">
        내 로드맵
      </Heading>
      <Divider border="1px solid #ccc" marginBottom="1"></Divider>
      <CardItem />
    </div>
  );
};

export default Mypage;
