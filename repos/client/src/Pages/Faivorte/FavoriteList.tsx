import { useEffect, useState, useCallback } from 'react';
import { List, Button, Heading, Link, Image, Card, CardBody, Stack } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError } from '../../Utils/toast';
import { CardItem } from './Components/CardItem';

const FavoriteList = () => {
  const { id } = useParams();
    return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <Heading color="#333" pb="5" pt = "3" >
        북마크
      </Heading>
      <CardItem id = {id}></CardItem>
    </div>
  );
};

export default FavoriteList;
