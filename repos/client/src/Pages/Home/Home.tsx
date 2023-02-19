import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CardItem } from './Components/CardItem';
import { menuCategories } from '../../Components/Menu/menu';
import { useTitle } from '../../Hooks/useTitle';

const Home = () => {
  useTitle('Dev Roadmap');

  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Flex flexDir="column">
        {menuCategories.map((category) => (
          <Heading key={category.type} color="#333" pt="3">
            <Text fontSize="2xl" color="#333">
              {category.name}
              <Button color="gray.600" bg="white" fontSize="md">
                <RouterLink to={`Roadmap/List/${category.type}`}>더보기</RouterLink>
              </Button>
            </Text>
            <CardItem category={category.type}></CardItem>
          </Heading>
        ))}
      </Flex>
    </div>
  );
};

export default Home;
