'use client'

import { useEffect, useState } from "react";

const Terms = () => {
//   const [filePaths, setFilePaths] = useState([]);



  // Todo: 예외처리
//   const getTerms = async() => {
//     const response = await fetch("/api/filePaths",
//         {
//             method: "GET",
//             cache: "force-cache"
//         }
//       );

//       const result = await response.json();
//       setFilePaths(result.data);
//   }

//   useEffect(() => {
//     getTerms();
//   },[])



  const termNames = [
    "(필수) 개인 회원 약관", "(필수) 특정 금융거래 보고 및 이용에 관한 안내" ,"(필수) 개인 (신용)정보 수집·이용·제공 동의", 
    "(필수) 서비스 제공 동의", "(선택) 개인 (신용)정보 제3자 제공 동의", "(선택) 광고성 정보 수신 동의"
  ];

  return (
    <div>
        <div>
            <p>카드 신청을 위해</p>
            <p><span>약관에 동의</span>해주세요</p>
        </div>
        <div className="flex flex-col">
            {
                termNames.map((term, index) => {
                    return <a href={"api/filePaths"} key={index}>{term}</a>
                })
            }
        </div>


    </div>
  )
}

export default Terms