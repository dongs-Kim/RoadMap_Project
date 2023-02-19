import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CardItem } from './Components/CardItem';
import { menuCategories } from '../../Components/Menu/menu';
import { useTitle } from '../../Hooks/useTitle';

const Home = () => {
  useTitle('Dev Roadmap');

  return (
    <Flex w="100%" justifyContent="center">
      <Flex flexDir="column" gap={10} w="1410px" ml={5} mr={5}>
        {menuCategories.map((category) => (
          <Flex key={category.type} flexDir="column">
            <Flex pt="3" ml="15px">
              <Heading fontSize="2xl" color="#333">
                {category.name}
              </Heading>
              <Button color="gray.600" bg="white" fontSize="md">
                <RouterLink to={`Roadmap/List/${category.type}`}>더보기</RouterLink>
              </Button>
            </Flex>
            <CardItem category={category.type}></CardItem>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
