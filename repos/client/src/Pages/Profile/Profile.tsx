import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../Hooks/hooks';
import { getUser, InitailStateType } from '../../Store/userSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const userInitData = useSelector((state: InitailStateType) => state.userData);
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
    const apiAction = dispatch(getUser);
    console.log(apiAction);
  }, [dispatch]);

  return (
    <div>
      {userInitData && <div>나오는거 마는겨</div>}
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
