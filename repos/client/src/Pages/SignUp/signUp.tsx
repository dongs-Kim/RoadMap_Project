import React, { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password_origin, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMissmatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };
  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.currentTarget.value);
      setMissmatchError(e.target.value !== password_origin);
    },
    [password_origin],
  );

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(email, nickname, password_origin, passwordCheck);
      if (!mismatchError) {
        console.log('서버로 회원가입');
        setSignUpError('');
        axios
          .post('/api/users', {
            email,
            password_origin,
            nickname,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          });
      }
    },
    [email, nickname, password_origin, passwordCheck],
  );

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>이메일 주소</span>
        <div>
          <input type="email" id="email" name="email" value={email} onChange={onChangeEmail}></input>
        </div>
      </label>
      <label>
        <span>닉네임</span>
        <div>
          <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></input>
        </div>
      </label>
      <label>
        <span>비밀번호</span>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={password_origin}
            onChange={onChangePassword}
          ></input>
        </div>
      </label>
      <label>
        <span>비밀번호 확인</span>
        <div>
          <input
            type="password"
            id="password-check"
            name="password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          ></input>
        </div>
        {mismatchError && <div>비밀번호가 일치하지 않습니다.</div>}
        {!nickname && <div>닉네임을 입력해주세요.</div>}
        {signUpError && <div>이미 가입된 이메일입니다.</div>}
        {signUpSuccess && <div>회원가입되었습니다! 로그인해주세요.</div>}
      </label>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;
