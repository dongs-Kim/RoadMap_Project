import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { AspectRatio, Box, BoxProps, Container, forwardRef, Button, Input, Stack, Text } from '@chakra-ui/react';

const ProfileImage = () => {
  const [previewImage, setPrevieImage] = useState<string | ArrayBuffer | null>();
  const imageRef = useRef<HTMLInputElement>(null); //asset에 있는 값 가져오기

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    if (e.target.files) {
      const previewFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(previewFile);
      reader.onload = () => {
        setPrevieImage(reader.result);
      };

      const file = new FormData();
      file.append('image', previewFile);

      axios
        .post('/api/users/profile-image', file)
        .then((res) => {
          // setImageUrl(res.data);
          console.log(res.data);          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const handleDeletePreviewFile = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.value = '';
      setPrevieImage(null); //asset에 있는 값 가져오기

      axios
        .delete('/api/users/profile-image')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <input ref={imageRef} type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleUploadFile} />
      {previewImage && <img src={previewImage.toString()} />}
      <div>
        {previewImage && (
          <button type="button" onClick={handleDeletePreviewFile}>
            이미지삭제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
