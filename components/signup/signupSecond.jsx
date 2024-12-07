'use client'

import React, { useEffect, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';
import { reginInfoDataFeild, otherDataFeild } from "../../components/signup/secondFormPrint/secondTotalPrint"
import { validateRegionNumber } from "../../components/signup/common/exceptionExcute"

const SignupSecond = ({ setPage, secondForm, setSecondForm, regionNumber, setRegionNumber, firstForm, isBlocked }) => {
    const [error, setError] = useState(false);
    const [isModal, setModal] = useState(false)
    const [isReModal, setReModal] = useState(false)
    const [number, setNumber] = useState([]) // 2차인증번호
    const [reNumber, setReNumber] = useState([]) //2차인증확인번호
    const [regidenceNumberError, setRegidenceNumberError] = useState(false)
    const [phoneNumberError, setPhoneNumberError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    // 맴버 회원가입 요청
    const joinAuth = async (member) => {
        try {
            const response = await fetch("/api/signup/createMember", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                }, body: JSON.stringify(member),
            });
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // 다음페이지 클릭 시
    const toNextPage = () => {

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

        // 검증하고 문제 없으면 회원가입 완료
        if (validateRegionNumber(regionNumber) && number.every((x, i) => x === reNumber[i]) && number.length === 6 && secondForm[0].value !== "" && secondForm[1].value !== "" && secondForm[2].value !== "") {
            const newData = [false, false, false, true]
            setPage(newData)
            joinAuth(total)
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000);
        }
    }

    const toBeforePage = () => {
        const newData = [true, false, false, false]
        setPage(newData)
    }

    const secondToAuthNumber = (e, value) => {
        e.preventDefault();
        // 핸드폰번호 다 입력되엇는지 확인 필요
        if (value.length === 11) {
            setPhoneNumberError(false)
            setPage([false, false, true, false]);
        } else {
            setPhoneNumberError(true)
            setTimeout(() => {
                setPhoneNumberError(false)
            }, 1000);
        }
    }

    const handleSearch = () => {
        new daum.Postcode({
            oncomplete: (data) => {
                const newData = [...secondForm]
                newData.splice(1, 1, { placeholder: "주소", value: data.roadAddress, type: "text" })
                newData.splice(0, 1, { placeholder: "우편 번호", value: data.zonecode, type: "text" })
                setSecondForm(newData)
            }
        }).open();
    };

    return (
        <>
            <button className="material-icons cursor-pointer m-6 text-blue-600" onClick={toBeforePage}>arrow_back_ios</button>
            <h1 className="font-bold text-2xl p-3 mb-16 ml-5 text-blue-500">회원가입</h1>

            <div className='m-5 p-6 bg-white rounded-xl shadow-lg'>
                <div className='flex'>
                    {regionNumber?.map((reginInfo, i) => reginInfoDataFeild(reginInfo, i, regionNumber, setRegionNumber, setRegidenceNumberError))}
                </div>
                {(regidenceNumberError) && (
                    <div className="w-full flex justify-center text-red-500 mt-2 text-sm font-semibold">
                        <p>주민등록번호 입력값이 올바르지 않거나 값이 없습니다. 다시 입력해주세요</p>
                    </div>
                )}
                {secondForm?.map((signupInfo, index) => otherDataFeild(signupInfo, index, isModal, isReModal, setModal, number, setNumber, setReModal, setReNumber, reNumber, isBlocked, secondForm, setSecondForm, secondToAuthNumber, handleSearch, phoneNumberError))}

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
