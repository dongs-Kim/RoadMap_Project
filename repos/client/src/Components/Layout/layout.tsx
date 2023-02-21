import { AtSignIcon, ChevronDownIcon } from '@chakra-ui/icons';
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
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { menuCategories } from '../Menu/menu';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { CiMap } from 'react-icons/ci';
import { TbSitemap } from 'react-icons/tb';
import { RiTreasureMapLine } from 'react-icons/ri';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { LoginDialog } from '../Dialog/LoginDialog';
import { useScrollPosition } from '../../Hooks/useScrollPosition';
import { AiFillGithub } from 'react-icons/ai';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData, mutate: revalidateUser, isLogined } = useUser();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

  const onClickLogIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const onClickSignUp = useCallback(() => {
    navigate('/confirmTerms');
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

  useEffect(() => {
    revalidateUser();
  }, [revalidateUser]);

  return (
    <div>
      {/* 헤더 */}
      <Flex as="header" p={5} pl={10} pr={10} top={0} bg="#fff" zIndex={1} justifyContent="center">
        <Flex justifyContent="space-between" w="100%" maxW="1800px">
          <Flex alignItems="center">
            <RouterLink to="/">
              <Flex alignItems="center" gap={2}>
                <RiTreasureMapLine size="28px" />
                <Text color="#333" fontSize="xl" fontFamily="'Mochiy Pop One', sans-serif">
                  Dev Roadmap
                </Text>
              </Flex>
            </RouterLink>
            <Flex ml={8}>
              <Menu>
                <MenuButton size="md" colorScheme="#333" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
                  카테고리
                </MenuButton>
                <MenuList color="#333" fontSize="sm">
                  {menuCategories.map((category) => (
                    <MenuItem pb={4} key={category.type} onClick={() => onClickCategory(category.type)}>
                      {category.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Flex alignItems="center" gap={3}>
            <Button
              leftIcon={<CiMap size="20px" />}
              variant="ghost"
              size="sm"
              borderRadius={20}
              colorScheme="gray"
              color="#555"
              onClick={onClickNewRoadMap}
            >
              새 로드맵 작성
            </Button>
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
              <>
                <Button colorScheme="teal" variant="ghost" borderRadius={20} onClick={onClickLogIn}>
                  로그인
                </Button>
                <Button colorScheme="teal" variant="solid" borderRadius={20} onClick={onClickSignUp}>
                  회원가입
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Divider />

      {/* 메인 */}
      <Flex as="main" pb={20} pt={10} minH="calc(100vh - 200px)" bg="#F8F9FA">
        <Outlet></Outlet>
      </Flex>

      {/* 푸터 */}
      <Divider borderColor="#ccc" />
      <Flex justifyContent="center">
        <Flex w="100%" maxW="1000px" p={5} alignItems="center" justifyContent="space-between">
          <Flex fontWeight="500" mb={1}>
            © 2023 Dev Roadmap
          </Flex>
          <Flex flexDir="column" alignItems="flex-end">
            <Flex mb={1}>developed by 인한, 동혁</Flex>
            <Flex gap={1}>
              <Tooltip label="github.com/dongs-Kim/RoadMap_Project">
                <Link href="https://github.com/dongs-Kim/RoadMap_Project" target="_blank" rel="noreferrer">
                  <IconButton
                    icon={<AiFillGithub size="25px" />}
                    color="gray.500"
                    aria-label="github"
                    variant="ghost"
                  />
                </Link>
              </Tooltip>
              <Tooltip label="developroadmap@gmail.com">
                <Link href="mailto:developroadmap@gmail.com" target="_blank" rel="noreferrer">
                  <IconButton
                    icon={<HiOutlineMail size="25px" />}
                    color="gray.500"
                    aria-label="github"
                    variant="ghost"
                  />
                </Link>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </div>
  );
};

export default Layout;
