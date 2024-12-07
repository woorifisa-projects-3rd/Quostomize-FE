import React from 'react'
import Header from "../../header/PageHeader";


function SelectBenefit1({ onClick }) {

    return (

        <div>
            <Header
                modaltitle="카드 생성"
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                포인트 적립 옵션 선택
            </Header>
        </div>
    )
}

export default SelectBenefit1