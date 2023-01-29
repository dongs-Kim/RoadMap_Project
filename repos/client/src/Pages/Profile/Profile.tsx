import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import useSWR from 'swr';
import fetcher from '../../Utils/fetchers';

const Profile = () => {
  const [nickname, setNickName] = useState('');
  const email = '';
  const [introduction, setIntroduction] = useState('');
  // const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.currentTarget.value);
  };

  // if (userData) {
  //   setNickName(userData.nickname);
  //   setEmail(userData.email);
  // }

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
      <input type="text" id="introduction" name="introduction" value={introduction} onChange={onChangeIntroduction}></input>
      </div>
    </div>
  );
};

export default Profile;
