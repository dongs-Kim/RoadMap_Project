import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { getUser } from '../../store/userSlice';
import { Box, Button, Image, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUploading, { ImageType } from 'react-images-uploading';
import { ExportInterface } from 'react-images-uploading/dist/typings';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          console.log(response.data);
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
    axios
      .patch('api/users', saveDto, { withCredentials: true })
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email, nickname, comment, image]);

  const patchUser = async () => {
    await dispatch(getUser());
  };

  useEffect(() => {
    patchUser();
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setEmail(profileData.email);
      setNickName(profileData.nickname);
      setImage(profileData.image);
      setComment(profileData.comment);
    }
    console.log(profileData);
  }, [profileData]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Box width= "180px">
      <ImageUploading value={[]} onChange={handleUploadFile} dataURLKey="image"  >
        {({ onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }: ExportInterface) => (
          <div>            
            {image && (
              <div>
                <Image src={image} alt=""  borderRadius= "70%"  />
                <Button colorScheme="teal" size="sm" onClick={handleDeleteFile}>
                  삭제
                </Button>
              </div>
            )}
            <Button onClick={onImageUpload} {...dragProps}>
              이미지 업로드
            </Button>
          </div>
        )}
      </ImageUploading>
      </Box>
      <span>
        Email
        <div>
          <Input type="text" id="email" name="email" value={email} disabled></Input>
        </div>
      </span>
      <span>
        닉네임
        <div>
          <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></Input>
          {!isName && <span>{nickNameMessage}</span>}
        </div>
      </span>
      <span>
        자기소개
        <div>
          <Textarea id="introduction" name="introduction" value={comment || ''} onChange={onChangeComment}></Textarea>
        </div>
      </span>
      <Button disabled={true} onClick={onClickSave}>
        저장
      </Button>
    </div>
  );
};

export default Profile;
