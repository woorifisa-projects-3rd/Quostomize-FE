'use client'

import React, { useEffect, useRef, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const AuthorizationMessageNumber = ({ setPage, secondForm }) => {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [authNumber, setAuthNumber] = useState(["", "", "", ""])

    useEffect(() => {
        // 페이지 진입시 첫 번째 입력칸에 포커스
        inputRefs[0].current?.focus();
    }, []);

    useEffect(() => {
        console.log(authNumber)
    }, [authNumber])

    // // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
    const authorizationByMessage = async () => {
        const authData = [{ phone: secondForm[2].value }, { certificationNumber: secondForm[3].value }]
        try {
            const response = await fetch(`http://localhost:8080/v1/api/sms/send`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                    'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
                },
                body: JSON.stringify(authData),
            });

            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }
            //   const data = await response.json(); // 응답을 JSON으로 파싱
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
    const checkAuthorizationAboutMessage = async () => {
        const authData = [{ phone: secondForm[2].value }, { certificationNumber: secondForm[3].value }]
        try {
            const response = await fetch(`http://localhost:8080/v1/api/sms/confirm`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                    'Authorization': `Bearer ${session.accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
                },
                body: JSON.stringify(authData),
            });

            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }
            //   const data = await response.json(); // 응답을 JSON으로 파싱
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const toCheckPage = () => {
        // if( ){
        // 이곳은 , 문자인증이 정상적으로 진행 시 회원가입 두번째 페이지로 이동하는 코드를 작성한다.
        // } else{

        // }
        const newData = [false, true, false, false]
        setPage(newData)
    }

    const toBeforePage = () => {
        const newData = [false, true, false, false]
        setPage(newData)
    }

    const reRequestMessage = () => {
        console.log("문자 재요청")
        // 문자요청 api 를 실행하는 장소
    }

    const handleInput = (e, index) => {
        const value = e.target.value;

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        } else {
            const newData = [...authNumber]
            newData.splice(index, 1, e.target.value)
            setAuthNumber(newData)
        }

        if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }


    }

    return (
        <>
            <button className="material-icons cursor-pointer m-6" onClick={toBeforePage}>arrow_back_ios</button>
            <h1 className="font-bold font5 p-3">휴대폰 문자 인증</h1>
            <h2 className="font-semibold font3 p-3 mb-16 text-slate-400">휴대폰 번호로 인증번호가 전송되었습니다.</h2>
            <form action={toCheckPage}>
                <div className='flex'>
                    {inputRefs.map((ref, index) => {
                        return (
                            <input key={`${ref}*${index}`} ref={ref} className='text-center w-1/4 p-10 font5 flex justify-center' type="text" placeholder='0' maxLength={1} onChange={(e) => handleInput(e, index)} />
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <button className="bg-black rounded-3xl w-5/6 h-20 font3 font-sans text-white font-semibold mt-8">제출</button>
                </div>
            </form>

            <div className='flex justify-center mt-16'>
                <p>문자를 못 받으셨나요?</p>
                <button className="font-bold" onClick={reRequestMessage}>재전송</button>
            </div>
        </>
    )
}

export default AuthorizationMessageNumber