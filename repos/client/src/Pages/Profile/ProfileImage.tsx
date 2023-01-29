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
      file.append('files', previewFile);

      // axios
      //   .post('/api/users/profile-image', file)
      //   .then((res) => {
      //     // setImageUrl(res.data);
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }
  };
  const handleDeletePreviewFile = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.value = '';
      setPrevieImage(null); //asset에 있는 값 가져오기

      // axios
      //   .delete('/api/users/profile-image')
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
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

/*chakra-ui 샘플 
  밑에 다지우기
*/
// <Container my="12">
//   <AspectRatio width="64" ratio={1}>
//     <Box
//       borderColor="gray.300"
//       borderStyle="dashed"
//       borderWidth="2px"
//       rounded="md"
//       shadow="sm"
//       role="group"
//       transition="all 150ms ease-in-out"
//       _hover={{
//         shadow: 'md',
//       }}
//     >
//       <Box position="relative" height="100%" width="100%">
//         <Box position="absolute" top="0" left="0" height="100%" width="100%" display="flex" flexDirection="column">
//           <Stack height="100%" width="100%" display="flex" alignItems="center" justify="center" spacing="4">
//             <Box height="16" width="12" position="relative"></Box>
//             <Text fontWeight="light">click to upload</Text>
//           </Stack>
//         </Box>
//         <Input
//           type="file"
//           height="100%"
//           width="100%"
//           position="absolute"
//           top="0"
//           left="0"
//           opacity="0"
//           aria-hidden="true"
//           accept="image/*"
//           onChange={handleUploadFile}
//         />
//         {previewImage && <img src={previewImage.toString()} className="pre-img" />}
//       </Box>
//     </Box>
//   </AspectRatio>
// </Container>

// const Profile = () => {
//   const [image, setImage] = useState({
//     image_file: '',
//     preview_URL: 'img/default_image.png',
//   });

//   const sendImageToServer = async () => {
//     if (image.image_file) {
//       const formData = new FormData();
//       formData.append('file', image.image_file);
//       await axios.post('/api/image/upload', formData);
//       alert('서버에 등록이 완료되었습니다!');
//       setImage({
//         image_file: '',
//         preview_URL: 'img/default_image.png',
//       });
//     } else {
//       alert('사진을 등록하세요!');
//     }
//   };

//   return (
//     <div>
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={sendImageToServer}
//         // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
//         // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
//         // onClick={(e) => (e.target.value = null)}
//         // ref={(refParam) => (inputRef = refParam)}
//         // style={{ display: 'none' }}
//       />

//       <div>
//         <img src={image.preview_URL} />
//       </div>

//       {/* <div className="upload-button">
//         <Button variant="contained" onClick={() => inputRef.click()}>
//           Preview
//         </Button>
//         <Button color="error" variant="contained" onClick={deleteImage}>
//           Delete
//         </Button>
//         <Button color="success" variant="contained" onClick={sendImageToServer}>
//           Upload
//         </Button>
//       </div> */}
//     </div>
//   );
// };

// const Profile = () => {
//   const [communityImage, setCommunityImage] = useState<string | ArrayBuffer | null>();
//   const imageRef = useRef<HTMLInputElement>(null);

//   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(file);

//       reader.onload = () => {
//         setCommunityImage(reader.result);
//       };
//     }
//   };

//   const handleDeletePreviewFile = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (imageRef.current) {
//       imageRef.current.value = '';
//       setCommunityImage(null);
//     }
//   };

//   return (
//     <div>
//       <Input ref={imageRef} type="file" accept="image/*" onChange={handleChangeFile} />
//       <Button type="button" onClick={handleDeletePreviewFile}>
//         삭제하기
//       </Button>
//       {communityImage && <img src={communityImage.toString()} className="pre-img" />}
//     </div>
//   );
// };

export default ProfileImage;
