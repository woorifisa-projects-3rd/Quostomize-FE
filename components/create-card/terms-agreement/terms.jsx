'use client'

import 'material-icons/iconfont/material-icons.css';
import { useEffect, useState, useRef } from "react";

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

  const essentialsAgrees = useRef(0);
  const optinalsAgrees = useRef(0); 

  const [isAccepted, setAccepted] = useState([false,false,false,false,false,false]);
  const updateAccepted = (index) => {
    setAccepted((prevAccepted) => {
      if (prevAccepted[index] === true) {
        return prevAccepted;
      }
      const newAccepted = prevAccepted.slice();
      newAccepted[index] = true;
      return newAccepted;
    })
  }

  return (
    <div className="px-10">
        <div>
            <p className="text-xl">카드 신청을 위해</p>
            <p className="text-xl"><span className="text-3xl font-bold underline color1">약관에 동의</span>해주세요!</p>
        </div>
        <div className="mt-16 mb-9 flex flex-col gap-6">
            {
                termNames.map((term, index) => {
                    return (
                      <a 
                        href={"api/filePaths"} 
                        className="flex justify-between items-center w-full h-12 leading-8 bg-slate-200 px-4 py-2 rounded-xl"
                        onClick = {
                          () => {
                            updateAccepted(index)
                            if (index <=3) {
                              essentialsAgrees.current += 1;
                            } else {
                              optinalsAgrees.current += 1;
                            }
                          }
                        }
                        key={index}
                        target="_blank"
                      >
                        <div>{term}</div>
                        {
                          isAccepted[index] === false
                          ? <span className="material-icons h-8 leading-8 py-1 align-middle">keyboard_arrow_down</span>
                          : <span className="material-icons h-8 leading-8 py-1 align-middle text-[#34eb4c]">check_circle</span>
                        }
                      </a>
                    )
                })
            }
        </div>


    </div>
  )
}

export default Terms