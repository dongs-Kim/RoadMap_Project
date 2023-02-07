import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate, Outlet, useLocation, Router } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';
import { menuCategories } from '../Menu/menu';
import { CgProfile } from 'react-icons/cg';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: userData, mutate: revalidateUser } = useSWR('/api/users', fetcher);

  const onClickLogIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const onClickLogOut = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        revalidateUser(false);
      });
  }, []);

  const onClickNewRoadMap = useCallback(() => {
    navigate('/Roadmap/write');
  }, [navigate]);
  const onClickFavoriteList = useCallback(() => {
    navigate(`/Favorite/List/${userData.id}`);
  }, [navigate]);
  const onClickMypage = useCallback(() => {
    navigate('/Mypage');
  }, [navigate]);
  const onClickProfile = useCallback(() => {
    navigate('/Profile');
  }, [navigate]);
  const onClickCategory = useCallback((category : string) => {
    navigate(`Roadmap/list/${category}`);
  }, [navigate]);

  return (
    <div>
      {/* 헤더 */}
      <Flex as="header" justifyContent="space-between" p={3} borderBottom="1px #ccc solid">
        <Box>          
          <RouterLink to="/">
            <Text color="teal.400" fontSize="xl" fontFamily="'Mochiy Pop One', sans-serif">Dev Roadmap</Text>
          </RouterLink>          
        </Box>
        <Box>
          <Button size="sm" colorScheme="teal" variant="outline" onClick={onClickNewRoadMap}>
            새 로드맵 작성
          </Button>
          <Menu>
            <MenuButton size="sm" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
              Category
            </MenuButton>
            <MenuList color="teal.600" fontFamily= "monospace">
              {menuCategories.map((category) => (
                <MenuItem pb = {4} key={category.type} onClick={() => onClickCategory(category.type)}>{category.name}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          {userData && (
            <span>
              <Menu>
                <MenuButton size="sm" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
                  {!userData.image && <CgProfile className="icon" size="25"  />}
                  {userData.image && <Box boxSize= '35'  justifyContent= "center" alignContent= "center" ><Image src={userData.image} borderRadius = "70%" alt="" sizes = "1" /></Box>}
                </MenuButton>
                <MenuList color="teal.600" fontFamily= "monospace">
                  <MenuItem pb = {3} onClick={onClickMypage}>내 로드맵</MenuItem>
                  <MenuItem pb = {3} onClick={onClickFavoriteList}>저장된 로드맵</MenuItem>
                  <MenuItem pb = {3} onClick={onClickProfile}>프로필 수정</MenuItem>
                  <MenuItem pb = {3} onClick={onClickLogOut}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            </span>
          )}
          {!userData && (
            <Button size="sm" colorScheme="teal" variant="ghost" onClick={onClickLogIn}>
              로그인
            </Button>
          )}
        </Box>
      </Flex>

      {/* 메인 */}
      <Flex as="main" p={3}>
        <Outlet></Outlet>
      </Flex>
    </div>
  );
};

export default Layout;
