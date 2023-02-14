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
  Divider,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { menuCategories } from '../Menu/menu';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { LoginDialog } from '../Dialog/LoginDialog';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData, mutate: revalidateUser, isLogined } = useUser();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

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
        navigate('/');
      });
  }, [navigate, revalidateUser]);

  const onClickNewRoadMap = useCallback(() => {
    if (isLogined) {
      navigate('/Roadmap/write');
    } else {
      onOpenLogin();
    }
  }, [navigate, isLogined, onOpenLogin]);
  const onClickFavoriteList = useCallback(() => {
    navigate(`/Favorite/List/${userData.id}`);
  }, [navigate]);
  const onClickMypage = useCallback(() => {
    navigate('/Mypage');
  }, [navigate]);
  const onClickProfile = useCallback(() => {
    navigate('/Profile');
  }, [navigate]);
  const onClickCategory = useCallback(
    (category: string) => {
      navigate(`Roadmap/list/${category}`);
    },
    [navigate],
  );

  return (
    <div>
      {/* 헤더 */}
      <Flex
        as="header"
        justifyContent="space-between"
        p={3}
        borderBottom="1px #ccc solid"
        position="sticky"
        top={0}
        bg="#fff"
        zIndex={1}
      >
        <Box>
          <RouterLink to="/">
            <Text color="#333" fontSize="xl" fontFamily="'Mochiy Pop One', sans-serif">
              Dev Roadmap
            </Text>
          </RouterLink>
        </Box>
        <Box>
          <Button size="sm" colorScheme="#333" variant="outline" onClick={onClickNewRoadMap}>
            새 로드맵 작성
          </Button>
          <Menu>
            <MenuButton size="sm" colorScheme="#333" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
              Category
            </MenuButton>
            <MenuList color="#333" fontFamily="monospace">
              {menuCategories.map((category) => (
                <MenuItem pb={4} key={category.type} onClick={() => onClickCategory(category.type)}>
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {userData && (
            <span>
              <Menu>
                <MenuButton size="sm" colorScheme="#333" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
                  <Avatar size="sm" name={userData?.nickname} src={userData?.image} />
                </MenuButton>
                <MenuList color="#333" fontFamily="monospace">
                  <MenuItem pb={3} onClick={onClickMypage}>
                    내 로드맵
                  </MenuItem>
                  <MenuItem pb={3} onClick={onClickFavoriteList}>
                    북마크
                  </MenuItem>
                  <MenuItem pb={3} onClick={onClickProfile}>
                    프로필 수정
                  </MenuItem>
                  <MenuItem pb={3} onClick={onClickLogOut}>
                    로그아웃
                  </MenuItem>
                </MenuList>
              </Menu>
            </span>
          )}
          {!userData && (
            <Button size="sm" colorScheme="#333" variant="ghost" onClick={onClickLogIn}>
              로그인
            </Button>
          )}
        </Box>
      </Flex>

      {/* 메인 */}
      <Flex as="main" pb={20} minH="calc(100vh - 190px)">
        <Outlet></Outlet>
      </Flex>

      {/* 푸터 */}
      <Divider borderColor="#ccc" />
      <Flex justifyContent="center">
        <Flex flexDir="column" w="100%" maxW="1000px" p={5} alignItems="flex-end">
          <Flex fontWeight="500" mb={3}>
            © 2023 Dev Roadmap
          </Flex>
          <Flex mb={3}>developed by inhan, donghyuk</Flex>
          <Flex gap={3}>
            <Link display="flex" gap={1} alignItems="center" href="mailto:superman@test.com">
              <HiOutlineMail />
              문의하기
            </Link>
            <Text>superman@test.com</Text>
          </Flex>
        </Flex>
      </Flex>

      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </div>
  );
};

export default Layout;
