import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Link,
  FormHelperText,
} from '@chakra-ui/react';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { toastError } from '../../Utils/toast';
import { useTitle } from '../../Hooks/useTitle';
import { RiTreasureMapLine } from 'react-icons/ri';

const Login = () => {
  useTitle('로그인 - Dev Roadmap');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInError, setLogInError] = useState(false);
  const { userData, error, mutate } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      if (location.state?.forward) {
        navigate(location.state.forward, { replace: true });
      } else {
        navigate('/');
      }
    }
  }, [userData, navigate, location]);

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
          navigate(-1);
          mutate();
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode !== 200);
          toastError('이메일 또는 비밀번호를 잘못 입력했습니다');
        });
    },
    [email, password, mutate, navigate],
  );

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.300"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb={10} justifyContent="center" alignItems="center">
        <RouterLink to="/">
          <Flex mb={8} gap={3} alignItems="center" color="#333">
            <RiTreasureMapLine size="35px" />
            <Heading fontSize="3xl" fontFamily="'Mochiy Pop One', sans-serif">
              Dev Roadmap
            </Heading>
          </Flex>
        </RouterLink>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input type={'password'} value={password} onChange={onChangePassword} placeholder="비밀번호" />
                </InputGroup>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
                로그인
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box textAlign="center">
        <Text display="inline-block" marginRight="2">
          계정이 없으신가요?
        </Text>
        <Text display="inline-block" color="teal.500">
          <RouterLink to="/ConfirmTerms">회원가입하기</RouterLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
