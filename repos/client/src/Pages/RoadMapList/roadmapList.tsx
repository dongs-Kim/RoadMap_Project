import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Center, Divider, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';

const RoadMapList = () => {
  const { category } = useParams();
  const title = category == 'back_end' ? '백엔드' : '프론트엔드';
  const [sort, setSort] = useState('');

  const onClickAllSearch = useCallback(() => {
    setSort('');
  }, []);

  const onClickLikeSearch = useCallback(() => {
    setSort('like');
  }, []);

  return (
    <Flex flexDir="column">
      <Heading color="teal.400" pb="5">
        {title}
      </Heading>
      <List display="flex" paddingLeft="5" paddingBottom="4">
        <ListItem display="inline">
          <Link onClick={onClickAllSearch}>최신 순</Link>
        </ListItem>
        <ListItem display="inline" paddingLeft="5">
          <Link onClick={onClickLikeSearch}>좋아요 순</Link>
        </ListItem>
      </List>
      <CardItem category={category} sort={sort}></CardItem>
    </Flex>
  );
};

export default RoadMapList;
