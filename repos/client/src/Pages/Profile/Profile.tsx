import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../Hooks/hooks';
import { getUser, InitailStateType } from '../../store/userSlice'
import { IUser } from '../../Interface/db';

const Profile = () => {
  const dispatch = useAppDispatch();
  const userInitData = useSelector((state: any) => state);
  const [nickname, setNickName] = useState('');
  const email = '';
  const [introduction, setIntroduction] = useState('');
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(getUser());    
    console.log(userInitData.user);
    if (userInitData.nickname){
      setNickName(userInitData.nickname)
    }
  }, [dispatch]);

  return (
    <div>
      <ProfileImage></ProfileImage>
      <span>Email</span>
      <div>
        <input type="text" id="email" name="email" value={email} disabled></input>
      </div>
      <span>닉네임</span>
      <div>
        <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></input>
      </div>
      <span>자기소개</span>
      <div>
        <input
          type="text"
          id="introduction"
          name="introduction"
          value={introduction}
          onChange={onChangeIntroduction}
        ></input>
      </div>
    </div>
  );
};

export default Profile;
