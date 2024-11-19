import React from 'react'
import Image from 'next/image'
import MyCheckBox from '../../../components/check/checkbox'

const page = () => {
    return (
        <div>
            <h1>주식 계좌 연동 페이지</h1>
            <p>이미 계좌가 존재하네요</p>
            <p>아래의 계좌와 연동할 수 있습니다.</p>
            <ul>
                <li>
                    <Image src={''} alter='계좌 이미지' width={30} height={30}></Image>
                    계좌 상세 리스트
                    <MyCheckBox />
                </li>
            </ul>
            <button>계좌정보 직접입력</button>
            <br></br>
            <button>계좌 연동하기</button>
        </div>
    )
}

export default page