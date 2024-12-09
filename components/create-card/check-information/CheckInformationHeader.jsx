import React from 'react'
import PageHeader from "../../header/PageHeader";


function CheckInformationHeader({ onClick }) {

    return (

        <div className='sticky top-0 left-0 right-0 w-full h-20 z-30 bg-[#F8FAFC]'>
            <PageHeader
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                수령인 정보 확인
            </PageHeader>
        </div>
    )
}

export default CheckInformationHeader