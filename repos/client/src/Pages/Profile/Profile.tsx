import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { getUser } from '../../store/userSlice';
import { Box, Button, Flex, Image, Input, Square, Text, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImageType } from 'react-images-uploading';
import { ExportInterface } from 'react-images-uploading/dist/typings';
import ReactImageUploading from 'react-images-uploading';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useTitle } from '../../Hooks/useTitle';
import { Loading } from '../../Components/Page/Loading';
import { useUser } from '../../Hooks/dataFetch/useUser';

const Profile = () => {
  useTitle('프로필 - Dev Roadmap');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useUser();
  const profileData = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.user.loading);

  // state
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<string | null>();

  // 유효성체크
  const [nickNameMessage, setNickNameMessage] = useState<string>('');
  const [isName, setIsName] = useState<boolean>(false);

  const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 50) {
      setNickNameMessage('2글자 이상 50글자이하로 입력해주세요!');
      setIsName(false);
    } else {
      setIsName(true);
    }
  }, []);

  const onChangeComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const handleUploadFile = (files: ImageType) => {
    if (files) {
      const file = files[0].file;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        axios.post('/api/users/profile-image', formData).then((response) => {
          setImage(response.data);
        });
      }
    }
  };

  const handleDeleteFile = () => {
    setImage(null);
  };

  const onClickSave = useCallback(() => {
    const saveDto = {
      email,
      nickname,
      comment,
      image,
    };
    axios.patch('api/users', saveDto, { withCredentials: true }).then(() => {
      mutate();
      navigate('/');
    });
  }, [email, nickname, comment, image, navigate, mutate]);

  const patchUser = useCallback(async () => {
    await dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    patchUser();
  }, [patchUser]);

  useEffect(() => {
    if (profileData) {
      setEmail(profileData.email);
      setNickName(profileData.nickname);
      setImage(profileData.image);
      setComment(profileData.comment);
    }
  }, [profileData]);

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Loading isOpen={loading}></Loading>
      <Flex flexDir="row" gap="10" alignItems="center" height="350px">
        <ReactImageUploading value={[]} onChange={handleUploadFile} dataURLKey="image">
          {({ onImageUpload }: ExportInterface) => (
            <Flex>
              {!image && (
                <Square
                  bg="gray.200"
                  color="gray.500"
                  size="200px"
                  border="1px #ccc solid"
                  flexDir="column"
                  cursor="pointer"
                  gap={3}
                  onClick={onImageUpload}
                >
                  <AddIcon />
                  <Text fontSize="sm">이미지 업로드</Text>
                </Square>
              )}
              {image && (
                <Square bg="gray.200" size="200px" position="relative" color="white" border="1px #ccc solid">
                  <Image src={image} alt="Thumbnail" maxH="100%" />
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bg="black"
                    p={1}
                    cursor="pointer"
                    onClick={handleDeleteFile}
                  >
                    <MinusIcon boxSize={3} display="block" />
                  </Box>
                </Square>
              )}
            </Flex>
          )}
        </ReactImageUploading>
        <Flex flexDir="column" fontWeight="bold">
          <Text mb="1">이메일</Text>
          <Input mb="5" type="text" id="email" name="email" bg="#fff" value={email} disabled></Input>
          <Text mb="1">닉네임</Text>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            bg="#fff"
            value={nickname}
            onChange={onChangeNickname}
          ></Input>
          {!isName && <Text color="red.400">{nickNameMessage}</Text>}
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={5} fontWeight="bold">
        <Text>
          자기소개
          <Textarea
            id="introduction"
            name="introduction"
            value={comment || ''}
            onChange={onChangeComment}
            resize="none"
            height="120"
            bg="#fff"
          ></Textarea>
        </Text>
        <Button disabled={true} onClick={onClickSave} colorScheme="teal">
          저장
        </Button>
      </Flex>
    </div>
  );
};

export default Profile;
