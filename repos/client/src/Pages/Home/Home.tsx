import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { menuCategories } from '../../Components/Menu/menu';
import { useTitle } from '../../Hooks/useTitle';
import { CategoryList } from './components/CategoryList';

const Home = () => {
  useTitle('Dev Roadmap');

  return (
    <Flex w="100%" justifyContent="center">
      <Flex flexDir="column" gap={10} w="1410px" ml={5} mr={5}>
        {menuCategories.map((category) => (
          <Flex key={category.type} flexDir="column">
            <Flex mt={5} ml="15px" alignItems="center">
              <Heading fontSize="2xl" color="#333">
                {category.name}
              </Heading>
              <Button color="gray.500" fontSize="md" ml={3} variant="ghost">
                <RouterLink to={`Roadmap/List/${category.type}`}>더보기</RouterLink>
              </Button>
            </Flex>
            <CategoryList category={category.type} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
