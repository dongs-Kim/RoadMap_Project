import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  useDisclosure,
  Avatar,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import { menuCategories } from '../Menu/menu';
import { HiOutlineMail } from 'react-icons/hi';
import { CiMap } from 'react-icons/ci';
import { RiTreasureMapLine } from 'react-icons/ri';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { LoginDialog } from '../Dialog/LoginDialog';
import { AiFillGithub } from 'react-icons/ai';
import { MenuDrawer } from '../Drawer/MenuDrawer';

const Layout = () => {
  const navigate = useNavigate();
  const { userData, mutate: revalidateUser, isLogined } = useUser();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const onClickLogIn = useCallback(() => {
    onCloseDrawer();
    navigate('/login');
  }, [navigate, onCloseDrawer]);

  const onClickSignUp = useCallback(() => {
    onCloseDrawer();
    navigate('/confirmTerms');
  }, [navigate, onCloseDrawer]);

  const onClickLogOut = useCallback(() => {
    onCloseDrawer();
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        revalidateUser(false);
        navigate('/');
      });
  }, [navigate, revalidateUser, onCloseDrawer]);

  const onClickNewRoadMap = useCallback(() => {
    if (isLogined) {
      navigate('/Roadmap/write');
    } else {
      onOpenLogin();
    }
  }, [navigate, isLogined, onOpenLogin]);

  const onClickFavoriteList = useCallback(() => {
    onCloseDrawer();
    navigate(`/Favorite/List/${userData.id}`);
  }, [navigate, userData, onCloseDrawer]);

  const onClickMypage = useCallback(() => {
    onCloseDrawer();
    navigate('/Mypage');
  }, [navigate, onCloseDrawer]);

  const onClickMyLearnResource = useCallback(() => {
    onCloseDrawer();
    navigate('/MyLearnResource');
  }, [navigate, onCloseDrawer]);

  const onClickProfile = useCallback(() => {
    onCloseDrawer();
    navigate('/Profile');
  }, [navigate, onCloseDrawer]);

  const onClickCategory = useCallback(
    (category: string) => {
      onCloseDrawer();
      navigate(`Roadmap/list/${category}`);
    },
    [navigate, onCloseDrawer],
  );

  const onClickDrawerIcon = useCallback(() => {
    onOpenDrawer();
  }, [onOpenDrawer]);

  useEffect(() => {
    revalidateUser();
  });

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
            <Flex ml={8} display={{ base: 'none', md: 'flex' }}>
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

          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              icon={<HamburgerIcon fontSize="xl" />}
              aria-label="drawer"
              variant="ghost"
              onClick={onClickDrawerIcon}
            />
          </Flex>

          <Flex alignItems="center" gap={3} display={{ base: 'none', md: 'flex' }}>
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
                    {userData.image && <Avatar size="sm" name={userData?.nickname} src={userData?.image} />}
                    {!userData.image && <Avatar size="sm" name={userData?.nickname} />}
                  </MenuButton>
                  <MenuList color="#333" fontFamily="monospace">
                    <MenuItem pb={3} onClick={onClickMypage}>
                      내 로드맵
                    </MenuItem>
                    <MenuItem pb={3} onClick={onClickMyLearnResource}>
                      내 학습리소스
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
      <Flex as="main" minH="calc(100vh - 200px)" bg="#F8F9FA">
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
      <MenuDrawer
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
        userData={userData}
        onClickCategory={onClickCategory}
        onClickFavoriteList={onClickFavoriteList}
        onClickLogIn={onClickLogIn}
        onClickLogOut={onClickLogOut}
        onClickMypage={onClickMypage}
        onClickProfile={onClickProfile}
        onClickSignUp={onClickSignUp}
        onClickNewRoadMap={onClickNewRoadMap}
      />
    </div>
  );
};

export default Layout;
