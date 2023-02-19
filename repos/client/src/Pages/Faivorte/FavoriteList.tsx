import { useEffect, useState, useCallback } from 'react';
import { List, Button, Heading, Link, Image, Card, CardBody, Stack, Divider } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';
import { CardItem } from './Components/CardItem';
import { useTitle } from '../../Hooks/useTitle';

const FavoriteList = () => {
  useTitle('북마크 - Dev Roadmap');
  const { id } = useParams();
  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      <Heading color="#333" pb="5" fontSize="2xl">
        북마크
      </Heading>
      <Divider border="1px solid #ccc" marginBottom="1"></Divider>
      <CardItem id={id}></CardItem>
    </div>
  );
};

export default FavoriteList;
