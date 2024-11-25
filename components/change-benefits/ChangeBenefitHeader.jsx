import React from 'react'
import Header from "../../components/header/prev-name-exit";


const ChangeBenefitHeader = ({ onClick }) => {

    return (
        <div>
            <Header
                modaltitle="포인트 혜택 변경"
                description="혜택 변경을 종료하시겠습니까?"
                showArrowButton={false}
                onArrowClick={onClick}
                exitDirection="/my-card"

            >
                포인트 혜택 변경
            </Header>
        </div>
    )
}

export default ChangeBenefitHeader