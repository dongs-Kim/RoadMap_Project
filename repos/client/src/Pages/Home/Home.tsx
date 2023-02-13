import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CardItem } from './Components/CardItem';
import { menuCategories } from '../../Components/Menu/menu';

const Home = () => {
  return (
    <Flex flexDir="column">
      <Flex flexDir="column" paddingBottom="20">
        {menuCategories.map((category) => (
          <Heading key={category.type} pb="20">
            <Text fontSize="l" color="teal.400">
              {category.name}
              <RouterLink to={`Roadmap/List/${category.type}`}>
                <Button color="teal.300" bg="white">
                  더보기
                </Button>
              </RouterLink>
            </Text>
            <CardItem category={category.type}></CardItem>
          </Heading>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
