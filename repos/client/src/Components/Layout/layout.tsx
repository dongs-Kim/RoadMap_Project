import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { Link as RouterLink, useNavigate, Outlet, useLocation, Router } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: userData, mutate: revalidateUser } = useSWR('/api/users', fetcher);

  const Menus = [
    { category: 'all', name: '전체' },
    { category: 'back-end', name: '백엔드' },
    { category: 'front-end', name: '프론트엔드' },
  ];

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
      <header style={{ backgroundColor: 'white' }}>
        로드맵 페이지
        {userData && (
          <span>
            <Button size="sm" colorScheme="teal" variant="ghost" onClick={onClickNewRoadMap}>
              새 로드맵 작성
            </Button>
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
      </header>
      <div style={{ display: 'flex', height: 'auto' }}>
        <div
          style={{
            height: 'auto',
            width: '130px',
            flexDirection: 'column',
            background: 'white',
            borderTop: '1px solid rgb(82,38,83)',
            borderRight: '1px solid rgb(82, 38, 83)',
            verticalAlign: 'top',
            padding: '15px 0 0',
          }}
        >
          {Menus.map((menu) => (
            <li style={{ listStyle: 'none' }} key={menu.category}>
              <Link as={RouterLink} style={{ color: 'teal' }} to={'/Roadmap/list'}>
                {menu.name}
              </Link>
            </li>
          ))}
        </div>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Layout;
