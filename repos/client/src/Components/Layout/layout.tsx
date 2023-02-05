import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate, Outlet, useLocation, Router } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

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
  const onClickRoadMapList = useCallback(() => {
    navigate('/Roadmap/List');
  }, [navigate]);
  const onClickMypage = useCallback(() => {
    navigate('/Mypage');
  }, [navigate]);
  const onClickProfile = useCallback(() => {
    navigate('/Profile');
  }, [navigate]);

  return (
    <div>
      {/* 헤더 */}
      <Flex as="header" justifyContent="space-between" p={3} borderBottom="1px #ccc solid">
        <Box>
          <Heading size="lg">Dev Roadmap</Heading>
        </Box>
        <Box>
          <Button size="sm" colorScheme="teal" variant="ghost" onClick={onClickNewRoadMap}>
            새 로드맵 작성
          </Button>
          <Menu>
            <MenuButton size="sm" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
              카테고리
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickRoadMapList}>백엔드</MenuItem>
              <MenuItem onClick={onClickRoadMapList}>프론트엔드</MenuItem>
            </MenuList>
          </Menu>
          {userData && (
            <span>
              <Menu>
                <MenuButton size="sm" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
                  작업메뉴
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onClickRoadMapList}>전체 로드맵</MenuItem>
                  <MenuItem onClick={onClickMypage}>내 로드맵</MenuItem>
                  <MenuItem onClick={onClickProfile}>프로필 수정</MenuItem>
                  <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>
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
