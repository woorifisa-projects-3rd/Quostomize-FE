'use client'

import React, { useEffect, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const SignupSecond = ({ setPage, secondForm, setSecondForm, firstForm }) => {
    const [error, setResionNumberError] = useState(false) // 비밀번호 오류 상태 추가
    const router = useRouter()

    const changeInfo = (value, index) => {
        const newData = [...secondForm]
        const addData = { placeholder: newData[index]?.placeholder, value: value, type: newData[index].type }
        newData.splice(index, 1, addData)
        setSecondForm(newData)
    }
    const toLogin = () => {
        router.push("/login")
    }

    const toBeforePage = () => {
        const newData = [true, false, false, false]
        setPage(newData)
    }

    const toNextPage = () => {
        const newData = [false, false, false, true]
        setPage(newData)
    }

    const checkPhonenumber = (e) => {
        e.preventDefault(); // 버튼 클릭 시 폼 제출을 방지
        const newData = [false, false, true, false]
        setPage(newData)
    }

    const validateRegionNumber = (password) => {
        const hasUpperCase = /[A-Z]/.test(password); // 대문자 체크
        const hasLowerCase = /[a-z]/.test(password); // 소문자 체크
        const hasNumber = /\d/.test(password); // 숫자 체크
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 체크
        const isLongLength = password.length <= 13;

        // 비밀번호가 조건을 만족하는지 검사
        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongLength) {
            return true;
        } else if (password === "") {
            return true;
        } else {
            return false;
        }
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