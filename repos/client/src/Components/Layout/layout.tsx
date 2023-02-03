import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: userData, mutate: revalidateUser } = useSWR('/api/users', fetcher);

  const onClickLogOut = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      }) 
      .then((res) => {
        revalidateUser(false);
      });
  }, []);

  const onClickNewRoadMap = () => {
    navigate("/Roadmap/write")
  }
  const onClickMypage = () => {
    navigate("/Mypage")
  }
  const onClickProfile = () => {
    navigate("/Profile")
  }

  return (
    <div>
      <header style={{ backgroundColor: 'white' }}>  
        로드맵 페이지      
        <Button size= 'sm' colorScheme='teal' variant='ghost' onClick={onClickNewRoadMap}>새 로드맵 작성</Button>   
        <Menu>        
        <MenuButton size= 'sm' colorScheme='teal' variant='ghost' as={Button} rightIcon={<ChevronDownIcon />}>
        작업메뉴
        </MenuButton>
          <MenuList>
            <MenuItem onClick={onClickMypage}>내 로드맵</MenuItem>
            <MenuItem onClick={onClickProfile}>프로필 수정</MenuItem>            
            <MenuItem onClick={onClickLogOut} >로그아웃</MenuItem>
          </MenuList>
        </Menu>
      </header>
      <main>
        <Outlet></Outlet>
      </main>      
    </div>
  );
};

export default Layout;
