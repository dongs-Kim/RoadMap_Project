import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';

const RoadMapList = () => {
  const { category } = useParams();
  const title = category == 'back_end' ? '백엔드' : '프론트엔드';
  const [like, setLike] = useState(false);

  const onClickAllSearch = useCallback(() => {
    setLike(false);
  },[])

  const onClickLikeSearch = useCallback(() => {
    setLike(true);
  },[])

  return (
    <div>
      <Heading as="h2" size="xl" color="teal.400" pb="7">
        {title}
      </Heading>
      <List display="flex" paddingLeft="5">
      <ListItem display = "inline">
          <Link onClick={onClickAllSearch}>
          전체
          </Link>
      </ListItem>
      <ListItem display = "inline"paddingLeft="5">
        <Link onClick={onClickLikeSearch}>
          좋아요 순
        </Link>
      </ListItem>      
      </List>
      <CardItem category={category} like ={like}></CardItem>
    </div>
  );
};

export default RoadMapList;
