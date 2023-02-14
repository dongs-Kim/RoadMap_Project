import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CardItem } from './Components/CardItem';
import { menuCategories } from '../../Components/Menu/menu';

const Home = () => {
  return (
    <Flex flexDir="column">
      <Flex flexDir="column" paddingBottom="15">
        {menuCategories.map((category) => (
          <Heading key={category.type} pb="20">
            <Text fontSize="2xl" color="#333">
              {category.name}
              <Button color="gray.600" bg="white" fontSize= "md">
                <RouterLink to={`Roadmap/List/${category.type}`}>                
                  더보기
                </RouterLink>
              </Button>
            </Text>
            <CardItem category={category.type}></CardItem>
          </Heading>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
