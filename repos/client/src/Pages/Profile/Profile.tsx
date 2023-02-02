import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { getUser, InitailStateType } from '../../store/userSlice'
import { IUser } from '../../Interface/db';
import { Button, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileData = useAppSelector((state) => state.user);    
  const loading = useAppSelector((state) => state.user.loading);    
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [comment, setComment] = useState("");

  const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  }, []);
  const onChangeComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

  const onClickSave = useCallback(() => {
    const saveDto = {
      email,
      nickname,
      comment
    };
    axios.patch('api/users', saveDto, 
              {withCredentials :true}
            )
          .then((response) => {
            console.log(response);
            navigate('/');
          })
          .catch((error) => {
            console.error(error)
          })
  }, [email, nickname, comment])

  const patchUser = async () => {
    await dispatch(getUser());
  };

  useEffect(()=> {
    patchUser();
  },[dispatch])
  
  useEffect(() => {
    if (profileData){
      setEmail(profileData.email);
      setNickName(profileData.nickname);
      setImage(profileData.image);  
      setComment(profileData.comment)
    }
    console.log(profileData);
  }, [profileData]);

  if(loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <ProfileImage></ProfileImage>
      <span>Email
        <div>
          <Input type="text" id="email" name="email" value={email} disabled></Input>
        </div>
      </span>
      <span>닉네임
        <div>
          <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></Input>
        </div>
      </span>
      <span>자기소개
        <div>
          <input
            type = "text"
            id="introduction"
            name="introduction"
            value={comment || ''}
            onChange={onChangeComment}
          ></input>
        </div>
      </span>
      <Button onClick={onClickSave}>저장</Button>
    </div>
  );
};

export default Profile;
