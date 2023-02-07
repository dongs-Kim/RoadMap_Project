import React, { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink , Navigate} from 'react-router-dom';
import { Button, Input , Flex, Stack, Heading, Box, FormControl, InputLeftElement, InputGroup, Text, Link} from '@chakra-ui/react';
import useSWR from 'swr'
import fetcher from '../../Utils/fetchers';

const SignUp = () => {
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  //상태
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password_origin, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);  
  // const [duplicateConfirm, setDuplicateConfirm] = useState(false);

  // 추가 (오류상태메시지)
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');
  const [duplicateMessage, setDuplicateMessage] = useState<string>('');

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isNotDuplicate, setIsNotDuplicate] = useState<boolean>(false);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    setEmail(e.target.value);
    setDuplicateMessage('');   
    setIsNotDuplicate(false);
    // setDuplicateConfirm(false);

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage('이메일을 형식을 확인해주세요');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  }, []);

  const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 50) {
      setNameMessage('2글자 이상 50글자이하로 입력해주세요!');
      setIsName(false);
    } else {
      setNameMessage('');
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
    } 
    else if (passwordConfirm.length > 0 && passwordCurrent != passwordConfirm) {
      setPasswordConfirmMessage('비밀번호를 다시 확인해주세요');
      setIsPasswordConfirm(false);
    }
    else {
      setPasswordMessage('');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password_origin === passwordConfirmCurrent) {
        setPasswordConfirmMessage('');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호를 다시 확인해주세요');
        setIsPasswordConfirm(false);
      }
    },
    [password_origin],
  );

  const onClickIdCheck = useCallback(() => {
      try {
        axios.post('/api/users/email',
          {email},
          {withCredentials: true}
        )
        .then((res) => {
          console.log(res.data);
          if(res.data){
            setIsNotDuplicate(false);
            setDuplicateMessage('현재 사용중인 아이디입니다.');
            // setDuplicateConfirm(false);
          }
          else{
            setIsNotDuplicate(true);
            setDuplicateMessage('사용가능한 아이디입니다.');
            // setDuplicateConfirm(true);       
          }          
        })
      }
      catch(error) {
        console.error(error)
      }
  }, [email])

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
            setSignUpSuccess(true);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [email, nickname, password_origin],
  );

  if (userData) {
    return <Navigate to="/"></Navigate>;
  }  
  return (
    <div>
    <Flex 
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.300"
      justifyContent="center"
      alignItems="center"
    >
       <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Heading color="teal.400">Sign Up</Heading>
        <Box minW={{ base: '90%', md: '468px' }} >
          <form onSubmit={onSubmit}>
            <Stack spacing={7} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="2xl" h = "100%">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"/>
                  <Input type="email" id = "email" value={email} onChange={onChangeEmail} placeholder="Email Address" />
                  <Button id = "duplicated" colorScheme="teal" onClick={onClickIdCheck} isDisabled = {!(isEmail)}>중복확인</Button>
                </InputGroup>
                {email.length > 0 && <Text fontSize="sm" fontStyle= "xs" color= "rgb(230,30,30)" fontFamily="arial" fontWeight= "bold">{emailMessage}</Text>}
                <div>{email.length > 0 && !isNotDuplicate && <Text fontSize="sm" fontStyle= "xs" color= "rgb(230,30,30)" fontFamily="arial" fontWeight= "bold">{duplicateMessage}</Text>}</div>   
                <div>{email.length > 0 && isNotDuplicate && <Text fontSize="sm" fontStyle= "xs" color= "rgb(50,180,40)" fontFamily="arial" fontWeight= "bold">{duplicateMessage}</Text>}</div>                 
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="nickname" id= "nickname" value={nickname} onChange={onChangeNickname} placeholder="Nickname" />                  
                </InputGroup>
                <InputGroup >
                  {nickname.length > 0 && <Text fontSize="sm" fontStyle= "xs" color= "rgb(230,30,30)" fontFamily="arial" fontWeight= "bold">{nameMessage}</Text>}
                  </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="password" id= "password" value={password_origin} onChange={onChangePassword} placeholder="Password" />                  
                </InputGroup>
                <InputGroup>
                  {nickname.length > 0 && <Text fontSize="sm" fontStyle= "xs" color= "rgb(230,30,30)" fontFamily="arial" fontWeight= "bold">{passwordMessage}</Text>}
                  </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="password" id="password-check" value={passwordConfirm} onChange={onChangePasswordConfirm} placeholder="Check Password" />                  
                </InputGroup>
                <InputGroup>
                  {passwordConfirm.length > 0 && <Text fontSize="sm" fontStyle= "xs" color= "rgb(230,30,30)" fontFamily="arial" fontWeight= "bold">{passwordConfirmMessage}</Text>}
                  </InputGroup>
              </FormControl>
              {!signUpSuccess && <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" isDisabled={!(isName && isEmail && isPassword && isPasswordConfirm && isNotDuplicate)}>
                  Sigin Up
              </Button>}
              {signUpSuccess && <Text fontSize="md" fontStyle= "md" fontFamily="arial" fontWeight= "bold">회원가입되었습니다! <RouterLink to = '/login'>로그인</RouterLink> 해주세요.</Text>}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?
        <RouterLink to="/login">
          <Link color="teal.500"> Sign In</Link>
        </RouterLink>
      </Box>
    </Flex>
    </div>
  );
};

export default SignUp;
