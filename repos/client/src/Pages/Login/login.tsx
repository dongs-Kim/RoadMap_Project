import React, { useState, ChangeEvent, useCallback } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import useSWR from 'swr';

import fetcher from '../../Utils/fetchers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInError, setLogInError] = useState(false);

  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          console.log(response);
          mutate();
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 403);
        });
    },
    [email, password],
  );

  if (userData) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
        {logInError && (
          <div style={{ color: '#e01e5a', margin: '8px 0 16px', fontWeight: 'bold' }}>
            이메일과 비밀번호 조합이 일치하지 않습니다.
          </div>
        )}
        <br />
        <button formAction="">Login</button>
        <p>
          <Link to="/SignUp">회원가입</Link> <br></br>
          <text>비밀번호 찾기</text>
        </p>
      </form>
    </div>
  );
};

export default Login;
