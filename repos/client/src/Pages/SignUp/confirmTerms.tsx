import { Box, Button, Checkbox, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ConfirmTerms() {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const navigate = useNavigate();
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const onClickConfirm = useCallback(() => {
    return navigate('/Signup');
  }, [navigate]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.300"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack spacing={7} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="2xl" h="100%">
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              colorScheme="teal"
              onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
            >
              이용약관, 개인정보 수집에 모두 동의합니다.
            </Checkbox>
            <Stack mt={1}>
              <Box border="1px" borderStyle="solid" borderColor="#ccc" width={'400px'} height={'200px'} overflow="auto">
                <Box
                  style={{
                    fontSize: '10px',
                    fontFamily: 'inherit',
                    paddingLeft: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '20px',
                    borderColor: 'rgb(167, 193, 204)',
                  }}
                >
                  <Heading fontSize="larger" paddingBottom="2">
                    이용약관
                  </Heading>
                  가. 개인정보의 수집 및 이용 목적 국가공간정보포털은 다음의 목적을 위하여 개인정보를 처리합니다.
                  처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
                  개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. <br></br>
                  나. 정보주체와 법정대리인의 권리ㆍ의무 및 행사방법 ① 정보주체(만 14세 미만인 경우에는 법정대리인을
                  말함)는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. ② 제1항에 따른
                  권리 행사는 개인정보보호법 시행규칙 별지 제8호 서식에 따라 작성 후 서면, 전자우편 등을 통하여 하실 수
                  있으며, 기관은 이에 대해 지체 없이 조치하겠습니다. ③ 제1항에 따른 권리 행사는 정보주체의
                  법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙
                  별지 제11호 서식에 따른 위임장을 제출하셔야 합니다. ④ 개인정보 열람 및 처리정지 요구는 개인정보 보호법
                  제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다. ⑤ 개인정보의 정정 및 삭제
                  요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                  ⑥ 정보주체 권리에 따른 열람의 요구, 정정ㆍ삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가
                  본인이거나 정당한 대리인인지를 확인합니다. 다. 수집하는 개인정보의 항목 국가공간정보포털
                  회원정보(필수): 이름, 이메일(아이디), 비밀번호 라. 개인정보의 보유 및 이용기간 국가공간정보포털은
                  법령에 따른 개인정보 보유ㆍ이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보
                  보유ㆍ이용기간 내에서 개인정보를 처리ㆍ보유합니다. - 수집근거: 정보주체의 동의 - 보존기간: 회원 탈퇴
                  요청 전까지(1년 경과 시 재동의) - 보존근거: 정보주체의 동의 마. 동의 거부 권리 및 동의 거부에 따른
                  불이익
                  <br />위 개인정보의 수집 및 이용에 대한 동의를 거부할 수 있으나, 동의를 거부할 경우 회원 가입이
                  제한됩니다.
                </Box>
              </Box>
              <Checkbox
                isChecked={checkedItems[0]}
                colorScheme="teal"
                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
              >
                <Text display="inline-block" fontSize="small">
                  이용약관 동의
                </Text>
                <Text display="inline-block" color="red" fontSize="xs">
                  (필수)
                </Text>
              </Checkbox>
              <Box border="1px" borderStyle="solid" borderColor="#ccc" width={'400px'} height={'200px'} overflow="auto">
                <Box
                  style={{
                    fontSize: '10px',
                    fontFamily: 'inherit',
                    paddingLeft: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingRight: '20px',
                    borderColor: 'rgb(167, 193, 204)',
                  }}
                >
                  <Heading fontSize="larger" paddingBottom="2">
                    개인정보 수집
                  </Heading>
                  가. 개인정보의 수집 및 이용 목적 국가공간정보포털은 다음의 목적을 위하여 개인정보를 처리합니다.
                  처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
                  개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. 나. 정보주체와
                  법정대리인의 권리ㆍ의무 및 행사방법 ① 정보주체(만 14세 미만인 경우에는 법정대리인을 말함)는 언제든지
                  개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. ② 제1항에 따른 권리 행사는
                  개인정보보호법 시행규칙 별지 제8호 서식에 따라 작성 후 서면, 전자우편 등을 통하여 하실 수 있으며,
                  기관은 이에 대해 지체 없이 조치하겠습니다. ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을
                  받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른
                  위임장을 제출하셔야 합니다. ④ 개인정보 열람 및 처리정지 요구는 개인정보 보호법 제35조 제5항, 제37조
                  제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다. ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서
                  그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다. ⑥ 정보주체 권리에
                  따른 열람의 요구, 정정ㆍ삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
                  대리인인지를 확인합니다. 다. 수집하는 개인정보의 항목 국가공간정보포털 회원정보(필수): 이름,
                  이메일(아이디), 비밀번호 라. 개인정보의 보유 및 이용기간 국가공간정보포털은 법령에 따른 개인정보
                  보유ㆍ이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유ㆍ이용기간 내에서
                  개인정보를 처리ㆍ보유합니다. - 수집근거: 정보주체의 동의 - 보존기간: 회원 탈퇴 요청 전까지(1년 경과 시
                  재동의) - 보존근거: 정보주체의 동의 마. 동의 거부 권리 및 동의 거부에 따른 불이익
                  <br />위 개인정보의 수집 및 이용에 대한 동의를 거부할 수 있으나, 동의를 거부할 경우 회원 가입이
                  제한됩니다.
                </Box>
              </Box>
              <Checkbox
                isChecked={checkedItems[1]}
                colorScheme="teal"
                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
              >
                <Text display="inline-block" fontSize="small">
                  개인정보 수집 동의
                </Text>
                <Text display="inline-block" color="red" fontSize="xs">
                  (필수)
                </Text>
              </Checkbox>
            </Stack>
            <Button colorScheme="teal" isDisabled={!(checkedItems[0] && checkedItems[1])} onClick={onClickConfirm}>
              확인
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
