'use client'

import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';
import CheckModal from '../../components/signup/checkModal'
import CheckModal2 from '../../components/signup/checkModal2'

const SignupSecond = ({ setPage, secondForm, setSecondForm, regionNumber, setRegionNumber, firstForm }) => {
    const [error, setError] = useState(false);
    const [isModal, setModal] = useState(false)
    const [isReModal, setReModal] = useState(false)
    const [number, setNumber] = useState([]) // 2차인증번호
    const [reNumber, setReNumber] = useState([]) //2차인증확인번호
    const router = useRouter();

    const changeInfo = (value, index) => {

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            value = '';
            return;
        } else {
            const newData = [...secondForm]
            const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
            newData.splice(index, 1, addData)

            setSecondForm(newData)
        }
    }

    const changeRegin = (value, index) => {

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            value = '';
            return;
        } else {
            const newData = [...regionNumber]
            const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index]?.type }
            newData.splice(index, 1, addData)

            setRegionNumber(newData)


        }
    }



    // 주민등록번호 유효성 검사
    const validateRegionNumber = (updatedForm) => {
        const frontValue = updatedForm[0]?.value || '';
        const backValue = updatedForm[1]?.value || '';

        const fullValue = frontValue + backValue;
        const isValid = fullValue.length === 13 && /^\d+$/.test(fullValue);
        return isValid;
    }

    // 맴버 회원가입 요청
    const joinAuth = async (member) => {
        try {
            const response = await fetch("/api/signup/createMember", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                }, body: JSON.stringify(member),
            });
            console.log(member)
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const toNextPage = () => {
        // if(){
        // 여기는 핸드폰인증도 모두 통과후 해당 데이터들이 모두 문제가 없을 시, 해당 데이터들을 모아서 맴버를 생성하는 코드를 작성한다.
        // } else{

        // }
        if (validateRePassword() && secondForm[0].value !== "" && secondForm[1].value !== "" && secondForm[2].value !== "") {
            const newData = [false, false, false, true]
            setPage(newData)
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000);
        }
        const newData = [false, false, false, true]
        setPage(newData)

        const newNumber = `${regionNumber[0].value + regionNumber[1].value}` // 주민등록번호 완성
        const setData = []
        firstForm.forEach((info) => {
            if (info.placeholder === "비밀번호 확인") {
                return null
            } else {
                setData.push(info.value)
            }
        })
        const data1 = {
            memberEmail: setData[0],
            memberName: setData[1],
            memberLoginId: setData[2],
            memberPassword: setData[3]

        }
        secondForm.forEach((info) => {
            if (info.placeholder === "2차 인증 번호 확인") {
                return null;
            } else {
                setData.push(info.value)
            }
        })

        //배열로 저장했던 2차인증번호 스트링값으로 바꾸기
        const restoreNumber = `${number[0]}${number[1]}${number[2]}${number[3]}${number[4]}${number[5]}`

        const data2 = {
            residenceNumber: newNumber,
            zipCode: setData[4],
            memberAddress: setData[5],
            memberDetailAddress: setData[6],
            memberPhoneNumber: setData[7],
            secondaryAuthCode: restoreNumber
        }
        const total = { ...data1, ...data2 }
        console.log(total)
        console.log(setData)
        joinAuth(total)
    }

    // 핸드폰 인증을 위한 페이지로 이동
    const checkPhonenumber = (e) => {
        e.preventDefault();
        // 핸드폰번호 다 입력되엇는지 확인 필요
        setPage([false, false, true, false]);
    }

    // 비밀번호 확인
    const validateRePassword = () => {
        const [password, rePassword] = [secondForm[3]?.value, secondForm[4]?.value];
        return password === rePassword && password.length === 6;
    }


    const handleInput = (value, index) => {
        const newData = [...secondForm]
        const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
        newData.splice(index, 1, addData)

        // 비밀번호 필드인 경우에만 검증
        if (newData[index].placeholder === "주민등록번호 입력") {
            if (!validateRegionNumber(value)) {
                setError(true); // 조건 불만족 시 오류 상태 업데이트
            } else {
                setError(false); // 조건 만족 시 오류 상태 해제
            }
        }
        setSecondForm(newData)
    }

    // 주민등록번호 츨력 코드
    const renderFiled0 = (reginInfo, i) => {
        const key = `${reginInfo?.placeholder}-${i}}`
        if (i === 0) {
            return (

                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3  mb-2'>{reginInfo?.placeholder}</span>
                    <input
                        className="w-5/6 p-4 ml-5 mb-5 rounded-xl font2 bg-gray-100 shadow-md focus:outline-none"
                        placeholder={reginInfo.placeholder}
                        value={reginInfo.value}
                        onChange={(e) => changeRegin(e.target.value, i)}
                        type="text"
                        maxLength={6}
                    />
                </div>

            )
        } else {
            return (

                <div key={key} className='flex flex-col'>
                    <span className='mx-12 mt-3 mb-2'>{reginInfo?.placeholder}</span>
                    <div className='flex'>
                        <span className="mx-2 mt-6 mr-8">-</span>
                        <input
                            className="w-full p-4 mr-5 mb-5 rounded-xl font2 bg-gray-100 shadow-md focus:outline-none "
                            placeholder={reginInfo.placeholder}
                            value={reginInfo.value}
                            onChange={(e) => changeRegin(e.target.value, i)}
                            type="password"
                            maxLength={7}
                        />
                    </div>
                </div>

            )
        }
    }

    // 필드 별 조건부 렌더링
    const renderField = (signupInfo, index) => {
        const key = `${signupInfo?.placeholder}-${index}}`

        if (secondForm[index]?.placeholder === "핸드폰 번호") {
            return (
                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <div className='flex'>
                        <input
                            className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                            type={signupInfo?.type}
                            placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                            value={signupInfo?.value}
                            onChange={(e) => changeInfo(e.target.value, index)}
                            maxLength={11}
                        />
                        <button type="button" className="w-1/4 mb-4 p-4  ml-4 mr-6   rounded-xl font2 font-sans font-semibold text-slate-400 bg-slate-200 hover:bg-blue-700 hover:text-white" onClick={(e) => checkPhonenumber(e)}>인증</button>
                    </div>
                </div>
            )
        } else if (secondForm[index]?.placeholder === "우편 번호") {
            return (
                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                        value={signupInfo?.value}
                        onChange={(e) => changeInfo(e.target.value, index)}
                        maxLength={5}
                    />
                </div>
            )
        }
        else if (secondForm[index]?.placeholder === "주소") {
            return (
                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                        value={signupInfo?.value}
                        onChange={(e) => handleInput(e.target.value, index)}
                    />
                </div>
            )
        } else if (secondForm[index]?.placeholder === "상세 주소") {
            return (
                <div key={key} className='flex flex-col mb-2'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                        value={signupInfo?.value}
                        onChange={(e) => handleInput(e.target.value, index)}
                    />
                </div>
            )
        }
        else if (secondForm[index]?.placeholder === "2차 인증 번호") {
            return (
                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                        onClick={() => setModal(true)}
                    />
                    {isModal && <CheckModal onClose={() => setModal(false)} setNumber={setNumber} number1={number} />}
                </div>
            )
        } else {
            return (
                <div key={key} className='flex flex-col'>
                    <span className='mx-5 mt-3 mb-2'>{signupInfo?.placeholder}</span>
                    <input
                        className="w-11/12 ml-5 mb-4 p-4 rounded-xl font2 bg-gray-100 focus:outline-none"
                        type={signupInfo?.type}
                        placeholder={`${signupInfo?.placeholder} 을(를) 입력해주세요`}
                        onClick={() => setReModal(true)}
                    />
                    {isReModal && <CheckModal2 onClose={() => setReModal(false)} setReNumber={setReNumber} reNumber={reNumber} />}
                </div>
            )
        }

    };
    const toBeforePage = () => {
        const newData = [true, false, false, false]
        setPage(newData)
    }

    return (
        <>
            <button className="material-icons cursor-pointer m-6 text-blue-600" onClick={toBeforePage}>arrow_back_ios</button>
            <h1 className="font-bold text-2xl p-3 mb-16 ml-5 text-blue-500">회원가입</h1>

            <div className='m-5 p-6 bg-white rounded-xl shadow-lg'>
                <div className='flex'>
                    {regionNumber?.map((reginInfo, i) => renderFiled0(reginInfo, i))}
                </div>
                {secondForm?.map((signupInfo, index) => renderField(signupInfo, index))}

                {/* 에러 메시지 */}
                {error && (
                    <div className="flex justify-center text-red-500 mt-2 text-sm font-semibold">
                        <p>입력값이 올바르지 않거나 값이 없습니다. 다시 입력해주세요</p>
                    </div>
                )}

                <div className='flex justify-center'>
                    <button
                        className="bg-slate-200 text-white rounded-xl w-11/12 h-16 font-sans text-xl font-semibold mt-8 hover:bg-blue-700 transition duration-300"
                        onClick={toNextPage}
                    >
                        제출
                    </button>
                </div>
            </div>

            <div className='flex justify-center mt-8'>
                <p>이미 계정이 있으신가요?</p>
                <button className="font-bold text-blue-600" onClick={() => router.push("/login")}> 로그인 하기</button>
            </div>
        </>
    );
}

export default SignupSecond;
