'use client'

import 'material-icons/iconfont/material-icons.css';
import { useRef } from "react";

const Terms = ({ isAccepted, setAccepted }) => {

  const termNames = [
    "개인 회원 약관", "특정 금융거래 보고 및 이용에 관한 안내" ,"개인 (신용)정보 수집·이용·제공 동의", 
    "서비스 제공 동의", "개인 (신용)정보 제3자 제공 동의", "광고성 정보 수신 동의"
  ];

  const updateAccepted = (index) => {
    setAccepted((prevAccepted) => {
      if (index === 4 || index === 5) {
        const newAccepted = prevAccepted.slice();
        newAccepted[index] = !prevAccepted[index];
        return newAccepted
      }

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
                        href={`files/terms/${index+1}.pdf`} 
                        className="flex justify-between items-center w-full h-12 leading-8 bg-slate-200 px-4 py-2 rounded-xl"
                        onClick = {
                          () => {
                              updateAccepted(index)
                          }
                        }
                        key={index}
                        target="_blank"
                      >
                        { index !==4 && index!==5
                          ? <div>(<span className='text-red-500'>필수</span>)  {term}</div>
                          : <div>(<span>선택</span>)  {term}</div>
                        }
                        {
                          isAccepted[index] === false
                          ? <span className="material-icons h-8 leading-8 py-1 align-middle">keyboard_arrow_down</span>
                          : <span className="material-icons h-8 leading-8 py-1 align-middle text-[#3384f6]">check_circle</span>
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
