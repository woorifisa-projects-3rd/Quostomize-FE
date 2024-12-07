import React from 'react'
import PageHeader from "../../header/PageHeader";


function CheckInformationHeader({ onClick }) {

    return (

        <div>
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