'use client'

import React, { useEffect, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const SignupSecond = ({ setPage, secondForm, setSecondForm }) => {
    const [error, setError] = useState(false) // 비밀번호 오류 상태 추가
    const router = useRouter()

    const changeInfo = (value, index) => {

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            value = '';
            return;
        } else {
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
    }
    const toLogin = () => {
        router.push("/login")
    }

    const toBeforePage = () => {
        const newData = [true, false, false, false]
        setPage(newData)
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
        // const newData = [false, false, false, true]
        // setPage(newData)
    }

    const checkPhonenumber = (e) => {
        e.preventDefault(); // 버튼 클릭 시 폼 제출을 방지
        const newData = [false, false, true, false]
        setPage(newData)
    }

    const validateRegionNumber = (value) => {
        const hasUpperCase = !/[A-Z]/.test(value); // 대문자 없는지 체크
        const hasLowerCase = !/[a-z]/.test(value); // 소문자 없는지 체크
        const hasSpecialChar = !/[!@#$%^&*(),.?":{}|<>]/.test(value); // 특수문자 없는지 체크
        const isLongLength = value.length <= 13; // 숫자길이체크

        // 비밀번호가 조건을 만족하는지 검사
        if (hasUpperCase && hasLowerCase && hasSpecialChar && isLongLength) {
            return true;
        } else if (value === "") {
            return true;
        } else {
            return false;
        }
    }

    const validateRePassword = () => {
        const newData = [...secondForm]
        const rePasswrodData = newData[4]?.value
        const passwordData = newData[3]?.value
        // 비밀번호값의 일치여부를 검사
        if (rePasswrodData == passwordData && passwordData !== "" && passwordData.length === 6) {
            return true;
        } else {
            return false;
        }
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

    return (
        <>
            <button className="material-icons cursor-pointer m-6" onClick={toBeforePage}>arrow_back_ios</button>
            <h1 className="font-bold font5 p-3 mb-16">회원가입</h1>
            <form action={toNextPage}>
                {secondForm !== undefined && secondForm.map((signupInfo, index) => {
                    const key = `${signupInfo?.placeholder}-${index}`
                    if (secondForm[index]?.placeholder === "핸드폰 번호 입력") {
                        return (
                            <div key={key} className='flex'>
                                <input
                                    className="w-3/4 m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo?.type}
                                    placeholder={signupInfo?.placeholder}
                                    value={signupInfo?.value}
                                    onChange={(e) => changeInfo(e.target.value, index)}
                                />
                                <button type="button" className="w-1/4 m-2 p-4 rounded-xl font2 bg-gray-200" onClick={(e) => checkPhonenumber(e)}>인증</button>
                            </div>
                        )
                    } else if (secondForm[index]?.placeholder === "주민등록번호 입력") {
                        return (
                            <div key={key} className='flex'>
                                <input
                                    className="w-full m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo?.type}
                                    placeholder={signupInfo?.placeholder}
                                    value={signupInfo?.value}
                                    onChange={(e) => changeInfo(e.target.value, index)}
                                    maxLength={13}
                                />
                            </div>
                        )
                    }
                    else if (secondForm[index]?.placeholder === "주소입력") {
                        return (
                            <div key={key} className='flex'>
                                <input
                                    className="w-full m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo?.type}
                                    placeholder={signupInfo?.placeholder}
                                    value={signupInfo?.value}
                                    onChange={(e) => handleInput(e.target.value, index)}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div key={key} className='flex justify-center'>
                                <input
                                    className="w-full m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo?.type}
                                    placeholder={signupInfo?.placeholder}
                                    value={signupInfo?.value}
                                    onChange={(e) => changeInfo(e.target.value, index)}
                                />
                            </div>
                        )
                    }
                })}
                {/* 에러 메시지 */}
                {error && (
                    <div className="flex justify-center text-red-500 mt-2">
                        <p>입력값이 올바르지 않거나 값이 없습니다. 다시 입력해주세요</p>
                    </div>
                )}

                <div className='flex justify-center'>
                    <button className="bg-black rounded-3xl w-5/6 h-20 font3 font-sans text-white font-semibold mt-8">제출</button>
                </div>
            </form>

            <div className='flex justify-center mt-16'>
                <p>이미 계정이 있으신가요?</p>
                <button className="font-bold" onClick={toLogin}> 로그인 하기</button>
            </div>

        </>
    )
}

export default SignupSecond