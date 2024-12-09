'use client'

import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';
import { changeInfo } from './common/enterValueList';
import { validateRePassword } from './common/exceptionExcute';
import { firstTotalPrint } from "./firstFromPrint/firstTotalPrint"

const SignupFirst = ({ setPage, firstForm, setFirstForm }) => {
    const [isChecked, setCheck] = useState(1)
    const [emailError, setEmailError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [rePasswordError, setRePasswordError] = useState(false)
    const [totalError, setTotalError] = useState(false)
    const router = useRouter()
    const param = new URLSearchParams()

    // 아이디 값을 조회한다.
    const checkMemberId = async () => {
        param.append("memberId", firstForm[2].value)
        try {
            const response = await fetch(`/api/signup/checkMemberId?${param}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                },
            });

            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }
            const data = await response.json()
            setCheck(data)
            if (firstForm[2].value.length <= 4) {
                setCheck(false)
            }

        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const changeInfos = (value, index) => {
        changeInfo(value, index, firstForm, setFirstForm, setEmailError, setNameError, setPasswordError)
    }
    const toLogin = () => {
        router.push("/login")
    }

    const toHome = () => {
        router.push("/home")
    }

    // 다음페이지를 넘어갈때 유효성 검사 
    const toNextPage = (e) => {
        if (!validateRePassword(firstForm)) {
            setRePasswordError(true)
        }

        if (validateRePassword(firstForm) && firstForm[0].value !== "" && firstForm[1].value !== "" && firstForm[2].value !== "") {
            e.preventDefault();
            setPage([false, true, false, false]);
        } else {
            setTotalError(true)
            setTimeout(() => {
                setTotalError(false)
            }, 1000);
        }
    }

    return (
        <>
            <div className='bg-slate-100'>
                <button className="material-icons cursor-pointer m-6" onClick={toHome}>arrow_back_ios</button>
                <h1 className="font-bold font5 p-3 mb-16 ml-5 text-blue-500">회원가입</h1>
                <div className='m-5 p-4 bg-white rounded-xl shadow-md'>
                    {firstForm.map((signupInfo, index) => firstTotalPrint(signupInfo, index, changeInfos, isChecked, checkMemberId, emailError, nameError, passwordError, rePasswordError)
                    )}
                    <div className='flex justify-center'>
                        <button className="bg-slate-200 rounded-xl w-11/12 h-20 font3 font-sans text-slate-400 font-semibold mt-8 hover:bg-blue-600 hover:text-white" onClick={(e) => toNextPage(e)}>다음</button>
                    </div>
                    {totalError && (
                        <div className="flex justify-center text-red-500">
                            <p>입력값이 유효하지 않습니다 다시 확인해주세요.</p>
                        </div>
                    )}
                </div>

                <div className='flex justify-center mt-8'>
                    <p>이미 계정이 있으신가요?</p>
                    <button className="font-bold" onClick={toLogin}> 로그인 하기</button>
                </div>
            </div>
        </>
    )
}

export default SignupFirst