import { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Heading,
  Link,
  useDisclosure,
  List,
  Card,
  CardBody,
  Image,
  Stack,
  CardFooter,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError, toastSuccess } from '../../Utils/toast';
import { RoadmapDeleteDialog } from '../../Components/Dialog/RoadmapDeleteDialog';
import { CardItem } from './Components/CardItem';

const Mypage = () => {
  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <Heading color="teal.400" pb="5" pt = "3" >
        내 로드맵
      </Heading>
      <CardItem/>            
    </div>
  );
};

export default Mypage;
