import React from 'react'
import Image from 'next/image'
import MyFullButton from '../../../components/button/full-button'

const page = () => {
    return (
        <div>
            <p>계좌개설 목록</p>
            <p>어느 계좌를 만들까요?</p>
            <p>미리 준비해주세요</p>

            <a>계좌별 특징 알아보기</a>

            <Image src={''} alt='계좌 개설 관련 이미지'></Image>

            <p>증권앱 여러 개가 필요없어요</p>
            <h1>실시간으로 연동되는 시세</h1>

            <p>주식 투자의 수수료 할인을 누려보세요</p>
            <h1>우리투자증권의 수수료 서비스</h1>

            <MyFullButton href='https://fundsupermarket.wooriib.com/fmu/FMU8020601/main.do'>계좌 만들러 가기</MyFullButton>

        </div>
    )
}

export default page