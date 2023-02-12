import { useState, useEffect } from 'react';
import { Button, Flex, Heading, Link, List, ListItem, Text, extendTheme } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CardItem } from './Components/CardItem';
import { RoadmapDto } from '../../Interface/roadmap';
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
