'use client'

import React, { useEffect, useRef, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const AuthorizationMessageNumber = ({ setPage }) => {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [authNumber, setAuthNumber] = useState(["", "", "", "", ""])

    useEffect(() => {
        // 페이지 진입시 첫 번째 입력칸에 포커스
        inputRefs[0].current?.focus();
    }, []);

    const toCheckPage = () => {
        const newData = [false, true, false, false]
        setPage(newData)
    }

    const toBeforePage = () => {
        const newData = [false, true, false, false]
        setPage(newData)
    }

    const reRequestMessage = () => {
        console.log("문자 재요청")
    }

    const handleInput = (e, index) => {
        const value = e.target.value;

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
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
                    {/* <input className='text-center w-1/4 p-10 font5 flex justify-center' type="text" placeholder='0' maxLength={1} onChange={nextNumber} />
                    <input className='text-center w-1/4 p-10 font5' type="text" placeholder='0' maxLength={1} />
                    <input className='text-center w-1/4 p-10 font5' type="text" placeholder='0' maxLength={1} />
                    <input className='text-center w-1/4 p-10 font5' type="text" placeholder='0' maxLength={1} /> */}
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