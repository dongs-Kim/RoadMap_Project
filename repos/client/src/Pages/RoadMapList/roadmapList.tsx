import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Center, Divider, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';

import { BiTime } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { useTitle } from '../../Hooks/useTitle';
import { CardItem } from '../../Components/List/CardItem';
import { AiFillHeart } from 'react-icons/ai';
const RoadMapList = () => {
  const { category } = useParams();
  const title = category == 'back_end' ? '백엔드' : '프론트엔드';
  useTitle(`${title ?? ''} - Dev Roadmap`);
  const [sort, setSort] = useState('recently');

  const onClickAllSearch = useCallback(() => {
    setSort('recently');
  }, []);

  const onClickLikeSearch = useCallback(() => {
    setSort('like');
  }, []);

  return (
    <div style={{ width: '1410px', margin: '0 auto' }}>
      <Heading color="#333" pb="2" fontSize="3xl" ml="15px">
        {title}
      </Heading>
      <List display="flex" ml="15px" mt={5} mb={3} gap={3}>
        <ListItem>
          <Button
            variant="ghost"
            leftIcon={<BiTime />}
            color={sort === 'recently' ? 'teal' : '#888'}
            onClick={onClickAllSearch}
            colorScheme={sort === 'recently' ? 'teal' : 'gray'}
            size="md"
          >
            최신
          </Button>
          {sort === 'recently' && <Divider border="1px solid teal" />}
        </ListItem>
        <ListItem>
          <Button
            variant="ghost"
            leftIcon={<AiFillHeart />}
            color={sort === 'like' ? 'teal' : '#888'}
            onClick={onClickLikeSearch}
            colorScheme={sort === 'like' ? 'teal' : 'gray'}
            size="md"
          >
            좋아요
          </Button>
          {sort === 'like' && <Divider border="1px solid teal" />}
        </ListItem>
      </List>
      <CardItem category={category} sort={sort}></CardItem>
    </div>
  );
};

export default RoadMapList;
