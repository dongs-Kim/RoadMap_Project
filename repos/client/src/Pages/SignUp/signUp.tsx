import React, { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

const SignUp = () => {
  //상태
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password_origin, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // 추가 (오류상태메시지)
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    setEmail(e.target.value);

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요!');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요!');
      setIsEmail(true);
    }
  }, []);

  const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 50) {
      setNameMessage('2글자 이상 50글자이하로 입력해주세요!');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다!');
      setIsName(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요!');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password_origin === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요!');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호를 다시 확인해주세요');
        setIsPasswordConfirm(false);
      }
    },
    [password_origin],
  );

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        axios
          .post(
            '/api/users',
            { email, password_origin, nickname },
            {
              withCredentials: true,
            },
          )
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [email, nickname, password_origin],
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
            {email.length > 0 && <span>{emailMessage}</span>}
          </div>
        </label>
        <label>
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
            {nickname.length > 0 && <span>{nameMessage}</span>}
          </div>
        </label>
        <label>
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password_origin} onChange={onChangePassword} />
            {password_origin.length > 0 && <span>{passwordMessage}</span>}
          </div>
        </label>
        <label>
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            {passwordConfirm.length > 0 && <span>{passwordConfirmMessage}</span>}
          </div>
        </label>
        <Button type="submit" disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}>
          회원가입
        </Button>
        <div>{signUpSuccess && <span>회원가입되었습니다! 로그인해주세요.</span>}</div>
      </form>
      <span>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </span>
    </div>
  );
};

export default SignUp;
