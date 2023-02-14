import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Center, Divider, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';
import { BiTime } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
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
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="#333" pb="5" pt="3">
        {title}
      </Heading>
      <List display="flex" paddingLeft="5" paddingBottom="4">
        <ListItem display="inline">
          <Flex alignItems="center">
            <BiTime />
            <Link pl="2" onClick={onClickAllSearch}>
              {' '}
              최신 순
            </Link>
          </Flex>
        </ListItem>
        <ListItem display="inline" paddingLeft="5">
          <Flex alignItems="center">
            <FcLike />
            <Link pl="2" onClick={onClickLikeSearch}>
              좋아요 순
            </Link>
          </Flex>
        </ListItem>
      </List>
      <CardItem category={category} sort={sort}></CardItem>
    </div>
  );
};

export default RoadMapList;
