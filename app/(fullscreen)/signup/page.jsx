'use client'

import SignupFirst from "../../../components/signup/signupFirst"
import SignupSecond from "../../../components/signup/signupSecond"
import AuthorizationMessageNumber from "../../../components/signup/authorizationMessageNumber"
import SignupComplete from "../../../components/signup/signupComplete"
import { useEffect, useState } from "react"

const SignupPage = () => {
  const [isPage, setPage] = useState([true, false, false, false]);
  const [isBlocked, setBlock] = useState(false) // 두번쨰 폼 블럭 활성화 여부

  const [firstForm, setFirstForm] = useState([{ placeholder: "이메일", value: "", type: "text" },
  { placeholder: "이름", value: "", type: "text" },
  { placeholder: "아이디", value: "", type: "text" },
  { placeholder: "비밀번호", value: "", type: "password" },
  { placeholder: "비밀번호 확인", value: "", type: "password" }])

  const [secondForm, setSecondForm] = useState([
    { placeholder: "우편 번호", value: "", type: "text" },
    { placeholder: "주소", value: "", type: "text" },
    { placeholder: "상세 주소", value: "", type: "text" },
    { placeholder: "핸드폰 번호", value: "", type: "text" },
    { placeholder: "2차 인증 번호", value: "", type: "password" },
    { placeholder: "2차 인증 번호 확인", value: "", type: "password" }])

  const [regionNumber, setRegionNumber] = useState([
    { placeholder: "주민등록번호 앞자리", value: "", type: "password" },
    { placeholder: "주민등록번호 뒷자리", value: "", type: "password" }
  ])

  return (
    <>
      {isPage[0] === true && <SignupFirst setPage={setPage} firstForm={firstForm} setFirstForm={setFirstForm} />}
      {isPage[1] === true && <SignupSecond setPage={setPage} secondForm={secondForm} setSecondForm={setSecondForm} firstForm={firstForm} regionNumber={regionNumber} setRegionNumber={setRegionNumber} isBlocked={isBlocked} />}
      {isPage[2] === true && <AuthorizationMessageNumber setPage={setPage} secondForm={secondForm} setBlock={setBlock}/>}
      {isPage[3] === true && <SignupComplete setPage={setPage} />}
    </>
  );
}

export default SignupPage;