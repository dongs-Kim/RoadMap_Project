import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Center, Divider, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { CardItem } from './Components/CardItem';

const UserRoadMapList = () => {
  const { category } = useParams();
  const [sort, setSort] = useState('');


  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <Heading color="teal.400" pb="5" pt = "3" />      
      <CardItem category={category} sort={sort}></CardItem>
    </div>
  );
};

export default UserRoadMapList;
