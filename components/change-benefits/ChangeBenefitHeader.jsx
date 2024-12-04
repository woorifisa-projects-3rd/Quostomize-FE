import React from 'react'
import Header from "../../components/header/prev-name-exit";


const ChangeBenefitHeader = ({ onClick }) => {

    return (
        <div>
            <Header
                modaltitle="포인트 혜택 변경"
                description={
                    <>
                        변경 사항을 저장하시겠습니까?
                        <br />
                        (변경 사항이 저장 되지 않습니다.)
                    </>
                }
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