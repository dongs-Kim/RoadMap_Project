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
      width="100vw"
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
              <Box border="1px" borderStyle="solid" borderColor="#ccc" maxW="400px" height={'200px'} overflow="auto">
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
                  <Heading fontSize="medium">Dev-Roadmap 서비스 이용약관</Heading>
                  <br />제 1 조 [목적]
                  <br />이 이용약관(이하 &quot;약관&quot;이라 합니다)은 Dev-Roadmap 서비스의 이용에 관한 제반 사항과
                  기타 필요한 사항을 규정함을 목적으로 합니다.
                  <br />
                  <br />제 2 조 [용어의 정의]
                  <br />① 이 약관에서 사용하는 용어의 정의는 다음 각호와 같습니다.
                  <br />
                  가. Dev-Roadmap 서비스라 함은 사용자가 자신의 개발 지식을 자유롭게
                  <br />
                  정보를 공유하고 창조적인 서비스를 생산할 수 있도록 하기 위하여 Dev-Roadmap가 제공·운영하는 각종
                  서비스를 말합니다.
                  <br />
                  나. 데이터 제공기관이라 함은 Dev-Roadmap가 서비스를 위해 보유한 데이터를 제공하는 Dev-Roadmap
                  운영기관을 말합니다.
                  <br />② 이 약관에서 명시되지 않은 사항에 대해서는 공공데이터 개방 및 이용활성화에관한 법률(법률
                  제12844호) 등 관계 법령 및 공공데이터의 제공 및 이용 활성화에 관한 법률 시행령(대통령령 제25751호),
                  공공데이터의 제공 및 이용 활성화에 관한 법률 시행규칙(행정안전부령 제1호)에 따르며, 그 외에는 일반
                  관례에 따릅니다.
                  <br />
                  <br />제 3 조 [적용범위]
                  <br />① 본 약관은 Dev-Roadmap 서비스 회원에 가입한 후, 본 약관에 동의한 자(이하 “회원”이라 합니다)
                  대하여 적용합니다. 회원으로 가입하시면, Dev-Roadmap 서비스를 자유롭게 활용하실 수 있습니다. ② 본
                  약관은 회원 또는 비회원에 대한 Dev-Roadmap 서비스 제공행위 및 회원 또는 비회원의 Dev-Roadmap 서비스
                  이용행위에 대하여 우선적으로 적용됩니다.
                  <br />
                  <br /> 제 4 조 [이용약관의 효력 및 변경]
                  <br />① 본 이용약관은 서비스의 이용을 위하여 회원 또는 비회원이 동의를 함으로써 효력이 발생합니다.
                  <br />② Dev-Roadmap는 합리적인 사유가 발생할 경우 본 약관을 변경할 수 있으며, 이 경우 일정한 기간을
                  정하여 적용일자 및 변경사유를 명시한 사항을 회원 또는 비회원에게 공지 또는 통지합니다.
                  <br />③ 제2항에 따른 약관의 변경은 회원 또는 비회원이 동의함으로써 그 효력이 발생됩니다. 다만, 제2항에
                  따른 통지를 하면서 회원 또는 비회원에게 일정한 기간 내에 의사표시를 하지 않으면 의사표시가 표명된
                  것으로 본다는 뜻을 명확히 전달하였음에도 회원 또는 비회원이 명시적으로 거부의 의사표시를 하지 아니한
                  경우에는 회원 또는 비회원이 개정약관에 동의한 것으로 봅니다.
                  <br />④ 회원 또는 비회원은 Dev-Roadmap 서비스를 이용할 시 주기적으로 공지사항을 확인하여야 할 의무가
                  있습니다.
                  <br />⑤ 약관의 변경 사실 및 내역을 확인하지 못하여 발생한 모든 손해에 대한 책임은 회원 또는 비회원에게
                  귀속됩니다.
                  <br />
                  <br />제 5 조 [Dev-Roadmap 서비스의 이용]
                  <br />① Dev-Roadmap의 모든 서비스는 본 약관에 동의한 회원 또는 비회원에 한하여 제공합니다.
                  <br />
                  <br />제 6 조 [Dev-Roadmap 서비스 이용시의 주의사항]
                  <br />① Dev-Roadmap는 관계법령의 제·개정 및 기타 정책적 사유 등에 따라 Dev-Roadmap 서비스를 변경하거나
                  중단할 수 있습니다.
                  <br />② Dev-Roadmap는 서비스를 운영함에 있어 데이터의 특정범위를 분할하거나 또는 전체에 대하여 별도의
                  이용가능 시간 또는 이용가능 횟수를 지정할 수 있으며 이를 사전에 고지하여야 합니다.
                  <br />③ 회원 또는 비회원은 Dev-Roadmap의 서비스를 이용한 검색결과를 노출함에 있어 선정적, 폭력적,
                  혐오적인 내용을 포함하여 반사회적, 비도덕적, 불법적인 내용과 결합 또는 연계하거나 인접하도록 구성할 수
                  없으며, 검색결과의 공공성을 준수하여야 합니다.
                  <br />④ Dev-Roadmap는 서비스를 이용한 검색결과와 함께 광고를 게재할 권리를 가집니다. 다만 광고를
                  게재하고자 할 경우 사전에 회원 또는 비회원에게 이를 공지 또는 통지합니다.
                  <br />⑤ Dev-Roadmap는 개인정보 보호정책을 공시하고 준수합니다.
                  <br />
                  <br />제 7 조 [회원 또는 비회원의 의무]
                  <br />① 회원 또는 비회원은 Dev-Roadmap 서비스를 이용함에 있어서 본 약관에서 규정하는 사항과 기타
                  Dev-Roadmap이 정한 제반 규정, 공지사항 및 관계 법령을 준수하여야 하며, Dev-Roadmap의 명예를 손상시키는
                  행위를 해서는 안됩니다.
                  <br />② Dev-Roadmap 서비스를 이용함에 있어서 회원 또는 비회원의 행위에 대한 모든 책임은 당사자가
                  부담하며, 회원은 Dev-Roadmap를 대리하는 것으로 오해가 될 수 있는 행위를 해서는 안됩니다.
                  <br />
                  <br /> 제 8 조 [Dev-Roadmap 서비스 저작권]
                  <br />① 회원 또는 비회원은 Dev-Roadmap 서비스 이용 시 Dev-Roadmap 및 제3자의 지적재산권을 침해해서는
                  안됩니다.
                  <br />② Dev-Roadmap 제공하는 API 및 데이터파일, 검색결과 등에 대한 저작권은 Dev-Roadmap 혹은 제3자에
                  있고, Dev-Roadmap의 이용허락으로 인해 회원 또는 비회원이 당해 API 및 데이터파일, 검색결과 등에 대한
                  저작권을 취득하는 것은 아닙니다. 다만, 회원이 제작한 프로그램에 대한 저작권은 회원 또는 비회원에게
                  귀속됩니다.
                  <br />③ 회원 또는 비회원은 Dev-Roadmap 서비스를 이용하여 검색결과를 노출할 경우, 해당 페이지에
                  &quot;Dev-Roadmap&quot;를 사용한 결과임을 명시해야 합니다. 다만, Dev-Roadmap가 별도의 표시방식을 정한
                  경우에는 그에 따라야 합니다.
                  <br />
                  <br /> 제 9 조 [API 및 데이터파일 이용허락 조건]
                  <br />
                  Dev-Roadmap 서비스에 대하여 저작자 및 출처 표시 조건으로 자유이용을 허락함을 원칙으로 합니다. 단,
                  Dev-Roadmap 이외에 제3자에게 저작권이 귀속된 개별 API 및 데이터파일에 대하여는 해당 저작권자의
                  이용허락 조건에 따릅니다.
                  <br />
                  <br /> 제 10 조 [책임의 제한]
                  <br />① Dev-Roadmap 제공하는 서비스 및 데이터에 대한 책임은 데이터를 보유한 제공기관에게 귀속됩니다.
                  Dev-Roadmap 서비스에 관하여 약관, 서비스별 안내, 기타 Dev-Roadmap가 정한 이용기준 및 관계법령을
                  준수하지 않은 이용으로 인한 결과에 대하여 책임을 지지 않습니다.
                  <br />② Dev-Roadmap 서비스의 사용불능으로 인하여 회원 또는 비회원에게 발생한 손해에 대하여 책임을 지지
                  않습니다.
                  <br />③ Dev-Roadmap 회원 또는 비회원이 Dev-Roadmap 서비스를 이용하여 기대하는 수익을 얻지 못하거나
                  상실한 것에 대하여 책임을 지지 않습니다.
                  <br />④ Dev-Roadmap는 회원·비회원·제3자 상호 간에 Dev-Roadmap 서비스를 매개로 발생한 분쟁에 대해
                  개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.
                  <br />
                  <br />제 11 조 [이용자격 박탈 및 손해배상]
                  <br />① Dev-Roadmap 회원 또는 비회원이 본 이용약관을 준수하지 않는 경우 서비스 사용 중지 및 이용자격을
                  박탈할 수 있습니다.
                  <br />② Dev-Roadmap 서비스 이용상 회원 또는 비회원의 귀책사유로 인하여 Dev-Roadmap에 손해가 발생한
                  경우 Dev-Roadmap은 본 약관에 따른 계약의 해지와는 별도로 손해배상을 청구할 수 있습니다.
                  <br />③ Dev-Roadmap 서비스의 이용으로 Dev-Roadmap 회원 또는 비회원간에 발생한 분쟁에 관하여 소송이
                  제기되는 경우 각 당사자는 자신의 주소지를 관할하는 법원에 소송을 제기할 수 있습니다.
                  <br />
                  <br />
                  [부칙] 제 1 조 (시행일) 본 약관은 2023년 1월 1일부터 적용됩니다.
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
              <Box border="1px" borderStyle="solid" borderColor="#ccc" maxW="400px" height={'200px'} overflow="auto">
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
                  <Heading fontSize="medium" paddingBottom="2">
                    [개인정보 수집 및 이용에 따른 고지]
                  </Heading>
                  1. 개인정보 수집 및 이용 목적 : 회원가입 및 관리, 고충처리
                  <br />
                  <br /> 2. 수집하는 개인정보의 항목
                  <br /> □ 필수정보 : 이메일 주소, 비밀번호
                  <br /> □ 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.
                  <br /> - IP주소, 서비스 이용기록, 방문기록
                  <br />
                  <br />
                  3. 개인정보의 보유 및 이용 기간
                  <br /> □ 회원탈퇴 시까지 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                  <br /> - 관계 법령 위반에 따른 수사․조사 등이 진행 중인 경우에는 해당 수사․조사 종료 시까지
                  <br />
                  <br /> 4. 귀하는 위와 같은 개인정보 수집 및 이용에 동의하지 않을 권리가 있습니다.
                  <br /> 다만, 동의를 하지 않을 경우 Dev-Roadmap.io 사이트에서 제공하는 서비스 일부를 이용하실 수
                  없습니다.
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
