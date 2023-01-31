import axios from 'axios';
import { useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

const Layout = () => {
  const { pathname } = useLocation();
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

  return (
    <div>
      <header style={{ backgroundColor: 'grey' }}>
        Header Test
        <button style={{ float: 'right' }} onClick={onClickLogOut}>
          {' '}
          로그아웃
        </button>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
