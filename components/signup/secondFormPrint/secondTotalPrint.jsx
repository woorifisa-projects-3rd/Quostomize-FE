import React from 'react'
import { changeInfo, changeInfoOnlyNumber } from "../common/enterValueList"
import CheckModal from "../checkModal"
import CheckModal2 from "../checkModal2"

export const  reginInfoDataFeild = (reginInfo, i,form, setForm) => {
    const key = `${reginInfo?.placeholder}-${i}}`
        return (
            <div key={key} className='flex flex-col'>
                <span className={`${i === 0 ? 'mx-5 mt-3  mb-2':'mx-12 mt-3 mb-2'}`}>{reginInfo?.placeholder}</span>
                <div className='flex'>
                    {i === 1 && <span className="mx-2 mt-6 mr-8">-</span>}
                    <input
                        className={`${i === 0 ? "w-5/6 p-4 ml-5 mb-5 rounded-xl font2 bg-gray-100 shadow-md focus:outline-none":"w-full p-4 mr-5 mb-5 rounded-xl font2 bg-gray-100 shadow-md focus:outline-none "}`}
                        placeholder={reginInfo.placeholder}
                        value = {reginInfo.value} 
                        onChange ={(e) => changeInfoOnlyNumber(e.target.value, i,form, setForm)}
                        type={`${i === 0 ? "text": "password"}`}
                        maxLength={6+i}/>
                </div>
            </div>
        )
}


export const otherDataFeild = (signupInfo, index,isModal,isReModal,setModal,number,setNumber, setReModal, setReNumber, reNumber, isBlocked,form,setForm, secondToAuthNumer) =>{
    const key = `${signupInfo?.placeholder}-${index}}`
    if (signupInfo?.placeholder === "핸드폰 번호") {
        return (
            <div key={key} className='flex flex-col'>
                <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                <div className='flex'>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                        value={signupInfo?.value}
                        onChange={(e) => changeInfoOnlyNumber(e.target.value, index,form,setForm)}
                        maxLength={11}
                    />
                    <button type="button" className={`w-1/4 mb-4 p-4  ml-4 mr-6   rounded-xl font2 font-sans font-semibold ${isBlocked === true ? `bg-blue-700 text-white` : `text-slate-400 bg-slate-200 hover:bg-blue-700 hover:text-white`}`} disabled={isBlocked} onClick={(e) => secondToAuthNumer(e)}>인증</button>
                </div>
            </div>
        )
    } else if (signupInfo?.placeholder === "우편 번호") {
        return (
            <div key={key} className='flex flex-col'>
                <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo?.type}
                    placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                    value={signupInfo?.value}
                    onChange={(e) => changeInfoOnlyNumber(e.target.value, index ,form,setForm)}
                    maxLength={5}
                />
            </div>
        )
    }
    else if (signupInfo?.placeholder === "주소" || signupInfo?.placeholder === "상세 주소") {
        return (
            <div key={key} className='flex flex-col'>
                <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo?.type}
                    placeholder={`${signupInfo?.placeholder}를 입력해주세요`}
                    value={signupInfo?.value}
                    onChange={(e) => changeInfo(e.target.value, index ,form,setForm)}
                />
            </div>
        )
    } else  {
        return (
            <div key={key} className='flex flex-col'>
                <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                <input
                    className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                    type={signupInfo?.type}
                    placeholder = {signupInfo?.placeholder === "2차 인증 번호" 
                        ? (number.length > 0 ? `******`:`${signupInfo?.placeholder}를 입력해주세요` )
                        :(reNumber.length > 0 ? `******`:`${signupInfo?.placeholder}을 입력해주세요` )}
                    onClick={signupInfo.placeholder === "2차 인증 번호 확인"? (() => setReModal(true)) : (() => setModal(true)) }
                />
                {
                signupInfo?.placeholder === "2차 인증 번호" 
                    ? (isModal && <CheckModal onClose={() => setModal(false)} setNumber={setNumber} number1={number} />)
                    : (isReModal && <CheckModal2 onClose={() => setReModal(false)} setReNumber={setReNumber} reNumber={reNumber} />)
                }
            </div>
        )
    }
}
